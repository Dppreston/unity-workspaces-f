import { useState, useEffect } from "react";
const d = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dashDate() {
  let day = days[d.getDay()];
  let month = months[d.getMonth()];

  return (
    <>
      <div className="date">
        <h2 className="date-text">
          Today is <span>{day}</span>, {month} {d.getDate()}th
        </h2>
      </div>
    </>
  );
}
export default dashDate;
