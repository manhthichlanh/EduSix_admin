
import { io } from "socket.io-client";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import InputText from "../../components/input/input-text";
import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from 'react';
import './Home.scss';
export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
 
    
=======
      <h1 className="text-3xl font-bold underline">Xin chào</h1>
      <div className="bang">
      <table>
        <thead>
          <tr>
            <th>Tiêu đề cột 1</th>
            <th>Tiêu đề cột 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dữ liệu hàng 1, cột 1</td>
            <td>Dữ liệu hàng 1, cột 2</td>
          </tr>
          <tr>
            <td>Dữ liệu hàng 2, cột 1</td>
            <td>Dữ liệu hàng 2, cột 2</td>
          </tr>
          {/* Thêm các hàng và cột khác nếu cần */}
        </tbody>
      </table>
      </div>
     
>>>>>>> origin/develop
    </>
  );
}
