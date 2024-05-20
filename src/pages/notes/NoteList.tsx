
import { useContext } from "react";
import NoteActionCard from "./NoteActionCard";
import NoteForm from "./NoteForm";
import NoteHeader from './NoteHeader';
import { Context } from "./NotesProvider";
import "./noteList.scss"

const NoteList = (): JSX.Element => {
    const { loading, notes = [], noteFormVisible } = useContext(Context);

    return (
        <section className="notes">
            <div className="new_note">
                <NoteActionCard />
                {
                    noteFormVisible && <NoteForm />
                }
            </div>
            <div className="all_notes">
                {loading &&
                    // We can use reack skeleton or something
                    <p>Notes are loading...</p>
                }
                {
                    notes.map(({ id, note }) =>
                        <div key={id} id={id}>
                            <NoteHeader id={id} text={note?.text} />
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default NoteList;
