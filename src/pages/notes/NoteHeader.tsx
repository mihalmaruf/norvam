import { useContext } from "react";
import { Context } from "./NotesProvider";
import "./noteHeader.scss"



interface NoteHeaderProps {
    id: string,
    text: string,
}

const NoteHeader = ({ id, text }: NoteHeaderProps): JSX.Element => {
    const { deleteNote, message } = useContext(Context);

    const deleteNotes = async () => {
        try {
            await deleteNote(id);
        } catch (error) {
            //TO DO => we can add toast or even modal to show a friendly message to our users
            console.log(message);
        }
    };

    return (
        <div className="note_header">
            <div>
                <p>{text}</p>
            </div>
            <div>
                <button
                    className="note_button"
                    onClick={deleteNotes}
                >
                    X
                </button>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export default NoteHeader;
