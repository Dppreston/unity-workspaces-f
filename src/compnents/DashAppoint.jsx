import { useState, useEffect, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function DashAppoint({ selectedTitle }) {
  //refs
  const appointGrid = useRef("");
  const createAppointment = useRef("");
  //state
  const [userData, setUserData] = useState("");
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");
  const [appointRes, setAppointRes] = useState("");
  const [err, setErr] = useState("");
  let appointmentId = "";

  //create appointment button

  const handleCreateAppointBtn = (e) => {
    if (e) {
      appointGrid.current.classList.add("hidden");
      createAppointment.current.classList.remove("hidden");
    }
  };

  //appointment back btn

  const handleAppointBack = (e) => {
    if (e) {
      appointGrid.current.classList.remove("hidden");
      createAppointment.current.classList.add("hidden");
    }
  };

  //Initial Fetch

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/users?appointments=${selectedTitle}&token=${token}&date=${appointmentDate} `
      );
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //appointment submit

  const handleSubmitAppoint = (e) => {
    e.preventDefault();
    postAppointment();

    setTimeout(() => {
      fetchAppointments();
    }, 150);

    appointGrid.current.classList.remove("hidden");
    createAppointment.current.classList.add("hidden");
  };

  //post appointment

  const postAppointment = async () => {
    const appointmentData = {
      appointmentTitle: appointmentTitle,
      appointmentDate: appointmentDate,
      appointmentNotes: appointmentNotes,
      noteAddID: token,
    };
    try {
      const res = await axios.put(
        `http://localhost:9000/users?appointment=${selectedTitle}`,
        appointmentData
      );
      setAppointRes(<p className="success">{res.data}</p>);
      setTimeout(() => {
        setAppointRes("");
      }, 1500);
    } catch (err) {
      setErr(
        <p className="error">
          {setErr("Something went wrong. Please Try again")}
        </p>
      );
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };

  //delete appointment

  const handleDeleteAppoint = (e) => {
    e.preventDefault();
    appointmentId = e.currentTarget.value;
    deleteAppointment();

    setTimeout(() => {
      fetchAppointments();
    }, 100);
  };

  const deleteAppointment = async () => {
    const deleteData = {
      appointmentId: appointmentId,
      appointUserId: token,
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/users?appointDeleteConfirm=true`,
        deleteData
      );
      setAppointRes(<p className="success">{res.data}</p>);
      setTimeout(() => {
        setAppointRes("");
      }, 1500);
    } catch (err) {
      setErr(
        <p className="error">
          {setErr("Something went wrong. Please Try again")}
        </p>
      );
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <div className="dash-content-wrapper appointment-wrapper">
        <div className="appointment-top-cont">
          <button
            className="new-appointment btn-style"
            onClick={handleCreateAppointBtn}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <div className="appoint-top-fill">
            {appointRes}
            {err}
          </div>
        </div>
        <div className="appointment-grid" ref={appointGrid}>
          {userData &&
            userData?.map((user) =>
              user.appointments.map((appointments) => (
                <div className="appointment" key={appointments._id}>
                  <div className="appointment-title-cont">
                    <h4>{appointments.appointTitle}</h4>
                    <button
                      onClick={handleDeleteAppoint}
                      value={appointments._id}
                      className="appointment-delete-btn"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <h4 id="appointment-date-tile">{`${appointments.appointDate[5]}${appointments.appointDate[6]} / ${appointments.appointDate[8]}${appointments.appointDate[9]} / ${appointments.appointDate[0]}${appointments.appointDate[1]}${appointments.appointDate[2]}${appointments.appointDate[3]}`}</h4>
                  <p>{appointments.appointNotes}</p>
                </div>
              ))
            )}
        </div>
        <div className="createAppoint-cont hidden" ref={createAppointment}>
          <div className="create-appoint">
            <h2>Create Appointment</h2>
            <div className="appoint-label-container">
              <label
                htmlFor="appoint-title"
                className="appointment-label-style"
              >
                Appointment Title
                <input
                  className="settings-input-style"
                  id="appointment-title"
                  placeholder="Appointment Name"
                  type="text"
                  onChange={(e) => {
                    setAppointmentTitle(e.currentTarget.value);
                  }}
                ></input>
              </label>
              <label htmlFor="appoint-date" className="appointment-label-style">
                Appointment Date
                <input
                  type="date"
                  className="settings-input-style"
                  id="appointment-date"
                  onChange={(e) => {
                    setAppointmentDate(e.currentTarget.value);
                  }}
                ></input>
              </label>
              <label
                htmlFor="appoint-notes"
                className="appointment-label-style"
              >
                Appointment Notes
                <input
                  className="settings-input-style"
                  id="appointment-title"
                  placeholder="Appointment Notes"
                  type="text"
                  onChange={(e) => {
                    setAppointmentNotes(e.currentTarget.value);
                  }}
                ></input>
              </label>
            </div>
            <div className="appointment-btn-container">
              <button
                className="btn-style"
                id="appointment-back"
                onClick={handleAppointBack}
              >
                Back
              </button>
              <button
                className="btn-style"
                id="save-appointment"
                onClick={handleSubmitAppoint}
              >
                Save Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DashAppoint;
