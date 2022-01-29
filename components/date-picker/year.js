import { useEffect } from "react";

const start = 1900;
const to = 2100;

export default function Year({
  selectedYear,
  handleSelectedYear,
  showYearPicker,
}) {
  const renderRows = () => {
    let rows = [];
    let arr = [];

    for (let i = start; i < to; i++) {
      arr.push(
        <td key={i}>
          <button
            className={selectedYear === i ? "selected" : ""}
            id={`year-${i}`}
            onClick={() => handleSelectedYear(i)}
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
