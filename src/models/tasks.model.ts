

export type Task = {
    userId: string;
    title: string;
    status: string;
    description?: string;
}

export type TaskData = {
    id: string;
    task: Task;
}