import PropTypes from "prop-types";
import moment from "moment";

function MinutePicker({ selectedMinute, onChange }) {
  const getSelectedClass = (i) => {
    if (Number(selectedMinute) === i) return "circle flex-center selected";
    return "circle flex-center";
  };

  const renderMin = () => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push(
        <div
          onClick={() => onChange(i)}
          key={i}
          className={getSelectedClass(i)}
          style={{
            fontSize: "1.1rem",
            transform: `rotate(${-90 + 6 * i}deg) translate(130px) rotate(${
              90 - 6 * i
            }deg)`,
          }}
        >
          {i % 5 === 0 && <span>{i}</span>}
        </div>
      );
    }
    return arr;
  };

  return (
    <div className="circle-wrapper">
      <div className="dot-center"></div>
      <div
        className="line"
        style={{
          height: 116,
          transform: `rotateZ(${6 * selectedMinute}deg)`,
        }}
      ></div>
      {renderMin()}
    </div>
  );
}

MinutePicker.propTypes = {
  selectedHour: PropTypes.string,
  onChange: PropTypes.func,
};

MinutePicker.defaultProps = {
  selectedHour: moment().format("mm"),
  onChange: () => {},
};

export default MinutePicker;
