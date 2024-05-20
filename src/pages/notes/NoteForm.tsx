import { SetStateAction, useContext, useState } from "react";

import { Context } from "./NotesProvider";
import { UserContext } from "../../context/AuthProvider";
import "./noteForm.scss"
import { Note } from "../../models/notes.model";

const NoteForm = (): JSX.Element => {

    const userContext = useContext(UserContext);
    console.log(userContext?.user)
    //here we can get all data from Firebase user, for example: email, uid, emailVerified, etc...

    const noteContext = useContext(Context);

    const [text, setText] = useState("");
    const handletext = (e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value);

    const saveNote = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        const newNote: Note = {
            id: `userid:userid;${userContext?.user?.uid}`,
            text,
            createdAt: new Date()
        };
        try {
            await noteContext.addNote(newNote);

        } catch (error) {
            //TO DO => we can add toast or even modal to show a friendly message to our users
            console.log(noteContext.message);
        }
    }

    return (
        <div className="note_form">
            <form onSubmit={saveNote}>
                <div>
                    <input
                        placeholder="Add Title..."
                    />
                    <textarea
                        placeholder="Add Note..."
                        className="note__input"
                        name="note__input"
                        id="note__input"
                        value={text}
                        onChange={handletext}
                        required
                    />
                </div>
                <div>
                    <button className="btn" type="submit"
                    >Create</button>
                </div>
            </form>
            {noteContext.message && <p >{noteContext.message}</p>}

        </div>
    )
}

export default NoteForm;
