<template>
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
            <div class="col-8 offset-2 mb-3" v-for="(task, index) in todo.tasks.slice().reverse()" :key="task.id">
                <div class="input-group">
                    <input type="checkbox" v-model="todo.selectedTasks" :disabled="!update">
                    <input class="form-control mr-0" type="text" :for="task.selectedTasks"
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
</template>
<script>
export default {
    name: "TodoPageTasks",
    props: ['todo', 'update', ],
    data: () => ({
        new_task: '',
        selectedTask: '',
    }),
    methods: {
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
    },
}
</script>