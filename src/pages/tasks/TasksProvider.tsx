import React, { ReactNode } from "react";
import useTasks from "./tasks-hooks";
import { Task, TaskData } from "@/app/models/tasks.model";

interface TasksContextType {
    loading: boolean;
    tasks: TaskData[];
    addTask: (note: Task) => Promise<void>;
    updateTask: (id: string, task: Task) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    message: string;
}

const initState: TasksContextType = {
    loading: false,
    tasks: [],
    message: '',

    addTask: async (note) => { },
    updateTask: async (id, task) => { },
    deleteTask: async (id) => { },
}

export const Context = React.createContext<TasksContextType>(initState);

interface TasksContextProviderProps {
    children: ReactNode;
}

export const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
    const { loading, tasks, addTask, updateTask, deleteTask, message, } = useTasks();

    return (
        <Context.Provider value={{ loading, tasks, addTask, updateTask, deleteTask, message }}>
            {children}
        </Context.Provider>
    );
};