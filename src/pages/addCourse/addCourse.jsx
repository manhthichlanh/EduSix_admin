import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/input/input";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
import InputFile from "./../../components/input/input-file";
export default function Home() {
  return (
    <>
      <div className="m-6 text-2xl font-medium">Thêm khóa học</div>

      <div className="flex items-start justify-between px-6 pb-4">
        <div className="flex">
          <p className="pr-2 text-indigo-500">Trang chủ</p>
          <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
          <p className="pr-2 text-indigo-500">Khóa học</p>
          <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
          <p>Thêm khóa học</p>
        </div>
        <div className="flex gap-2">
          <Button
            text={"Hủy"}
            Class={
              "flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg whitespace-nowrap"
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
            text={"Thêm khóa học"}
            Class={
              "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg whitespace-nowrap"
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

      <div className="w-full gap-6 px-4 md:grid sm:grid lg:flex md:grid-cols-1 sm:grid-cols-1">
        <div className="w-full px-4 py-4 border-2 rounded-lg">
          <p htmlFor="" className="pb-2 text-xl font-medium text-left">
            Thông tin
          </p>

          <label htmlFor="" className="text-left ">
            Danh mục
          </label>
          <InputSelect></InputSelect>
          <Input
            type={"text"}
            label={"Tên bài học"}
            placeholder={"Nhập tên bài học"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            value={""}
          ></Input>
          <Input
            type={"number"}
            label={"Số bài học"}
            placeholder={"Nhập số bài học"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            value={""}
          ></Input>
          <label htmlFor="" className="w-1/3 text-left ">
            Giá
          </label>
          <InputSelect></InputSelect>
          <label htmlFor="" className="w-1/3 text-left ">
            Đang bật
          </label>
          <InputSelect></InputSelect>
          <InputDescription
            label={"Mô tả"}
            placeholder={"Nhập mô tả"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            rows={"10"}
            cols={"30"}
            value={""}
          ></InputDescription>
        </div>

        <div className="lg:my-0 md:my-2">
          <InputFile
            title="Thumnails"
            label={"Image"}
            className={
              "grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center"
            }
            value={""}
          ></InputFile>
        </div>
      </div>

      <Button
        text={"Tiếp tục"}
        Class={
          "flex m-6 font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
        }
        onClick={() => console.log("Please don't belong to anyone")}
      />
    </>
  );
}
