<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <h1 class="h3 mb-4 text-gray-800">
            <b-icon-backspace-fill v-if="this.$route.name!=='TodoList'" variant="success" @click="todoList"></b-icon-backspace-fill>
            {{ this.$route.name }}
            <button v-if="this.$route.name==='TodoList'" class="btn btn-primary btn-icon-split btn-sm">
                <span class="text" @click="newTodo">New Todo</span>
            </button>
        </h1>
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
                this.$router.push({name: 'TodoPage', params: { id: '0'}})
            },
        },
    }
</script>

<style scoped>

</style>