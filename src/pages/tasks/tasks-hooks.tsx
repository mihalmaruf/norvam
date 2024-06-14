
import { db } from '../../firebase-config'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, query, where, doc } from "firebase/firestore";
import { Task, TaskData } from '../../models/tasks.model';
import { useState, useEffect, useCallback } from 'react';

import useUserSession from '../../context/user-session-hooks';

function useTasks() {

    const userSessionHooks = useUserSession();
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');


    const tasksCallback = useCallback(async () => {
        if (tasks.length === 0 && !loading && !loaded) {
            setLoading(true);

            const q = query(collection(db, "tasks"), where("task.id", "==", userSessionHooks.getUserSession()?.uid));

            await getDocs(q)
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));

                    setTasks(newData as TaskData[]);
                    setLoading(false);
                    setLoaded(true);
                })
        }
    }, [tasks.length, loading, loaded, userSessionHooks]);


    const addTask = async (task: Task) => {
        try {
            const taskRef = await addDoc(collection(db, "tasks"), {
                task: task
            });

            setMessage(`Task added with ID:  ${taskRef.id}`);
            refreshData();
        } catch (e) {
            setMessage(`Error: adding Task ${e}`);
        }
    }

    const updateTask = async (taskId: string, task: Task) => {
        const docRef = doc(db, "tasks", taskId);
        const { title, status, description } = task;

        await updateDoc(docRef, {
            title: title,
            status: status,
            description: description,

        }).then(() => {
            setMessage("Entire Task has been updated successfully.");
            refreshData();
        }).catch(error => {
            setMessage(`Error: updating Task: , ${error}`);
        })
    };


    const deleteTask = async (taskId: string) => {
        const docRef = doc(db, "tasks", taskId);

        await deleteDoc(docRef).then(() => {
            setMessage("Entire Task has been deleted successfully.");
            refreshData();
        }).catch(error => {
            setMessage(`Error: removing Task: , ${error}`);
        })
    };

    const refreshData = (): void => {
        setTasks([]);
        tasksCallback();
        setMessage('');
    }

    useEffect(() => {
        tasksCallback();
    }, [tasksCallback]);

    return { loading, tasks, addTask, updateTask, deleteTask, message };
}

export default useTasks;
