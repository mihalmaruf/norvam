export type Note = {
    userId: string;
    text: string;
    createdAt: Date;
}

export type NoteData = {
    id: string;
    note: Note;
}