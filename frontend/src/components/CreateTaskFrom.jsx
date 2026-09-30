import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { CREATE_TASK } from "../graphql/mutations";
import { GET_TASKS } from "../graphql/queries";

export default function CreateTaskForm() {
    const [title, setTitle] = useState("");
    const [desc, setdesc] = useState("");

    const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
        refetchQueries: [GET_TASKS],
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {
            await createTask({
                variables: {
                    input: {
                        title: title.trim(),
                        desc,
                        isCompleted: false,
                    },
                },
            });

            setTitle("");
            setdesc("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section>
            <h2>Создать задачу</h2>

            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Название задачи"
                />

                <input
                    required
                    type="text"
                    value={desc}
                    onChange={(event) => setdesc(event.target.value)}
                    placeholder="Описание задачи"
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Создание..." : "Создать"}
                </button>
            </form>

            {error && <p>Не удалось создать задачу: {error.message}</p>}
        </section>
    );
}
