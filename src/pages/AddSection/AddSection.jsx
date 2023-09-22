import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import TableWiget from "../../components/OrderBookTable/TableWiget";
import Input from "../../components/input/input";
// import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
// import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      {/* Title */}
      <div className="m-6 text-2xl font-medium">Thêm phần</div>
      <div className="items-start justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <a href="/" className="text-indigo-500 text">
            Trang chủ
          </a>
          <FontAwesomeIcon icon={faAngleRight} className="" />
          <a href="/" className="text-indigo-500">
            Danh sách khóa học
          </a>
          <FontAwesomeIcon icon={faAngleRight} className="" />
          <a href="/add-course" className="text-indigo-500">
            Thêm khóa học
          </a>
          <FontAwesomeIcon icon={faAngleRight} className="" />
          <p className="">Thêm phần</p>
        </div>
        {/* Nút button hủy */}
        <div className="flex gap-2 whitespace-nowrap xl:mt-0 lg:mt-2 md:mt-4 md:justify-end sm:mt-4 sm:justify-end">
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
          {/* Nút button thêm */}
          <Button
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
      </div>
      <form action="">
        {/* Thêm thành phần */}
        <div className="px-6 py-6 mx-6 my-4 bg-white border-2 rounded-lg">
          <p htmlFor="" className="pb-2 text-xl font-medium text-left">
            Thêm phần
          </p>
          <Input
            label={"Tên phần"}
            className={
              "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            }
          ></Input>
          <label htmlFor="" className="text-base font-medium text-gray-500">
            Trạng thái
          </label>
          <InputSelect></InputSelect>
        </div>
        {/* Button*/}
        <div className="flex gap-2 px-6">
          <Button
            onClick={() => console.log("You'll be mine")}
            text={"Submit"}
            Class={
              "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
            }
          />
          <Button
            onClick={() => console.log("You'll be mine")}
            text={"Tiếp tục"}
            Class={
              "flex font-medium items-center bg-indigo-200 hover:bg-indigo-500 transition ease-in-out text-indigo-500 hover:text-white py-2 px-4 rounded-lg"
            }
          />
        </div>
      </form>
    </>
  );
}
