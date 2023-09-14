
import { io } from "socket.io-client";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import { useState } from 'react';
export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Xin chào</h1>
        <table>
          <thead>
            <tr>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      
    </>
  )
}
