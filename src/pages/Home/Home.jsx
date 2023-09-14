
import { io } from "socket.io-client";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import InputText from "../../components/input/input-text";
import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from 'react';
export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="px-4 py-4 bg-gray-400 rounded-lg border-2 bg-white">   
            <InputText></InputText>
            <InputText></InputText>
          </div>
    
    </>
  )
}
