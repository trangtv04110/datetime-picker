import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Year from "./year";
import Date from "./date";

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

export default function DatePicker() {
  const [showPicker, setShowPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const [confirmDate, setConfirmDate] = useState(moment());

  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowPicker);

  const increaseMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const decreaseMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  return (
    <div>
      <div className="input-group">
        <label>Date mobile</label>
        <input
          defaultValue={confirmDate.format("MM/DD/YYYY")}
          onClick={() => {
            setSelectedDate(confirmDate);
            setSelectedMonth(confirmDate.month() + 1);
            setSelectedYear(confirmDate.year());
            setShowPicker(!showPicker);
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
                {moment(
                  `${selectedYear}-${selectedMonth}-01`,
                  "YYYY-M-DD"
                ).format("MMMM")}{" "}
                {selectedYear}
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
              <div
                className="modal-body"
                style={{ height: 284, overflowY: "auto" }}
              >
                <Year
                  selectedYear={selectedYear}
                  handleSelectedYear={(i) => {
                    setSelectedYear(i);
                    setShowYearPicker(false);
                    setSelectedDate(
                      moment(`${i}-${selectedDate.format("MM-DD")}`)
                    );
                  }}
                  showYearPicker={showYearPicker}
                />
              </div>
            ) : (
              <div className="modal-body" style={{ minHeight: 284 }}>
                <Date
                  selectedDate={selectedDate}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            )}

            <div className="modal-footer">
              <button onClick={() => setShowPicker(false)}>Cancel</button>
              <button
                onClick={() => {
                  setConfirmDate(selectedDate);
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
