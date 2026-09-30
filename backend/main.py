import strawberry
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

@strawberry.input
class TaskInput:
    title: str
    desc: str
    is_completed: bool = False

@strawberry.type
class Category:
    name: str
    color: str

@strawberry.type
class Task:
    id: strawberry.ID
    title: str
    desc: str
    is_completed: bool
    category: Category

education = Category(
    name="Учеба",
    color="Синий"
)

work = Category(
    name="Работа",
    color="Черный"
)

tasks_db = []

@strawberry.type
class Query:
    @strawberry.field
    def all_tasks(self) -> list[Task]:
        return tasks_db

    @strawberry.field
    def task(self, id: strawberry.ID) -> Task | None:
        return next(
            (task for task in tasks_db if task.id == id),
            None
        )

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, input: TaskInput) -> Task:
        new_task = Task(
            id=strawberry.ID(str(len(tasks_db) + 1)),
            title=input.title,
            desc=input.desc,
            is_completed=input.is_completed,
            category=Category(
                name="Без категории",
                color="Серый"
            )
        )

        tasks_db.append(new_task)

        return new_task

    @strawberry.mutation
    def complete_task(self, id: strawberry.ID) -> Task | None:
        for task in tasks_db:
            if task.id == id:
                task.is_completed = True
                return task

        return None

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation
)

graphql_app = GraphQLRouter(schema)

app = FastAPI(
    title="Task Manager GraphQL API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    graphql_app,
    prefix="/graphql"
)

@app.get("/")
def alive():
    return {"message": "Сервер GraphQL запущен"}