import React from 'react';
import Container from './container/Container';

const SurayStarLine = () => {
  return (
    <Container>
      <div className="table_container px-3">
        <h3 className="charts_heading text-center py-2 font-semibold">
          SURYA STARLINE
        </h3>
        <table className="text-center " width="100%" border="1">
          <thead>
            <tr>
              <th>Time</th>
              <th>Result</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10:00 AM</td>
              <td>456-5</td>
              <td>07:00 PM</td>
              <td>589-2</td>
            </tr>
            <tr>
              <td>11:34 AM</td>
              <td>789-4</td>
              <td>08:00 PM</td>
              <td>367-6</td>
            </tr>
            <tr>
              <td>01:10 PM</td>
              <td>678-1</td>
              <td>09:00 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>02:00 PM</td>
              <td>248-4</td>
              <td>09:25 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>03:10 PM</td>
              <td>570-2</td>
              <td>09:40 PM</td>
              <td></td>
            </tr>
            <tr>
              <td>04:20 PM</td>
              <td>150-6</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default SurayStarLine;
