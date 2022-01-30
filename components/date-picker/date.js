import { useState, useEffect } from "react";
import moment from "moment";

export default function Date({
  selectedDate,
  selectedMonth,
  selectedYear,
  setSelectedDate,
}) {
  const [dayLength, setDayLength] = useState(
    moment().endOf("month").diff(moment().startOf("month"), "days") + 1
  );
  const [weekdayStart, setWeekdayStart] = useState(
    moment().startOf("month").weekday()
  );

  useEffect(() => {
    const thisMonth = moment(
      `${selectedYear}-${selectedMonth}-01`,
      "YYYY-M-DD"
    );
    setDayLength(
      moment(thisMonth)
        .endOf("month")
        .diff(thisMonth.startOf("month"), "days") + 1
    );
    setWeekdayStart(thisMonth.weekday());
  }, [selectedMonth, selectedYear]);

  const chooseDate = (date) => {
    setSelectedDate(
      moment(`${selectedYear}-${selectedMonth}-${date}`, "YYYY-M-DD")
    );
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
  );
}
