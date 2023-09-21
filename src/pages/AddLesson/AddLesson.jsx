import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/input/input";
import InputFile from "../../components/input/input-file";
import InputDescription from "../../components/input/input-description";
import { useState } from "react";
import Button from "../../components/button/Button";
export default function Home() {
  const [showUpload, SetShowUpload] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(null);
  const [formValue, setFormValue] = useState({
    course_id: 1, 
    courseName: "",
    
  })
  const handleClickToUploadBg = () => {
    // Đặt showUpload về giá trị false để ẩn giao diện tải lên
    SetShowUpload(false);
  };
  const handleClickToUploadBtn = () => {
    // Đặt showUpload về giá trị true để hiển thị giao diện tải lên
    SetShowUpload(true);
  };
  const handleChangeURL = (e) => {
    
    const newValue = e.target.value;
    if (newValue) setUrlInputValue(newValue)
  }
  return (
    <div>
      <div className={"fixed top-0 left-0 w-full h-full " + (showUpload ? "" : "hidden")} >
        <div className="w-full h-full flex justify-center items-center relative z-10">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-80" onClick={handleClickToUploadBg}></div>
          <div className="absolute w-1/3 border-2 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden p-6 bg-white justify-center text-center z-20">
            <p className="font-medium text-2xl">Thêm video</p>
            <Input
              title="Nhập link youtube"
              type="file"
              className={
                "w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
              }
              value={""}
            ></Input>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-500"></div>
              <p className="mx-3">Hoặc</p>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            <Input
              type={"text"}
              placeholder="Nhập link youtube"
              className={
                "w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
              }
              onChange={(e)=>{console.log(e.target.value);}}
            ></Input>
            <div className="flex justify-center"> {/* Sử dụng flex để canh chỉnh nút */}
              <Button
                text={"Thêm"}
                Class="font-medium bg-indigo-100 hover:bg-indigo-700 hover:text-white transition ease-in-out text-indigo-500 py-2 px-4 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

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
      <div className="clear-both px-4 py-4 m-6 bg-white border-2 rounded-lg ">
        <p htmlFor="" className="w-1/3 my-3 text-xl font-medium text-left">
          Chi tiết
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            className={
              "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            }
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
            disabled={true}
          ></Input>
          <Input
            type="text"
            className={
              "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            }
            label="Tên phần học"
            placeholder="Nhập tên phần học"
            disabled={true}
          ></Input>
        </div>
      </div>

      <div className="clear-both px-4 py-4 m-6 bg-white border-2 rounded-lg ">
        <p htmlFor="" className="w-1/3 pb-2 text-xl font-medium text-left">
          Thêm bài học
        </p>
        <Input
          type="text"
          className={
            "w-full px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
          }
          label="Tên bài học"
          placeholder="Nhập tên bài học"
          disabled={false}
        ></Input>
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
      <div className="h-full p-4 m-6 bg-white border-2 rounded-lg">
        <label htmlFor="" className="w-1/3 text-left text-gray-500 ">
          Video
        </label>
        <div className="grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center">
          <p className="mb-4 text-center text-gray-500 ">
            Kéo thả video vào đây hoặc bấm thêm video
          </p>
          <div className="" onClick={handleClickToUploadBtn}>
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
  );
}
