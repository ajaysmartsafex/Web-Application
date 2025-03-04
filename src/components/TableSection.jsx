import React from 'react';
import Container from './container/Container';

const TableSection = () => {
  return (
    <Container>
      <div className="table_cont text-center">
        <div className="bg_yellow_color">
          <table width="100%" border="1">
            <tbody>
              <tr>
                <th> MARKET </th>
                <th> OPEN </th>
                <th> CLOSE </th>
              </tr>
              <tr>
                <td> SURYA </td>
                <td> 11:00am</td>
                <td> 12:00pm </td>
              </tr>
              <tr>
                <td> TIME BAZAR</td>
                <td> 01:10 pm</td>
                <td> 03:15 pm</td>
              </tr>
              <tr>
                <td>MILAN DAY </td>
                <td>02:15 pm</td>
                <td>04:15 pm</td>
              </tr>
              <tr>
                <td> SURYA DAY </td>
                <td> 03:00pm </td>
                <td> 05:00pm </td>
              </tr>
              <tr>
                <td> KALYAN </td>
                <td> 04:45pm </td>
                <td> 06:45pm </td>
              </tr>
              <tr>
                <td> SURYA NIGHT </td>
                <td> 08:00pm </td>
                <td> 10:00pm </td>
              </tr>
              <tr>
                <td> MILAN NIGHT </td>
                <td> 09:00pm </td>
                <td> 11:00pm </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default TableSection;
