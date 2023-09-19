import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/input/input";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      <div className="m-6 text-2xl font-medium">Thêm khóa học</div>

      <div className="flex items-start justify-between px-6">
        <div className="flex items-center">
          <p className="pr-2 text-indigo-500">Trang chủ</p>
          <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
          <p className="pr-2 text-indigo-500">Khóa học</p>
          <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
          <p>Thêm khóa học</p>
        </div>

        <div className="flex gap-2 mb-4 whitespace-nowrap">
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
          <Button
            onClick={() => console.log("When I'm back. You will be mine.")}
            text={"Thêm khóa học"}
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
      <div className="flex gap-6 px-6 py-2">
        <div className="w-full px-4 py-4 border-2 rounded-lg">
          <p htmlFor="" className="py-2 text-xl font-medium">
            Thông tin
          </p>
          <label htmlFor="" className="">
            Danh mục
          </label>
          <InputSelect></InputSelect>
          <Input
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
            className="w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            value=""
            onChange=""
            disabled=""
          ></Input>
          <Input
            placeholder="Nhập số bài học"
            label="Số bài học"
            type="number"
            className="w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            value=""
            onChange=""
            disabled=""
          ></Input>
          <label htmlFor="" className="">
            Giá
          </label>
          <InputSelect></InputSelect>
          <label htmlFor="" className="">
            Trạng thái
          </label>
          <InputSelect></InputSelect>
          <InputDescription
            name=""
            id=""
            rows={10}
            cols={30}
            className="w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            label="Nhập mô tả"
            placeholder="Nhập mô tả"
          ></InputDescription>
        </div>

        <div className="h-full p-4 border-2 rounded-lg">
          <p htmlFor="" className="pb-2 text-xl font-medium text-left">
            Thumnail
          </p>
          <label htmlFor="" className="w-1/3 text-left text-gray-500 ">
            Photo
          </label>
          <div className="grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center">
            <svg
              className="mb-4"
              width="52"
              height="52"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="40" height="40" rx="20" fill="#DEDEFA" />
              <path
                d="M17.3334 20.25C18.2999 20.25 19.0834 19.4665 19.0834 18.5C19.0834 17.5335 18.2999 16.75 17.3334 16.75C16.3669 16.75 15.5834 17.5335 15.5834 18.5C15.5834 19.4665 16.3669 20.25 17.3334 20.25Z"
                fill="#5C59E8"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.7084 11.2084C12.7754 11.2084 11.2084 12.7754 11.2084 14.7084V29.2917C11.2084 31.2247 12.7754 32.7917 14.7084 32.7917H29.2917C31.2247 32.7917 32.7917 31.2247 32.7917 29.2917V14.7084C32.7917 12.7754 31.2247 11.2084 29.2917 11.2084H14.7084ZM29.2917 13.5417H14.7084C14.064 13.5417 13.5417 14.064 13.5417 14.7084V23.7712L16.4569 21.9772C16.6509 21.8578 16.8967 21.8623 17.0862 21.9887L20.1976 24.0629L25.1419 20.2173C25.3526 20.0534 25.6476 20.0534 25.8582 20.2172L30.4584 23.7952V14.7084C30.4584 14.064 29.936 13.5417 29.2917 13.5417ZM13.5417 29.2917V26.511L16.7249 24.5521L20.3026 26.9372L25.5001 22.8947L30.4584 26.7512V29.2917C30.4584 29.936 29.936 30.4584 29.2917 30.4584H14.7084C14.064 30.4584 13.5417 29.936 13.5417 29.2917Z"
                fill="#5C59E8"
              />
              <rect
                x="2"
                y="2"
                width="40"
                height="40"
                rx="20"
                stroke="#EFEFFD"
                stroke-width="4"
              />
            </svg>
            <p className="mb-4 text-center text-gray-500 ">
              Kéo thả ảnh vào đây hoặc bấm thêm ảnh
            </p>
            <Input
              type="file"
              className="w-full text-sm file:bg-indigo-500 text-slate-500 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-medium file:font-semibold file:text-white hover:file:bg-indigo-600"
            ></Input>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <Button
          text={"Tiếp tục"}
          Class={
            "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg "
          }
          onClick={() => console.log("When I return, I will be a man.")}
        />
      </div>
    </>
  );
}
