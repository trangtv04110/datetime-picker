import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Year from "./year";
import Date from "./date";

function DatePicker({ selected, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const [confirmDate, setConfirmDate] = useState(selected);
  const [selectedDate, setSelectedDate] = useState(selected);

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

  const increaseMonth = () => {
    setSelectedDate(moment(selectedDate).add(1, "month").format("YYYY-MM-DD"));
  };

  const decreaseMonth = () => {
    setSelectedDate(
      moment(selectedDate).subtract(1, "month").format("YYYY-MM-DD")
    );
  };

  return (
    <div>
      <div className="input-group">
        <label>Date picker</label>
        <input
          defaultValue={moment(confirmDate).format("MM/DD/YYYY")}
          onClick={() => {
            setSelectedDate(confirmDate);
            setShowYearPicker(false);
            setShowPicker(true);
          }}
        />
      </div>

      {showPicker && (
        <div className="modal">
          <div className="modal-content" ref={wrapperRef}>
            <div className="modal-header">
              <div
                style={{ paddingLeft: 10, cursor: "pointer" }}
                onClick={() => setShowYearPicker(!showYearPicker)}
              >
                {moment(selectedDate).format("MMMM YYYY")}
                <button style={{ marginLeft: 10 }}>
                  <span
                    className="material-icons"
                    style={{
                      transition:
                        "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      transform: showYearPicker
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    arrow_drop_down
                  </span>
                </button>
              </div>
              {!showYearPicker && (
                <div>
                  <button onClick={decreaseMonth} style={{ marginRight: 24 }}>
                    <span className="material-icons">navigate_before</span>
                  </button>
                  <button onClick={increaseMonth}>
                    <span className="material-icons">navigate_next</span>
                  </button>
                </div>
              )}
            </div>
            {showYearPicker ? (
              <div className="modal-body">
                <Year
                  selectedDate={selectedDate}
                  onChange={(date) => {
                    setShowYearPicker(false);
                    setSelectedDate(date);
                  }}
                  showYearPicker={showYearPicker}
                />
              </div>
            ) : (
              <div className="modal-body">
                <Date
                  selectedDate={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                />
              </div>
            )}

            <div className="modal-footer">
              <button onClick={() => setShowPicker(false)}>Cancel</button>
              <button
                onClick={() => {
                  setConfirmDate(selectedDate);
                  setShowPicker(false);
                  onChange(selectedDate);
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

DatePicker.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  selected: moment().format("YYYY-MM-DD"),
  onChange: () => {},
};

export default DatePicker;
