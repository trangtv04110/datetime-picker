import PropTypes from "prop-types";
import moment from "moment";

function Date({ selectedDate, onChange }) {
  const dayLength =
    moment(selectedDate)
      .endOf("month")
      .diff(moment(selectedDate).startOf("month"), "days") + 1;
  const weekdayStart = moment(selectedDate).startOf("month").weekday();

  const chooseDate = (date) => {
    const newDate = moment(selectedDate).set("date", date);
    onChange(newDate.format("YYYY-MM-DD"));
  };

  const getSelectedClass = (date) => {
    if (
      // selectedDate.format("YYYY-M") === `${selectedYear}-${selectedMonth}` &&
      moment(selectedDate).date() === date
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

Date.propTypes = {
  selectedDate: PropTypes.string,
  onChange: PropTypes.func,
};

Date.defaultProps = {
  selectedDate: moment().format("YYYY-MM-DD"),
  onChange: () => {},
};

export default Date;
