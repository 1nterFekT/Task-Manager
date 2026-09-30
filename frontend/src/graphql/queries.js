import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query GetTasks {
        allTasks {
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