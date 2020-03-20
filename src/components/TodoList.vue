<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 offset-2" v-for="(todo, index) in todos.slice().reverse()" :key="index">
            <div class="card shadow">
                <div class="card-header">
                    <h1>
                        <span class="mr-5 font-weight-bold text-primary" @click="todoPage(todo, false)">
                            {{ todo.title }}
                        </span>
                        <button class="btn btn-danger btn-icon-split btn-sm float-right" @click="showModalRemove(todo.id)">
                            <span class="text"> Remove </span>
                        </button>
                        <button class="btn btn-warning btn-icon-split btn-sm mr-3 float-right">
                            <span class="text" @click="todoPage(todo, true)"> Update </span>
                        </button>
                    </h1>
                    <div class="my-2"></div>
                </div>
                <ul class="card-body">
                    <li v-for="task in todo.tasks.slice().reverse()" :key="task.id">
                        <input type="checkbox" v-model="todo.selectedTasks" disabled>
                        <label :for="task.selectedTasks">{{task.title}}</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <TodoModal v-show="showModal" @close="closeModal">
        <button type="button" class="btn btn-danger" @click="removeTodo">Delete Todo</button>
    </TodoModal>
</div>

</template>

<script>
import idb from '@/api/idb';
import TodoModal from '../components/TodoModal.vue';

export default {
    name: "TodoList",
    components: {
        TodoModal,
    },
    data: () => ({
        todos: [],
        todo_index: '',
        showModal: false,
        selectedTodoId: null,
    }),
    methods: {
        showModalRemove(id) {
            this.selectedTodoId = id;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        todoPage(todo, update){
            this.$router.push({name: 'TodoPage', params: { id: todo.id, update: update }})
        },
        async removeTodo() {
            console.log('Delete Todo ID: ' + this.selectedTodoId);
            await idb.deleteTodo(this.selectedTodoId);
            this.todos = await idb.listTodos();
            this.showModal = false;
            console.log('Delete Todo ID: ' + this.selectedTodoId);
            this.selectedTodoId = null;
        },
    },
    async beforeMount(){
        this.todos = await idb.listTodos();
    },
}
</script>

<style scoped>
</style>