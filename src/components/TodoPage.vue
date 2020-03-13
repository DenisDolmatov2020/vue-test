<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 offset-lg-2" style="min-width: 800px">
            <div class="card shadow">

                <!-- head todo page -->
                <div class="card-header">
                    <h6 class="m-0 font-weight-bold text-primary">
                        <!-- if update page or new page -->
                        <div class="row" v-if="update">
                            <div  class="col-6 input-group">
                                <input type="text" class="form-control mr-2" title="Title"
                                       placeholder="Title" v-model="todo.title">
                                <button v-if="update && cancelChangesButton" class="btn btn-outline-success mr-2" @click.prevent="save">
                                    Save
                                </button>
                                <button class="btn btn-outline-dark" @click.prevent="showModalCancelUpdate">
                                    Cancel
                                </button>
                            </div>
                            <div class="col-6">
                                <button v-if="update && cancelChangesButton" class="btn btn-outline-secondary mr-1" @click.prevent="cancelChanges">
                                    Cancel Changes
                                </button>
                                <button v-if="update && returnChangesButton" class="btn btn-outline-warning" @click.prevent="returnChanges">
                                    Return Changes
                                </button>
                                <button  class="btn btn-outline-danger float-right ml-2" @click.prevent="showModal()" type="button">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <!-- static information about Todo -->
                        <div v-else>
                            <h2>
                                <span>{{ todo.title }}</span>
                                <button class="btn btn-outline-warning float-right" @click.prevent="update=!update">Update</button>
                            </h2>
                        </div>
                    </h6>
                    <div class="my-2"></div>
                </div>

                <!-- body Todo page -->
                <div class="card-body" >
                    <div class="row">
                        <div class="col-lg-6" v-if="update">
                            <div class="input-group">
                                <input type="text" class="form-control" v-on:keyup.enter="putTask" placeholder="Entry new todo ..." v-model="new_task">
                                <span class="input-group-btn">
                                    <button class="btn btn-primary" type="button" @click="putTask">PUT</button>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div v-for="(task, index) in todo.tasks.slice().reverse()" :key="index">
                                <input type="checkbox" :id="task.title" :value="task" v-model="todo.selectedTasks" :disabled="!update">
                                <label :for="task.title">
                                    <input v-if="updateIndexTask===index" class="form-control mr-2" type="text" :for="task.title" v-model="task.title">
                                    <span v-else >
                                        {{ task.title }}
                                    </span>
                                </label>
                                <b-icon v-if="update" @click.prevent="removeTask(index)" class="float-right" variant="danger" font-scale="2" icon="x-octagon">
                                    X
                                </b-icon>
                                <b-icon v-if="update && updateIndexTask!==index" @click.prevent="updateIndexTask=index" class="float-right" variant="warning" font-scale="2" icon="pencil">
                                </b-icon>
                                <b-icon v-if="update && updateIndexTask===index" @click.prevent="updateIndexTask=''" class="float-right" variant="success" font-scale="2" icon="check-circle">
                                </b-icon>
                            </div>
                        </div>
                    </div>
                    <br>
                </div>

                <!-- Modals Todo -->
                <TodoModal v-show="isModalVisible" @close="closeModal">
                    <button type="button" class="btn btn-danger" @click="remove()">Delete Todo</button>
                </TodoModal>

                <TodoModal v-show="isModalVisibleCancel" @close="closeModal">
                    <button type="button" class="btn btn-danger" @click="cancelUpdate">Cancel Update</button>
                </TodoModal>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { uuid } from 'vue-uuid';
import TodoModal from '../components/TodoModal.vue';

export default {
    name: "TodoPage",
    components: {
        TodoModal,
    },
    props: ['id', 'updateBool'],
    data: () => ({
        update: null,
        text: '',
        new_task: '',
        todo: {
            title: '',
            tasks: [],
            selectedTasks: [],
        },
        updateIndexTask: '',
        todos: [],
        isModalVisible: false,
        isModalVisibleCancel: false,
    }),
    computed: {
        cancelChangesButton: function(){
            return JSON.stringify(this.todo) !== localStorage.todo
        },
        returnChangesButton: function(){
            return JSON.stringify(this.todo) !== localStorage.returnChanges && localStorage.todo !== localStorage.returnChanges
        },
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        showModalCancelUpdate() {
            this.isModalVisibleCancel = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.isModalVisibleCancel = false;
        },
        returnChanges(){
            this.todo = JSON.parse(localStorage.returnChanges);
        },
        cancelChanges(){
            localStorage.returnChanges = JSON.stringify(this.todo);
            this.todo = JSON.parse(localStorage.todo);
        },
        cancelUpdate(){
            this.isModalVisibleCancel = false;
            this.update = false;
        },
        putTask(){
            if(this.new_task){
                let id = uuid.v1(); // deciding question similar tasks
                this.todo.tasks.push({"id": id, "title": this.new_task });
                this.new_task = '';
            }
        },
        removeTask(index){
            this.todo.tasks.reverse().splice(index, 1);
            localStorage.todos = JSON.stringify(this.todos)
        },
        save (){
            if(this.todo.title.length === 0){
                this.todo.title = 'No name'
            }
            if(!this.todo.id && this.id === '0'){
                this.todo.id = uuid.v1();
                this.todos.push(this.todo);
                this.$router.replace({name: 'TodoPage', params: { id: this.todo.id }})
            }
            localStorage.todo = JSON.stringify(this.todo);
            localStorage.returnChanges = JSON.stringify(this.todo);
            this.todo = JSON.parse(localStorage.todo);
            localStorage.todos = JSON.stringify(this.todos);
            this.update = false;
        },
        async remove () {
            for (let i = 0; i < this.todos.length; ++i) {
                if (this.id == this.todos[i].id) {
                    await this.todos.splice(i, 1)
                }
            }
            localStorage.todos = JSON.stringify(this.todos);
            await console.log("Todo removed : " + localStorage.todos);
            await this.$router.push({name: 'TodoList', });
        },
    },
    beforeMount(){
        this.update = this.updateBool;
        if(!this.todo.id && this.id === '0'){
            this.update = true
        }
        if(localStorage.todos){
            this.todos = JSON.parse(localStorage.todos);
            for (let i = 0; i < this.todos.length; ++i) {
                if (this.id == this.todos[i].id) {
                    this.todo = this.todos[i];
                    localStorage.todo = JSON.stringify(this.todo);
                    localStorage.returnChanges = JSON.stringify(this.todo);
                    break;
                }
            }
        }
    },
}
</script>

<style scoped></style>