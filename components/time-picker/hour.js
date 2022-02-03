export default function HourPicker({ selectedHour, setSelectedHour }) {
  const getSelectedClass = (i) => {
    if (Number(selectedHour) === i) return "circle flex-center selected";
    return "circle flex-center";
  };

  const renderHourOurside = () => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(
        <div
          onClick={() => setSelectedHour(i)}
          key={i}
          className={getSelectedClass(i)}
          style={{
            fontSize: "1.1rem",
            transform: `rotate(${-90 + 30 * i}deg) translate(130px) rotate(${
              90 - 30 * i
            }deg)`,
          }}
        >
          <span>{i}</span>
        </div>
      );
    }
    return arr;
  };

  const renderHourInside = () => {
    const arr = [];
    for (let i = 12; i < 24; i++) {
      arr.push(
        <div
          onClick={() => setSelectedHour(i)}
          key={i}
          className={getSelectedClass(i)}
          style={{
            color: "gray",
            transform: `rotate(${-90 + 30 * i}deg) translate(80px) rotate(${
              90 - 30 * i
            }deg)`,
          }}
        >
          <span>{i}</span>
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
          height: selectedHour < 12 ? 115 : 65,
          transform: `rotateZ(${30 * selectedHour}deg)`,
        }}
      ></div>
      {renderHourOurside()}
      {renderHourInside()}
    </div>
  );
}
