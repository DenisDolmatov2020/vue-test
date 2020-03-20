<template>
    <nav class="row navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div class="col-12">
            <button v-if="this.$route.name!=='TodoList'"  class="btn btn-success btn-icon-split btn-sm float-left mr-2" @click="todoList">
                Back
            </button>
            <button v-else class="btn btn-primary btn-icon-split btn-sm float-right">
                <span class="text" @click="newTodo">New Todo</span>
            </button>
            <h3>{{ this.$route.name }}</h3>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Nav",
        methods: {
            todoList(){
                this.$router.push({name: 'TodoList'})
            },
            newTodo(){
                console.log('New todo page');
                this.$router.push({name: 'NewTodoPage', params: { update: true }});
            },
        },
    }
</script>

<style scoped>

</style>