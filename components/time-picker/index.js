import { useState, useEffect, useRef } from "react";
import moment from "moment";
import MinutePicker from "./minute";
import HourPicker from "./hour";

const addPadding = (number) => {
  if (number < 10) return `0${number}`;
  return number;
};

function useOutsideAlerter(ref, setShowPicker) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function TimePicker() {
  const [showPicker, setShowPicker] = useState(false);

  const [showMinutePicker, setShowMinutePicker] = useState(false);

  const [confirmTime, setConfirmTime] = useState(moment().format("HH:mm"));

  const [selectedHour, setSelectedHour] = useState(moment().format("HH"));
  const [selectedMinute, setSelectedMinute] = useState(moment().format("mm"));

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowPicker);

  return (
    <div>
      <div className="input-group">
        <label>Time picker</label>
        <input
          defaultValue={confirmTime}
          onClick={() => {
            setShowMinutePicker(false);
            setSelectedHour(confirmTime.split(":")[0]);
            setSelectedMinute(confirmTime.split(":")[1]);
            setShowPicker(true);
          }}
        />
      </div>

      {showPicker && (
        <div className="modal">
          <div className="modal-content" ref={wrapperRef}>
            <div
              className="modal-header flex-center"
              style={{ position: "relative" }}
            >
              <h1 style={{ fontWeight: 500, letterSpacing: "0.15rem" }}>
                {addPadding(selectedHour)}:{addPadding(selectedMinute)}
              </h1>
              <button
                style={{
                  position: "absolute",
                  right: 0,
                }}
              >
                <span
                  className="material-icons"
                  style={{
                    transition:
                      "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    transform: showMinutePicker
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                  onClick={() => setShowMinutePicker(!showMinutePicker)}
                >
                  switch_left
                </span>
              </button>
            </div>

            {showMinutePicker ? (
              <div
                className="modal-body flex-center"
                style={{ minHeight: 284 }}
              >
                <MinutePicker
                  selectedMinute={selectedMinute}
                  setSelectedMinute={setSelectedMinute}
                />
              </div>
            ) : (
              <div
                className="modal-body flex-center"
                style={{ minHeight: 284 }}
              >
                <HourPicker
                  selectedHour={selectedHour}
                  setSelectedHour={(h) => {
                    setSelectedHour(h);
                    setShowMinutePicker(true);
                  }}
                />
              </div>
            )}

            <div className="modal-footer">
              <button onClick={() => setShowPicker(false)}>Cancel</button>
              <button
                onClick={() => {
                  setConfirmTime(
                    `${addPadding(selectedHour)}:${addPadding(selectedMinute)}`
                  );
                  setShowPicker(false);
                }}
                style={{ marginLeft: 8 }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
