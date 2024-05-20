import React, { ReactNode } from "react";
import useNotes from "./notes-hooks";
import { Note, NoteData } from "../../models/notes.model";


interface NotesContextType {
    loading: boolean;
    noteFormVisible: boolean;
    notes: NoteData[];
    addNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    message: string;
}

const initState: NotesContextType = {
    loading: false,
    noteFormVisible: false,
    notes: [],
    message: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addNote: async (_note) => { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteNote: async (_id) => { },
}

export const Context = React.createContext<NotesContextType>(initState);

interface NotesContextProviderProps {
    children: ReactNode;
}

export const NotesContextProvider = ({ children }: NotesContextProviderProps) => {
    const { loading, notes, addNote, deleteNote, message, noteFormVisible } = useNotes();

    return (
        <Context.Provider value={{ loading, notes, addNote, deleteNote, message, noteFormVisible }}>
            {children}
        </Context.Provider>
    );
};