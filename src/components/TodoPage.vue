<template>
<div class="container-fluid">
    <!-- Modals Todo -->
    <div class="row">
        <div class="col-lg-8 offset-lg-2" style="min-width: 800px">
            <div class="card shadow">
                <!-- head todo page -->
                <div class="card-header">
                    <h6 class="m-0 font-weight-bold text-primary">
                        <!-- if update page or new page -->
                        <div class="row" >
                            <div  class="col-6 input-group" v-if="update">
                                <input type="text" class="form-control mr-2" title="Title"
                                       placeholder="Title" v-model="todo.title">
                                <button v-if="update" class="btn btn-outline-success mr-2" @click.prevent="saveTodo">
                                    Save
                                </button>
                                <button class="btn btn-outline-dark" @click.prevent="showModal(false)">
                                    Cancel
                                </button>
                            </div>
                            <div class="col-6" v-else>
                                <h2>
                                    <span> {{ todo.title }} </span>
                                    <button class="btn btn-outline-warning float-right" @click.prevent="update=!update">
                                        Update
                                    </button>
                                </h2>
                            </div>
                            <div class="col-6" v-if="this.$route.params.id">
                                <button v-if="update && cancelChangesButton" class="btn btn-outline-secondary mr-1"
                                        @click.prevent="cancelChanges">
                                    Return
                                </button>
                                <button  class="btn btn-outline-danger float-right ml-2" @click.prevent="showModal(true)"
                                         type="button">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <!-- static information about Todo -->
                    </h6>
                    <div class="my-2"></div>
                </div>

                <!-- body TASKS-->
                <div class="card-body" >
                    <div class="row">
                        <div class="col-6 offset-3 mb-5" v-if="update">
                            <div class="input-group">
                                <input type="text" class="form-control" v-on:keyup.enter="putTask" placeholder="Entry new todo ..."
                                       v-model="new_task">
                                <span class="input-group-btn">
                                    <button class="btn btn-primary" type="button" @click="putTask">PUT</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-10 offset-1 mb-3" v-for="(task, index) in todo.tasks.slice().reverse()" :key="task.id">
                            <div class="input-group">
                                <input type="checkbox" :value="task.id" v-model="todo.selectedTasks" :disabled="!update">
                                <input class="form-control mr-0" type="text" :for="task.id"
                                       v-model="task.title" :disabled="selectedTask!==task.id">
                                <span class="input-group-btn" v-if="update">
                                    <button @click.prevent="selectedTask=''" v-if="selectedTask===task.id" class="btn btn-success">
                                        Fix
                                    </button>
                                    <button @click.prevent="selectedTask=task.id" v-else class="btn btn-warning">
                                        Edit
                                    </button>
                                    <button  @click.prevent="removeTask(index)" class="btn btn-danger ml-2">
                                        Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <TodoModal v-show="modalShow" @close="closeModal">
        <button v-if="deleteFlag" type="button" class="btn btn-danger" @click="removeTodo">Delete Todo</button>
        <button v-else type="button" class="btn btn-warning" @click="cancelUpdate">Cancel Update</button>
    </TodoModal>
</div>
</template>


<script>
// import { uuid } from 'vue-uuid';
import idb from '@/api/idb';
import TodoModal from "@/components/TodoModal";


export default {
    name: "TodoPage",
    components: {
        TodoModal,
    },
    data: () => ({
        update: null,
        text: '',
        new_task: '',
        todo: {
            title: '',
            tasks: [],
            selectedTasks: []
        },
        cancelTodo: '',
        selectedTask: '',
        modalShow: false,
        deleteFlag: false,
    }),
    computed: {
        cancelChangesButton: function(){
            return JSON.stringify(this.todo) !== this.cancelTodo
        },
    },
    methods: {
        // modals
        showModal(deleteFlag) {
            this.deleteFlag = deleteFlag;
            this.modalShow = true;
        },
        cancelUpdate(){
            this.update = false;
            this.closeModal();
        },
        closeModal() {
            this.modalShow = false;
            this.deleteFlag = false;
        },
        // tasks
        putTask(){
            if(this.new_task){
                let id = this.todo.tasks.length;
                this.todo.tasks.push({id: id++, title: this.new_task});
                this.new_task = '';
            }
        },
        removeTask(index){
            this.todo.tasks.splice( -index-1, 1);
        },

        // todo
        async cancelChanges(){
            this.cancelTodo = [JSON.stringify(this.todo), this.todo = JSON.parse(this.cancelTodo)][0];
        },
        async saveTodo (){
            // this.$router.replace({name: 'TodoPage', params: { id: this.todo.id }})
            console.log('Saving todo: ' + this.todo.title);
            await idb.saveTodo(this.todo);
            console.log('Saved todo');
            await this.$router.push({name: 'TodoList'})
        },
        async removeTodo() {
            console.log('Delete Todo ID: ' + this.todo.id);
            await idb.deleteTodo(this.todo.id);
            console.log('Finish deleted');
            await this.$router.push({name: 'TodoList'})
        },
    },
    async beforeMount() {
        this.update = false;
        if(this.$route.params.update){
            this.update = this.$route.params.update
        }
        if(this.$route.params.id) {
            let todo = await idb.getTodo(this.$route.params.id);
            this.todo = todo;
            this.cancelTodo = JSON.stringify(todo)
        }
    },
}

</script>

<style scoped>
    .completed {
        text-decoration: line-through;
    }
</style>