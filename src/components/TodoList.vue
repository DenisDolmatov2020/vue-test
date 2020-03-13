<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 offset-2" v-for="(todo, index) in todos.slice()" :key="index">
            <div class="card shadow">
                <div class="card-header">
                    <h1>
                        <span class="mr-5 font-weight-bold text-primary" @click="todoPage(todo.id, false)">
                            {{ todo.title }}
                        </span>
                        <button class="btn btn-warning btn-icon-split btn-sm mr-3">
                            <span class="text" @click="todoPage(todo.id, true)">Update</span>
                        </button>
                        <button class="btn btn-danger btn-icon-split btn-sm">
                            <span class="text" @click="showModal(index)"> Remove </span>
                        </button>
                    </h1>
                    <div class="my-2"></div>
                </div>
                <div class="card-body">
                    <li v-for="task in todo.tasks.slice().reverse()" :key="task.id">
                        {{task.title}}
                    </li>
                </div>
            </div>
        </div>
    </div>
    <TodoModal v-show="isModalVisible" @close="closeModal">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal" aria-label="Close modal">
            Cancel action
        </button>
        <button type="button" class="btn btn-danger" @click="remove(todo_index)">Delete Todo</button>
    </TodoModal>
</div>

</template>

<script>
import TodoModal from '../components/TodoModal.vue';
export default {
    name: "TodoList",
    components: {
        TodoModal,
    },
    data: () => ({
        todos: [],
        todo_index: '',
        isModalVisible: false,
    }),
    methods: {
        showModal(index) {
            this.isModalVisible = true;
            this.todo_index = index;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        todoPage(id__, update){
            this.$router.push({name: 'TodoPage', params: { id: id__, updateBool: update }})
        },
        remove(index) {
            this.todos.splice(index, 1).reverse();
            localStorage.todos = JSON.stringify(this.todos);
            this.isModalVisible = false;
        },
    },
    beforeMount(){
        if (localStorage.todos){
            this.todos = (JSON.parse(localStorage.todos)).reverse()
        }
    },
}
</script>

<style scoped>
</style>