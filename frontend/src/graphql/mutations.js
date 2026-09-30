import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CreateTask($input: TaskInput!) {
        createTask(input: $input) {
            id
            title
            desc
            isCompleted
            category {
                name
                color
            }
        }
    }
`;

export const COMPLETE_TASK = gql`
    mutation CompleteTask($id: ID!) {
        completeTask(id: $id) {
            id
            title
            desc
            isCompleted
            category {
                name
                color
            }
        }
    }
`;