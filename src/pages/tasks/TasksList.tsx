
import { useState, useCallback, useContext } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";
import { Context, TasksContextProvider } from "./TasksProvider";
import { TaskData } from "../../models/tasks.model";

//mock data - we will no longer use it, gonna pull daata from taskhooks
// const tasksList: TaskData[] = [
//     { id: "1", task: { title: "First Task", status: "backlog", id: '' } },
//     { id: "2", task: { title: "Second Task", status: "backlog", id: '' } },
//     { id: "3", task: { title: "Third Task", status: "new", id: '' } },
//     { id: "4", task: { title: "Fourth Task", status: "going", id: '' } },
//     { id: "5", task: { title: "Fifth Task", status: "review", id: '' } },
//     { id: "6", task: { title: "Sixth Task", status: "done", id: '' } },
// ];

const channels = ["backlog", "new", "wip", "review", "done"];
const labelsMap = {
    backlog: "Backlog",
    new: "To Do",
    wip: "In Progress",
    review: "Review",
    done: "Done"
};

// Just a basic css to work, we can replace it
const classes = {
    board: {
        display: "flex",
        margin: "0 auto",
        width: "90vw",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif'
    },
    column: {
        minWidth: 200,
        width: "18vw",
        height: "80vh",
        margin: "0 auto",
        backgroundColor: "#FCC8B2"
    },
    columnHead: {
        padding: 10,
        fontSize: "1.2em",
        backgroundColor: "#C6D8AF"
    },
    item: {
        padding: 10,
        margin: 10,
        fontSize: "0.8em",
        cursor: "pointer",
        backgroundColor: "white"
    }
};

const TasksList = () => {

    const { tasks = [], loading, loaded } = useContext(Context);
    const [myTask, setTaskStatus] = useState<TaskData[]>(tasks);


    if (!loading && loaded && myTask.length === 0) {
        setTaskStatus(tasks);
    }



    const changeTaskStatus = useCallback(
        (id: string, status: string) => {
            let task = myTask.find(task => task.id === id);

            if (task) {
                const taskIndex = myTask.indexOf(task);
                task = { ...task };
                task.task.status = status;
                const newTasks = update(myTask, {
                    [taskIndex]: { $set: task }
                });
                setTaskStatus(newTasks);
                //update task using tasks-hooks
            }

        },
        [myTask]
    );

    return (
        <main>
            <header> Board </header>
            <TasksContextProvider>
                <DndProvider backend={HTML5Backend}>
                    <section style={classes.board}>
                        {channels.map(channel => (
                            <KanbanColumn
                                key={channel}
                                status={channel}
                                changeTaskStatus={changeTaskStatus}
                            >
                                <div style={classes.column}>
                                    <div style={classes.columnHead}>{Object.entries(labelsMap).find(lab => lab[0] === channel)?.at(1)}</div>
                                    <div>
                                        {myTask && myTask
                                            .filter(item => item.task.status === channel)
                                            .map(item => (
                                                <KanbanItem key={item.id} id={item.id}>
                                                    <div style={classes.item}>{item.task.title}</div>
                                                </KanbanItem>
                                            ))}
                                    </div>
                                </div>
                            </KanbanColumn>
                        ))}
                    </section>
                </DndProvider>
            </TasksContextProvider>
        </main>
    )
}

export default TasksList


