export type Note = {
    id: string;
    text: string;
    createdAt: Date;
}

export type NoteData = {
    id: string;
    note: Note;
}