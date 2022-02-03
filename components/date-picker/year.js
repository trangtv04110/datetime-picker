import PropTypes from "prop-types";
import { useEffect } from "react";
import moment from "moment";

const start = 1900;
const to = 2100;

function Year({ selectedDate, onChange, showYearPicker }) {
  const selectedYear = Number(moment(selectedDate).format("YYYY"));

  const renderRows = () => {
    let rows = [];
    let arr = [];

    for (let i = start; i < to; i++) {
      arr.push(
        <td key={i}>
          <button
            className={selectedYear === i ? "selected" : ""}
            id={`year-${i}`}
            onClick={() => {
              const newDate = moment(selectedDate).set("year", i);
              onChange(newDate.format("YYYY-MM-DD"));
            }}
          >
            {i}
          </button>
        </td>
      );
      if (arr.length === 4) {
        rows.push(<tr key={`tr-${i}`}>{arr}</tr>);
        arr = [];
      }
    }
    if (arr.length > 0) rows.push(<tr key={`tr-end`}>{arr}</tr>);
    return rows;
  };

  useEffect(() => {
    const elm = document.getElementById(`year-${selectedYear}`);
    if (elm) {
      elm.focus();
    }
  }, [showYearPicker]);

  return (
    <table className="year-table">
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

Year.propTypes = {
  selectedDate: PropTypes.string,
  onChange: PropTypes.func,
  showYearPicker: PropTypes.bool,
};

Year.defaultProps = {
  selectedDate: moment().format("YYYY-MM-DD"),
  onChange: () => {},
  showYearPicker: false,
};

export default Year;
