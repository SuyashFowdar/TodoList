const app = Vue.createApp({
    setup() {
        const todos = Vue.ref([]);
        const todosDone = Vue.ref([]);
        const selectedIndex = Vue.ref(null);
        const newTodo = Vue.ref({});
        const score = Vue.ref(0);
        const showPopup = Vue.ref('d-none');

        const toggleEdit = (index) => {
            selectedIndex.value = index;
            newTodo.value = _.cloneDeep(todos.value[index]);
            showPopup.value = 'd-flex';
        };

        const deleteItem = (arr, index) => {
            arr.splice(index, 1);
            setTodos();
        };

        const submit = (e) => {
            e.preventDefault();
            if (selectedIndex.value === null) {
                todos.value.push(newTodo.value);
            } else {
                todos.value[selectedIndex.value] = _.cloneDeep(newTodo.value);
                selectedIndex.value = null;
                showPopup.value = 'd-none';
            }
            newTodo.value = {};
            setTodos();
        };

        const setDone = (todoIndex, done) => {
            if (done) {
                todosDone.value.push(todos.value[todoIndex]);
                todos.value.splice(todoIndex, 1);
            } else {
                todos.value.push(todosDone.value[todoIndex]);
                todosDone.value.splice(todoIndex, 1);
            }
            setTodos();
        };

        const setTodos = (init) => {
            if (init) {
                todos.value = JSON.parse(localStorage.todos || '[]');
                todosDone.value = JSON.parse(localStorage.todosDone || '[]');
            } else {
                localStorage.todos = JSON.stringify(todos.value);
                localStorage.todosDone = JSON.stringify(todosDone.value);
            }

            score.value = todos.value.length;
        };

        setTodos(true);

        return {
            todos,
            todosDone,
            selectedIndex,
            newTodo,
            score,
            showPopup,
            toggleEdit,
            deleteItem,
            submit,
            setDone,
            setTodos
        }
    }
});

app.mount('#app');

