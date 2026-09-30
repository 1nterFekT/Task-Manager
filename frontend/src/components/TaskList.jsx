import { useMutation, useQuery } from "@apollo/client/react";

import { GET_TASKS } from "../graphql/queries";
import { COMPLETE_TASK } from "../graphql/mutations";

export default function TaskList() {
    const { loading, error, data } = useQuery(GET_TASKS);

    const [completeTask, { loading: completing }] = useMutation(COMPLETE_TASK, {
        refetchQueries: [GET_TASKS],
    });

    if (loading) {
        return <p>Загрузка задач...</p>;
    }

    if (error) {
        return <p>Не удалось загрузить задачи: {error.message}</p>;
    }

    const tasks = data?.allTasks ?? [];

    const handleComplete = async (id) => {
        try {
            await completeTask({
                variables: {
                    id,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <h2>Список задач</h2>

            {tasks.length === 0 && <p>Задач пока нет.</p>}

            {tasks.map((task) => (
                <>
                    <acrticle key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.desc}</p>
                        <p>
                            Статус:{" "}
                            {task.isCompleted ? "Выполнена" : "Не выполнена"}
                        </p>
                        <p>Категория: {task.category.name}</p>
                        <p>Цвет категории: {task.category.color}</p>

                        {!task.isCompleted && (
                            <button
                                onClick={() => handleComplete(task.id)}
                                disabled={completing}
                            >
                                Выполнить
                            </button>
                        )}
                    </acrticle>

                    <hr />
                </>
            ))}
        </section>
    );
}
