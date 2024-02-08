import React, { useState, useRef } from "react";
import Menu from '../../../components/common/icon/Menu'
import Plus from '../../../components/common/icon/Plus'
import Trash from '../../../components/common/icon/Trash'
import Pencil from '../../../components/common/icon/Pencil'
import Youtube from '../../../components/common/icon/Youtube'
import Quizz from '../../../components/common/icon/Quizz'
import File from '../../../components/common/icon/File'
import PencilLine from '../../../components/common/icon/PencilLine'
import Delete from '../../../components/common/icon/Delete'
import Close from '../../../components/common/icon/Close'
import Input from '../../../components/Input/input'
import Button from '../../../components/Button/Button'
export default function Content() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <div className="mx-6 p-6 bg-white">
      <div className="flex py-6 bg-white w-full justify-between">
        <div className="flex gap-2">
          <Menu
            width="24"
            height="24"
          />
          <div className="text-[#1D2026] font-medium">Phần 01: </div>
          <div className="">Tên phần học</div>
        </div>
        <div className="flex gap-2">
          <Plus
            width="24"
            height="24"
          />
          <PencilLine
            width="24"
            height="24"
          />
          <Delete
            width="24"
            height="24"
          />
        </div>
      </div>
      {/* Thêm bài học */}
      <div className="flex mb-6 px-4 py-3 bg-white w-full justify-between items-center border-2 border-gray-200">
        <div className="flex gap-2 items-center">
          <Menu
            width="20"
            height="20"
          />
          <div className="">Tên bài học</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center border-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
            <div className="font-medium text-[#17163A]">Nội dung</div>
            <svg
              className="pl-2 "
              fill="#17163A"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
              <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
            </svg>
          </div>
          <PencilLine
            width="20"
            height="20"
          />
          <Delete
            width="20"
            height="20"
          />
        </div>
      </div>
      {/* Chọn nội dung */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 items-center">
            <Menu
              width="20"
              height="20"
            />
            <div className="">Tên bài học</div>
          </div>
          <div className="flex gap-2 items-center relative">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A]">Nội dung</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="py-[20px] flex flex-col items-center border-2 border-gray-200">
          <div className="pb-6">Chọn loại nội dung</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <File
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Upload File</div>
            </div>
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <Youtube
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Youtube</div>
            </div>
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <Quizz
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Quizz</div>
            </div>
          </div>

        </div>
      </div>
      {/* Chọn file */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 items-center">
            <Menu
              width="20"
              height="20"
            />
            <div className="">Tên bài học</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A]">Thêm video</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="p-5 border-2 border-gray-200">
          <div className="flex w-full">
            <div className="w-full border-2 border-gray-200 py-3 px-4 text-[#8C94A3]">
              {selectedFile ? selectedFile.name : 'Chưa có tệp nào được chọn'}
            </div>
            <label htmlFor="fileInput" className="w-1/4 bg-[#E9EAF0] px-[72px] py-3 font-medium cursor-pointer">
              Upload File
            </label>
            <input
              type="file"
              id="fileInput"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className="py-4">
            <span className="font-medium">Lưu ý:</span> Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.
          </div>
        </div>
      </div>
      {/* Chọn link youtube */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 items-center">
            <Menu
              width="20"
              height="20"
            />
            <div className="">Tên bài học</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A]">Thêm video Youtube</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="p-5 border-2 border-gray-200">
        <Input
            type={"text"}
            placeholder={"Nhập link video Youtube vào đây"}
            className={
              "w-full border-2 border-gray-200 py-3 px-4 focus:border-gray-400 focus:outline-none"
            }
            
          />
          <div className="py-4"> <span className='font-medium'>Lưu ý:</span>Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.</div>
        </div>
      </div>
    </div>

  )
}
