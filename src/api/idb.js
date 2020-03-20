const DB_NAME = 'todoDB';
const DB_VERSION = 1;
let DB;

export default {
    async getDb() {
        return new Promise((resolve, reject) => {
            if(DB) { return resolve(DB); }
            console.log('OPENING DB');
            let request = window.indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = e => {
                console.log('Error opening db', e);
                reject('Error');
            };
            request.onsuccess = e => {
                DB = e.target.result;
                resolve(DB);
            };
            request.onupgradeneeded = e => {
                console.log('onupgradeneeded');
                let db = e.target.result;
                db.createObjectStore("todos", { autoIncrement: true, keyPath:'id' });
            };
            console.log('finish getDB');
        });
    },
    async listTodos() {
        let db = await this.getDb();
        return new Promise(resolve => {
            let transaction = db.transaction(['todos'],'readonly');
            transaction.oncomplete = () => {
                resolve(todos);
            };
            let objectStore = transaction.objectStore('todos');
            let todos = [];
            objectStore.openCursor().onsuccess = e => {
                let cursor = e.target.result;
                if (cursor) {
                    todos.push(cursor.value);
                    cursor.continue();
                }
            };
        });
    },
    async getTodo(id) {
        let db = await this.getDb();
        console.log('ID : ' + id);
        return new Promise(resolve => {
            let transaction = db.transaction(['todos'], 'readonly');
            transaction.oncomplete = () => {
                console.log('Transaction Oncomplete result: ' + todo.result.id);
                resolve(todo.result);
            };
            transaction.onerror = function () {
                console.log('Transaction not opened todo to error');
            };
            let todos = transaction.objectStore('todos');
            todos.onsuccess = function () {
                console.log("Todos found", JSON.stringify(todos));
            };
            todos.onerror = function () {
                console.log("Error TODOS", todos.error);
                todos = {}
            };
            let todo = todos.get(id);
            todo.onsuccess = function () {
                console.log("Todo found", todo.result);
            };
            todo.onerror = function () {
                console.log("Error", todo.error);
                todo = {}
            };
        })
    },
    async deleteTodo(id) {
        let db = await this.getDb();
        let transaction = db.transaction('todos','readwrite');
        let todos = transaction.objectStore('todos');
        try {
            await todos.delete(id);
            await transaction.complete;
            console.log('Todo deleted');
        } catch(err) {
            console.log('error', err.message);
        }
    },
    async saveTodo(todo) {
        let db = await this.getDb();
        let transaction = db.transaction('todos','readwrite');
        let todos = transaction.objectStore('todos');
        try {
            await todos.put(todo);
            await transaction.complete;
            console.log('Todo saved');
        } catch(err) {
            console.log('error', err.message);
        }
    },
        /*
        async getTodo(id) {
        let db = await this.getDb();
        console.log('ID : ' + id);
        return new Promise(resolve => {
            let transaction = db.transaction(['todos'], 'readonly');
            transaction.oncomplete = () => {
                console.log('Transaction Oncomplete result: ' + todo.result.id);
                resolve(todo.result);
            };
            transaction.onerror = function () {
                console.log('Transaction not opened todo to error');
            };
            let todos = transaction.objectStore('todos');
            todos.onsuccess = function () {
                console.log("Todos found", JSON.stringify(todos));
            };
            todos.onerror = function () {
                console.log("Error TODOS", todos.error);
                todos = {}
            };
            let todo = todos.get(id);
            todo.onsuccess = function () {
                console.log("Todo found", todo.result);
            };
            todo.onerror = function () {
                console.log("Error", todo.error);
                todo = {}
            };
        })
    },


        async saveTodo(todo) {
        let db = await this.getDb();
        return new Promise(resolve => {
            let trans = db.transaction(['todos'],'readwrite');
            trans.oncomplete = () => {
                resolve();
            };
            let store = trans.objectStore('todos');
            store.put(todo);
        });
    }

        async getTodo(id) {
            console.log('ID ' + id);
            let db = await this.getDb();
            new Promise(resolve => {
                let trans = db.transaction(['todos'],'readwrite');
                trans.oncomplete = () => {
                    resolve(trans);
                };
                let store = await trans.objectStore('todos');
                let todo = await store.get(id);
                return todo.result
            })
        },
        return new Promise(resolve => {
            let transaction = await db.transaction(['todos'], 'readwrite');
            transaction.oncomplete = () => {
                resolve(todo.result);
            };
            transaction.onerror = function () {
                console.log('Transaction not opened todo to error');
            };
            let todos = transaction.objectStore('todos');
            let todo = todos.get(id);
            todo.onsuccess = function () {
                console.log("Todo found", todo.result);
            };
            todo.onerror = function () {
                console.log("Error", todo.error);
                todo = {}
            };
        }).then()

         new Promise(resolve => {
            let trans = db.transaction(['todos'],'readwrite');
            console.log('trans success');
            trans.onsuccess = function() {
                console.log('objectStore success');
                resolve(todo.result);
            };
            let todos = trans.objectStore('todos');
            let todo = todos.get(id);
        });
        //console.log("TODO: " + todo.result
        let db = await this.getDb();
        let transaction = await db.transaction("todos", "readonly");
        let todos = await transaction.objectStore("todos");
        let that = this;
        let request = await todos.get(id);
        request.onsuccess = function() {
            that.todo = request.result;
        };
        request.onerror = function() {
            console.log("Error", request.error);
        };

        return request.result;
         */
        /*let db = await this.getDb();
        var transaction = db.transaction(['todos'], 'readwrite');
        transaction.oncomplete = function() {
            console.log('Transaction completed.');
        };
        transaction.onerror = function() {
            console.log('Transaction not opened due to error');
        };
        var objectStore = transaction.objectStore('todos');
        var objectStoreRequest = objectStore.get(id);
        let todo = {};
        objectStoreRequest.onsuccess = function() {
            // report the success of our request
            console.log('Request successful.');
            console.log(objectStoreRequest.result);
            todo.push(objectStoreRequest.result);
        };
         */

}
/*
await console.log('cancel changes start' + this.todo);
            let db = await idb.getDb();
            let transaction = db.transaction(['todos'], 'readwrite');
            transaction.oncomplete = function() {
                console.log('Transaction completed.');
            };
            transaction.onerror = function() {
                console.log('Transaction not opened due to error');
            };
            var objectStore = transaction.objectStore('todos');
            var objectStoreRequest = objectStore.get(this.todo.id);
            let that = this;
            objectStoreRequest.onsuccess = function() {
                localStorage.returnChanges = JSON.stringify(that.todo);
                that.todo = objectStoreRequest.result;
                console.log('TODO after: ' );
            };
 */