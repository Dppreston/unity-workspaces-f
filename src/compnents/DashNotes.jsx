import { useEffect, useState, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
let currentNoteArr = [];

function DashNotes({ selectedTitle }) {
  //refs
  const noteContent = useRef(null);
  const createNote = useRef(null);
  const noteNav = useRef(null);

  //states
  const [currentNoteState, setCurrentNoteState] = useState("");
  const [currentNotes, setCurrentNotes] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [noteId, setNoteId] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");
  const [error, setError] = useState("");

  //button handles

  const handleCreateNote = (e) => {
    if (e) {
      noteContent.current.classList.add("hidden");
      noteNav.current.classList.add("hidden");
      createNote.current.classList.remove("hidden");
    }
  };

  const handleBackNote = (e) => {
    if (e) {
      noteContent.current.classList.remove("hidden");
      noteNav.current.classList.remove("hidden");
      createNote.current.classList.add("hidden");
      setNoteTitle("");
      setNewNoteContent("");
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    addNote();
    setCurrentNotes("");
    noteContent.current.classList.remove("hidden");
    noteNav.current.classList.remove("hidden");
    createNote.current.classList.add("hidden");

    //refetch Notes
    setTimeout(() => {
      fetchNotes();
    }, 50);

    //error clear
    setTimeout(() => {
      setUpdatedNote("");
      setError("");
    }, 1500);
  };

  const handleDeleteNote = (e) => {
    e.preventDefault();
    if (noteId === "") {
      setUpdatedNote(
        <span className="error">Please Select Note To Delete</span>
      );
      setTimeout(() => {
        setUpdatedNote("");
      }, 1500);
      fetchNotes();
    } else {
      deleteNote();
      setCurrentNotes("");
      setNoteId("");
      setTimeout(() => {
        fetchNotes();
      }, 50);

      setTimeout(() => {
        setUpdatedNote("");
        setError("");
      }, 1500);

      currentNoteArr.pop();
    }
  };

  //fetch, create note, delete note functions

  const deleteNote = async () => {
    const deleteNoteData = {
      noteId: noteId,
      userId: token,
    };

    try {
      const res = await axios.put(
        "http://localhost:9000/users",
        deleteNoteData
      );
      setUpdatedNote(<span className="success">{res.data}</span>);
    } catch (err) {
      setError(err);
    }
  };

  const addNote = async () => {
    const noteData = {
      _id: token,
      noteTitle: noteTitle,
      newNoteContent: newNoteContent,
    };

    try {
      const res = await axios.put("http://localhost:9000/users", noteData);
      setUpdatedNote(<span className="success">{res.data}</span>);
    } catch (err) {
      setError(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/users?notes=${selectedTitle}&token=${token}`
      );
      setCurrentNotes(res.data);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    fetchNotes();
    currentNoteArr = [];
  }, []);

  useEffect(() => {}, [currentNoteArr]);

  return (
    <>
      <div className="dash-content-wrapper">
        <div className="notes-cont">
          <div className="notes-bottom-cont">
            <div className="note-nav" ref={noteNav}>
              <h3 className="note-nav-title">Current Notes</h3>
              {currentNotes &&
                currentNotes?.map((notes) =>
                  notes.notes?.map((current) => (
                    <button
                      className="note"
                      key={current._id}
                      value={current._id}
                      onClick={() => {
                        if (currentNoteArr.length == 0) {
                          currentNoteArr.push(current);
                          setCurrentNoteState(current);
                          setNoteId(current._id);
                        } else if (currentNoteArr[0]._id != current._id) {
                          currentNoteArr.pop();
                          setCurrentNoteState("");
                          currentNoteArr.push(current);
                          setCurrentNoteState(current);
                          setNoteId(current._id);
                        }
                      }}
                    >
                      <div className="note-preview-cont">
                        <h2>{current.noteTitle}</h2>
                      </div>
                      <i className="fa-solid fa-caret-right"></i>
                    </button>
                  ))
                )}

              <div className="create-note-cont">
                <button className="create-note" onClick={handleCreateNote}>
                  <h2>Create Note</h2>
                  <i className="fa-solid fa-pencil" id="create-new-note"></i>
                </button>
              </div>
            </div>
            <div className="note-content-cont" ref={noteContent}>
              <div className="note-title-cont">
                <h3 className="note-title">
                  {currentNoteArr[0]?.noteTitle || ""}
                </h3>
                {updatedNote}
                <i
                  className="fa-solid fa-trash-can"
                  onClick={handleDeleteNote}
                ></i>
              </div>
              <p className="note-content">{currentNoteArr[0]?.noteContent}</p>
            </div>
            <div className="create-note-content-cont hidden" ref={createNote}>
              <form className="create-note-content">
                <label>
                  Note Title
                  <input
                    type="text"
                    className="new-note-title settings-input-style"
                    onChange={(e) => {
                      setNoteTitle(e.currentTarget.value);
                    }}
                    required
                  />
                </label>
                <label>
                  Note
                  <textarea
                    name="note"
                    id="new-note"
                    cols="30"
                    rows="10"
                    className="settings-input-style"
                    onChange={(e) => {
                      setNewNoteContent(e.currentTarget.value);
                    }}
                    required
                  ></textarea>
                </label>
                <div className="note-btn-cont">
                  <button
                    className="back-note btn-style"
                    onClick={handleBackNote}
                  >
                    Back
                  </button>
                  <button
                    className="save-note btn-style"
                    onClick={handleSaveNote}
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashNotes;
