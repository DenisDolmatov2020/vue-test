<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 offset-lg-2" style="min-width: 800px">
            <div class="card shadow">
                <!-- head todo page -->
                <div class="card-header">
                    <!-- if update page or new page -->
                    <div class="row" >
                        <div  class="col-6 input-group" v-if="update">
                            <input type="text" class="form-control mr-2" title="Title" placeholder="Title" v-model="todo.title">
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
                            <button  class="btn btn-outline-danger float-right ml-2" @click.prevent="showModal(true)" type="button">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <TodoPageTasks :todo="todo" :update="update" />


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
import TodoPageTasks from "@/components/TodoPageTasks";


export default {
    name: "TodoPage",
    components: {
        TodoPageTasks,
        TodoModal,
    },
    data: () => ({
        update: null,
        text: '',
        todo: {
            title: '',
            tasks: [],
            selectedTasks: []
        },
        cancelTodo: '',
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

</style>