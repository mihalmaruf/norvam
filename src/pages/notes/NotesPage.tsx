import NoteList from "./NoteList"
import { NotesContextProvider } from "./NotesProvider"



const NotesPage = (): JSX.Element => {


    return (
        <NotesContextProvider>
            <NoteList />
        </NotesContextProvider>
    )
}

export { NotesPage }