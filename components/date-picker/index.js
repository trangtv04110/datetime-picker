import { useState } from "react";

export default function DatePicker() {
  const [data, setData] = useState("");
  return (
    <div>
      <input value={data} />
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body">
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
              <tbody>
                <tr>
                  <td>
                    <button className="selected" onClick={() => setData(1)}>
                      1
                    </button>
                  </td>
                  <td>
                    <button>2</button>
                  </td>
                  <td>
                    <button>3</button>
                  </td>
                  <td>
                    <button>4</button>
                  </td>
                  <td>
                    <button>5</button>
                  </td>
                  <td>
                    <button>6</button>
                  </td>
                  <td>
                    <button>7</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button>Cancel</button>
            <button>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
