<template>
    <div class="card-header">
        <!-- if update page or new page -->
        <div class="row" >
            <div  class="col-6 input-group" v-if="update">
                <input type="text" class="form-control mr-2" title="Title" placeholder="Title" v-model="todo.title">
                <button v-if="update" class="btn btn-outline-success mr-2" @click.prevent="saveTodo">
                    Save
                </button>
                <button class="btn btn-outline-dark" @click.prevent="show(false)">
                    Cancel
                </button>
            </div>
            <div class="col-6" v-else>
                <h2>
                    <span> {{ todo.title }} </span>
                    <slot></slot>
                </h2>
            </div>
            <div class="col-6" v-if="this.$route.params.id">
                <button v-if="update && cancelChangesButton" class="btn btn-outline-secondary mr-1" @click.prevent="cancelChanges">
                    Return
                </button>
                <button  class="btn btn-outline-danger float-right ml-2" @click.prevent="show(true)" type="button">
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import idb from "@/api/idb";

export default {
    name: "TodoPageHeader",
    props: ['todo', 'update', 'cancelTodo'],
    computed: {
        cancelChangesButton: function(){
            return JSON.stringify(this.todo) !== this.cancelTodo
        },
    },
    methods: {
        show(deleteFlag) {
            this.$emit('show', deleteFlag);
        },
        cancelChanges(){
            this.$emit('cancelChanges');
        },
        async saveTodo (){
            console.log('Saving todo: ' + this.todo.title);
            await idb.saveTodo(this.todo);
            console.log('Saved todo');
            await this.$router.push({name: 'TodoList'})
        },
    },
}
</script>

<style scoped>
</style>