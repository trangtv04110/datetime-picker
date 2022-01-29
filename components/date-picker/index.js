import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Year from "./year";

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

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowPicker);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const [dayLength, setDayLength] = useState(
    moment().endOf("month").diff(moment().startOf("month"), "days") + 1
  );
  const [weekdayStart, setWeekdayStart] = useState(
    moment().startOf("month").weekday()
  );

  useEffect(() => {
    const thisMonth = moment(`${selectedYear}-${selectedMonth}-01`);
    setDayLength(
      moment(thisMonth)
        .endOf("month")
        .diff(thisMonth.startOf("month"), "days") + 1
    );
    setWeekdayStart(thisMonth.weekday());
  }, [selectedMonth, selectedYear]);

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

  const chooseDate = (date) => {
    setSelectedDate(moment(`${selectedYear}-${selectedMonth}-${date}`));
  };

  const getSelectedClass = (date) => {
    if (
      selectedDate.format("YYYY-M") === `${selectedYear}-${selectedMonth}` &&
      selectedDate.date() === date
    )
      return "selected";
    return "";
  };

  const renderRows = () => {
    let rows = [];
    let arr = [];
    for (let i = 0; i < weekdayStart; i++) {
      arr.push(<td key={i}></td>);
    }
    for (let i = 0; i < dayLength; i++) {
      arr.push(
        <td key={weekdayStart + i + 1}>
          <button
            className={getSelectedClass(i + 1)}
            onClick={() => chooseDate(i + 1)}
          >
            {i + 1}
          </button>
        </td>
      );
      if (arr.length === 7) {
        rows.push(<tr key={`tr-${i}`}>{arr}</tr>);
        arr = [];
      }
    }
    if (arr.length > 0) rows.push(<tr key={`tr-end`}>{arr}</tr>);
    return rows;
  };

  return (
    <div>
      <div className="input-group">
        <label>Date mobile</label>
        <input
          defaultValue={selectedDate.format("MM/DD/YYYY")}
          onClick={() => setShowPicker(!showPicker)}
        />
      </div>

      <div
        className="modal"
        style={
          showPicker
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
      >
        <div className="modal-content" ref={wrapperRef}>
          <div className="modal-header">
            <div
              style={{ paddingLeft: 10, cursor: "pointer" }}
              onClick={() => setShowYearPicker(!showYearPicker)}
            >
              {moment(selectedMonth, "M").format("MMMM")} {selectedYear}
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
            <div style={{ opacity: showYearPicker ? 0 : 1 }}>
              <button onClick={decreaseMonth} style={{ marginRight: 24 }}>
                <span className="material-icons">navigate_before</span>
              </button>
              <button onClick={increaseMonth}>
                <span className="material-icons">navigate_next</span>
              </button>
            </div>
          </div>
          <div
            className="modal-body"
            style={
              showYearPicker
                ? {
                    maxHeight: 284,
                    overflowY: "auto",
                    minHeight: 284,
                    visibility: "visible",
                    opacity: 1,
                    transition: "height: 0.5s",
                  }
                : {
                    height: 0,
                    minHeight: 0,
                    visibility: "hidden",
                    opacity: 0,
                    transition: "height: 0.5s",
                  }
            }
          >
            <Year
              selectedYear={selectedYear}
              handleSelectedYear={(i) => {
                setSelectedYear(i);
                setShowYearPicker(false);
                setSelectedDate(moment(`${i}-${selectedDate.format("MM-DD")}`));
              }}
              showYearPicker={showYearPicker}
            />
          </div>
          <div
            className="modal-body"
            style={
              showYearPicker
                ? {
                    height: 0,
                    minHeight: 0,
                    visibility: "hidden",
                    opacity: 0,
                  }
                : {
                    minHeight: 284,
                    visibility: "visible",
                    opacity: 1,
                  }
            }
          >
            <table>
              <thead>
                <tr>
                  <th>S</th>
                  <th>M</th>
                  <th>T</th>
                  <th>W</th>
                  <th>T</th>
                  <th>F</th>
                  <th>S</th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button onClick={() => setShowPicker(false)}>Cancel</button>
            <button
              onClick={() => setShowPicker(false)}
              style={{ marginLeft: 8 }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
