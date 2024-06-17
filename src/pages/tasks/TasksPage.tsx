import TasksList from "./TasksList"
import { TasksContextProvider } from "./TasksProvider"

const TasksPage = () => {
  return (

    <TasksContextProvider>
      <TasksList />
    </TasksContextProvider>
  )
}

export default TasksPage