import TaskList from "./components/TaskList";
import CreateTaskForm from "./components/CreateTaskFrom";

export default function App() {
    return (
        <main>
            <h1>Менеджер задач</h1>

            <CreateTaskForm />

            <TaskList />
        </main>
    );
}
