import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import InputText from "../../components/input/input";
import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      <div className="relative">
        {/* Lớp phủ màu đen */}
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50"></div>

        <div className="relative z-60">
          <div className="m-6 text-2xl font-medium">Thêm bài học</div>

          <div className="flex float-left pl-6 ">
            <p className="pr-2 text-indigo-500">Trang chủ</p>
            <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
            <p className="pr-2 text-indigo-500">Danh mục</p>
            <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
            <p className="pr-2 text-indigo-500">Thêm khóa học</p>
            <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
            <p className="pr-2 text-indigo-500">Thêm phần học</p>
            <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
            <p>Thêm bài học</p>
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
              text={"Lưu"}
              onClick={() => console.log("Now I'm just a boy.")}
              Class={
                "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
              }
              Icon={function Icon() {
                return (
                  <svg
                    className="pr-2 "
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15V7.47072C17.5 6.80768 17.2366 6.17179 16.7678 5.70295L14.297 3.23223C13.8282 2.76339 13.1923 2.5 12.5293 2.5H5ZM12.5293 4.16667H12.5V5.83333C12.5 6.75381 11.7538 7.5 10.8333 7.5H7.5C6.57953 7.5 5.83333 6.75381 5.83333 5.83333V4.16667H5C4.53976 4.16667 4.16667 4.53976 4.16667 5V15C4.16667 15.4602 4.53976 15.8333 5 15.8333H5.83333V10.8333C5.83333 9.91286 6.57953 9.16667 7.5 9.16667H12.5C13.4205 9.16667 14.1667 9.91286 14.1667 10.8333V15.8333H15C15.4602 15.8333 15.8333 15.4602 15.8333 15V7.47072C15.8333 7.24971 15.7455 7.03774 15.5893 6.88146L13.1185 4.41074C12.9623 4.25446 12.7503 4.16667 12.5293 4.16667ZM12.5 15.8333V10.8333H7.5V15.8333H12.5ZM7.5 4.16667H10.8333V5.83333H7.5V4.16667Z"
                      fill="white"
                    />
                  </svg>
                );
              }}
            />
          </div>
          <div className="clear-both px-4 py-4 m-6 bg-gray-400 border-2 rounded-lg ">
            <p htmlFor="" className="w-1/3 pb-2 text-xl font-medium text-left">
              Chi tiết
            </p>
            <label htmlFor="" className="w-1/3 text-left ">
              Khóa học
            </label>
            <InputText></InputText>
            <label htmlFor="" className="w-1/3 text-left ">
              Tên phần
            </label>
            <InputText></InputText>
          </div>

          <div className="clear-both px-4 py-4 m-6 bg-gray-400 border-2 rounded-lg ">
            <p htmlFor="" className="w-1/3 pb-2 text-xl font-medium text-left">
              Thêm bài học
            </p>
            <label htmlFor="" className="w-1/3 text-left ">
              Tên bài học
            </label>
            <InputText></InputText>
            <label htmlFor="" className="w-1/3 text-left ">
              Mô tả
            </label>
            <InputDescription></InputDescription>
          </div>
          <div className="h-full p-4 m-6 bg-white border-2 rounded-lg">
            <label htmlFor="" className="w-1/3 text-left text-gray-500 ">
              Video
            </label>
            <div className="grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center">
              <p className="mb-4 text-center text-gray-500 ">
                Kéo thả video vào đây hoặc bấm thêm video
              </p>
              <Button
                text={"Thêm video"}
                Class={
                  "flex  font-medium items-center bg-indigo-100 hover:bg-indigo-700 hover:text-white  transition ease-in-out text-indigo-500 py-2 px-4 rounded-lg  "
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
