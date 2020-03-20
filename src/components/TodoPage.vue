<template>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="card shadow">
                <!-- head todo page -->
                <TodoPageHeader :todo="todo" :update="update" :cancelTodo="cancelTodo" @show="showModal" @cancelChanges="cancelChanges">
                    <button class="btn btn-outline-warning float-right" @click.prevent="update=!update">
                        Update
                    </button>
                </TodoPageHeader>
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
import TodoPageHeader from "@/components/TodoPageHeader";


export default {
    name: "TodoPage",
    components: {
        TodoPageHeader,
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
            this.todo = await idb.getTodo(this.$route.params.id);
            this.cancelTodo = JSON.stringify(this.todo)
        }
    },
}

</script>

<style scoped>

</style>