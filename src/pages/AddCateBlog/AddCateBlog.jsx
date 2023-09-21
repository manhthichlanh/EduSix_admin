import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import InputText from "../../components/input/input-text";
import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      <div className="m-6 font-medium text-2xl">Thêm danh mục bài viết</div>

      <div className="flex pl-6 float-left ">
        <p className="pr-2 text-indigo-500">Trang chủ</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p className="pr-2 text-indigo-500">Danh mục</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p>Thêm danh mục bài viết</p>
      </div>

      <div className="float-right flex mr-6 gap-2 mb-4  mt-[-1rem]">
        <Button
          text={"Hủy"}
          Class={
            "flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg"
          }
          Icon={function Icon() {
            return (
              <svg
                className="pr-2 "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            );
          }}
        />
        <Button
          text={"Thêm"}
          Class={
            "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
          }
          Icon={function Icon() {
            return (
              <svg
                className="pr-2 "
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
                <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
              </svg>
            );
          }}
        />
      </div>
      <div className="m-6 px-4 py-4 bg-gray-400 rounded-lg border-2 bg-white clear-both">
        <label htmlFor="" className="text-left w-1/3  ">
          Tên danh mục
        </label>

        <InputText></InputText>
        <label htmlFor="" className="text-left w-1/3 ">
          Mô tả
        </label>

        <InputDescription></InputDescription>
      </div>
    </>
  );
}
