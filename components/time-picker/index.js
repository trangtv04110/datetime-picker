import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import MinutePicker from "./minute";
import HourPicker from "./hour";

const addPadding = (number) => {
  const num = Number(number);
  if (num < 10) return `0${num}`;
  return num;
};

function TimePicker({ selected, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const [showMinutePicker, setShowMinutePicker] = useState(false);

  const [confirmTime, setConfirmTime] = useState(selected);

  const [selectedHour, setSelectedHour] = useState(selected.split(":")[0]);
  const [selectedMinute, setSelectedMinute] = useState(selected.split(":")[1]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

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
              <div className="modal-body flex-center">
                <MinutePicker
                  selectedMinute={selectedMinute}
                  onChange={setSelectedMinute}
                />
              </div>
            ) : (
              <div className="modal-body flex-center">
                <HourPicker
                  selectedHour={selectedHour}
                  onChange={(h) => {
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
                  const value = `${addPadding(selectedHour)}:${addPadding(
                    selectedMinute
                  )}`;
                  setConfirmTime(value);
                  setShowPicker(false);
                  onChange(value);
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

TimePicker.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

TimePicker.defaultProps = {
  selected: moment().format("HH:mm"),
  onChange: () => {},
};

export default TimePicker;
