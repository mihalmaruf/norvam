
import { useState, useCallback, useContext } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";
import { Context, TasksContextProvider } from "./TasksProvider";

//mock data - we will no longer use it, gonna pull daata from taskhooks
const tasksList = [
    { id: 1, title: "First Task", status: "backlog" },
    { id: 2, title: "Second Task", status: "backlog" },
    { id: 3, title: "Third Task", status: "new" },
    { id: 4, title: "Fourth Task", status: "going" },
    { id: 5, title: "Fifth Task", status: "review" },
    { id: 6, title: "Sixth Task", status: "done" },
];

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

    const [myTask, setTaskStatus] = useState(tasksList);
    const { tasks = [] } = useContext(Context);

    const changeTaskStatus = useCallback(
        (id: number, status: string) => {
            let task = myTask.find(task => task.id === id);

            if (task) {
                const taskIndex = myTask.indexOf(task);
                task = { ...task, status };
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
                                        {myTask
                                            .filter(item => item.status === channel)
                                            .map(item => (
                                                <KanbanItem key={item.id} id={item.id}>
                                                    <div style={classes.item}>{item.title}</div>
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


