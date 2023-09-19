import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/input/input";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      <div className="m-6 text-2xl font-medium">Thêm danh mục bài viết</div>

      <div className="flex float-left pl-6 ">
        <p className="pr-2 text-indigo-500">Trang chủ</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p className="pr-2 text-indigo-500">Danh mục</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p>Thêm danh mục bài viết</p>
      </div>

      <div className="float-right flex mr-6 gap-2 mb-4  mt-[-1rem]">
        <Button
          text={"Hủy"}
          onClick={() => console.log("When I'm back, I'll be a man.")}
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
          onClick={() => console.log("Now I'm just a boy.")}
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
      <div className="clear-both px-4 py-4 m-6 border-2 rounded-lg">
        <Input
          type="text"
          className={
            "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
          }
          label="Danh mục bài viết"
          placeholder="Nhập danh mục bài viết"
          value=""
        ></Input>
        <InputDescription
          name=""
          id=""
          rows={10}
          cols={30}
          className="w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
          label="Nhập mô tả"
          placeholder="Nhập mô tả"
          value=""
        ></InputDescription>
      </div>
    </>
  );
}
