
import { db } from '../../firebase-config'
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Note, NoteData } from '../../models/notes.model';
import { useState, useEffect, useCallback } from 'react';

function useNotes() {

    const [notes, setNotes] = useState<NoteData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [noteFormVisible, setFormVisible] = useState<boolean>(false);

    const notesCallback = useCallback(async () => {
        if (notes.length === 0 && !loading) {
            setLoading(true);

            await getDocs(collection(db, "notes"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));

                    setNotes(newData as NoteData[]);
                    setLoading(false);
                })
        }
    }, [notes, loading]);


    const addNote = async (note: Note) => {
        try {
            const noteRef = await addDoc(collection(db, "notes"), {
                note: note
            });

            setMessage(`Note written with ID:  ${noteRef.id}`);
            refreshData();
        } catch (e) {
            setMessage(`Error: adding note ${e}`);
        }
    }

    const deleteNote = async (noteId: string) => {
        const docRef = doc(db, "notes", noteId);

        await deleteDoc(docRef).then(() => {
            setMessage("Entire Note has been deleted successfully.");
            refreshData();
        }).catch(error => {
            setMessage(`Error: removing note: , ${error}`);
        })
    };

    const refreshData = (): void => {
        setNotes([]);
        notesCallback();
        setMessage('');
    }

    useEffect(() => {
        notesCallback();
    }, [notesCallback]);

    return { loading, notes, addNote, deleteNote, message, noteFormVisible, setFormVisible };
}

export default useNotes;
