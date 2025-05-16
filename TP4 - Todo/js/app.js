const {createApp} = Vue;

createApp({
    data() {
        return {
            tasks: [],
            newTask: {
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                status: 'à faire',
                priority: 'moyenne'
            },
            filterStatus: '',
            filterPriority: '',
            filterStartDate: '',
            filterEndDate: '',
            sortOption: '',
            sortOrder: 'asc',
            editingTask: null,
            showForm: false,
            searchQuery: '',
            statuses: ['à faire', 'en cours', 'terminé'],
            priorities: ['basse', 'moyenne', 'haute']
        };
    },
    computed: {
        filteredTasks() {
            let tasks = this.tasks.filter(task => {
                const matchesStatus = this.filterStatus ? task.status === this.filterStatus : true;
                const matchesPriority = this.filterPriority ? task.priority === this.filterPriority : true;
                const matchesStartDate = this.filterStartDate ? task.startDate >= this.filterStartDate : true;
                const matchesEndDate = this.filterEndDate ? task.endDate <= this.filterEndDate : true;
                const matchesSearch = this.searchQuery ?
                    task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                    : true;
                return matchesStatus && matchesPriority && matchesStartDate && matchesEndDate && matchesSearch;
            });

            if (this.sortOption) {
                tasks = tasks.slice().sort((a, b) => {
                    let valueA = a[this.sortOption];
                    let valueB = b[this.sortOption];
                    if (this.sortOption === 'startDate' || this.sortOption === 'endDate') {
                        valueA = new Date(valueA);
                        valueB = new Date(valueB);
                    }
                    if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
                    if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            return tasks;
        }
    },
    methods: {
        addTask() {
            if (this.newTask.title && this.newTask.description && this.newTask.startDate && this.newTask.endDate) {
                const newTask = {...this.newTask, id: Date.now(), showDetails: false};
                this.tasks.push(newTask);
                this.saveTasks();
                this.newTask = {
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    status: 'à faire',
                    priority: 'moyenne'
                };
                this.showForm = false;
            }
        },
        deleteTask(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.saveTasks();
            }
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        loadTasks() {
            const tasks = localStorage.getItem('tasks');
            if (tasks) {
                this.tasks = JSON.parse(tasks).map(task => ({
                    ...task,
                    showDetails: false // Toujours masquer les détails au chargement
                }));
            }
        },
        updateTask(task) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                this.tasks[index] = { ...task }; // Met à jour la tâche dans la liste
            }
            this.editingTask = null;
            this.saveTasks(); // Sauvegarde les modifications
        },
        startEditing(task) {
            this.editingTask = {...task};
        },
        cancelEditing() {
            this.editingTask = null;
        },
        toggleTaskDetails(task) {
            task.showDetails = !task.showDetails;
        },
        toggleForm() {
            this.showForm = !this.showForm;
        },
        clearFilters() {
            this.filterStatus = '';
            this.filterPriority = '';
            this.filterStartDate = '';
            this.filterEndDate = '';
            this.searchQuery = '';
            this.sortOption = '';
            this.sortOrder = 'asc';
        }
    },
    mounted() {
        this.loadTasks();
    }
}).mount('#app');