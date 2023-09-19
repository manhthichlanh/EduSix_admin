import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import TableWiget from "../../components/OrderBookTable/TableWiget";
import Input from "../../components/input/input";
// import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      {/* Title */}
      <div className="m-6 text-2xl font-medium">Thêm phần</div>
      {/* Breadcrumbs */}
      <div className="flex float-left pl-6 ">
        <p className="pr-2 text-indigo-500">Trang chủ</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p className="pr-2 text-indigo-500">Danh mục</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p className="pr-2 text-indigo-500">Thêm khóa học</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p>Thêm phần học</p>
      </div>
      {/* Nút button hủy */}
      <div className="float-right flex mr-6 gap-2 mb-4  mt-[-1rem]">
        <Button
          onClick={() =>
            console.log("Then stop being my friend and be my lover")
          }
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
        {/* Nút button thêm */}
        <Button
          onClick={() => console.log("Now or never")}
          text={"Thêm thành phần"}
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

      <div className="clear-both px-4 py-4 m-6 border-2 rounded-lg ">
        <Input
          onClick={() =>
            console.log("Then stop being my friend and be my lover")
          }
          type="text"
          className={
            "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
          }
          label="Nhập phần"
          placeholder="Nhập phần học"
          value=""
        ></Input>
        <label htmlFor="" className="w-1/3 text-left ">
          Trạng thái
        </label>
        <InputSelect></InputSelect>
      </div>
      <Button
        onClick={() => console.log("Nupacachi")}
        text={"Tiếp tục"}
        Class={
          "flex m-6 font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
        }
      />
    </>
  );
}
