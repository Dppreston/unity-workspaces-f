import { useRef } from "react";

function Dashboardtile({ tileData, tileTitle }) {
  return (
    <>
      <div className="dash-tile">
        <div className="dash-tile-top">
          <h3>{tileTitle}</h3>
        </div>
        <div className="dash-tile-bottom">
          {tileData.length == 0 ? (
            <p className="empty-dash-filler">
              Your most recent <span> {tileTitle} </span>will appear here
            </p>
          ) : (
            tileData &&
            tileData
              ?.filter((data, idx) => idx < 2)
              .map((data) => (
                <div className="dash-inner-tile" key={data._id}>
                  <h4 className="inner-tile-title" id="dash-appoint-title">
                    {data.appointTitle || data.noteTitle}
                  </h4>
                  {!data.appointDate ? (
                    ""
                  ) : (
                    <h4 className="inner-tile-time">{`${data.appointDate[5]}${data.appointDate[6]} / ${data.appointDate[8]}${data.appointDate[9]} / ${data.appointDate[0]}${data.appointDate[1]}${data.appointDate[2]}${data.appointDate[3]}`}</h4>
                  )}
                  <p className="inner-tile-content">
                    {data.appointNotes || data.noteContent}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}
export default Dashboardtile;
