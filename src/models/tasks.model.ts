import { AssetData } from "./assets.model";

export type Task = {
    userId: string;
    title: string;
    status: string;
    description?: string;
    assets?: AssetData[];
}

export type TaskData = {
    id: string;
    task: Task;
}