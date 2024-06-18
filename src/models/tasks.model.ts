

export type Task = {
    id: string;
    title: string;
    status: string;
    description?: string;
}

export type TaskData = {
    id: string;
    task: Task;
}