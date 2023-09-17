
import { io } from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import TableWiget from "../../components/OrderBookTable/TableWiget";
import InputText from "../../components/input/input-text";
import InputNumber from "../../components/input/input-number";
import InputSelect from "../../components/input/input-select";
import InputDescription from "../../components/input/input-description";
import { useState } from 'react';
import Button from "../../components/button/Button";
export default function Home() {
  return (
    <>
      <div className="m-6 font-medium text-2xl">Thêm khóa học</div>

      <div className="flex pl-6 float-left ">
        <p className="pr-2 text-indigo-500">Trang chủ</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p className="pr-2 text-indigo-500">Khóa học</p>
        <FontAwesomeIcon icon={faAngleRight} className="pr-2 m-1" />
        <p>Thêm khóa học</p>
      </div>

      <div className="float-right flex mr-6 gap-2 mb-4  mt-[-1rem]" >
        <Button
          text={"Hủy"}
          Class={"flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg"}
          Icon={
            function Icon() {
              return (
                <svg className="pr-2 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              )
            }
          }
        />
        <Button
          text={"Thêm khóa học"}
          Class={"flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "}
          Icon={
            function Icon() {
              return (
                <svg className="pr-2 " fill="#ffffff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
                  <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
                </svg>
              )
            }
          }
        />
      </div>
      <div className="flex w-full">
        <div className="mx-6 w-full px-4 py-4 bg-gray-400 rounded-lg border-2 bg-white clear-both">
          <p htmlFor="" className="text-left w-1/3 font-medium text-xl pb-2">Thông tin</p>

          <label htmlFor="" className="text-left w-1/3 ">Danh mục</label>
          <InputSelect></InputSelect>
          <label htmlFor="" className="text-left w-1/3 ">Tên khóa học</label>
          <InputText></InputText>
          <label htmlFor="" className="text-left w-1/3 ">Số lượng bài học</label>
          <InputNumber></InputNumber>
          <label htmlFor="" className="text-left w-1/3 ">Giá</label>
          <InputSelect></InputSelect>
          <label htmlFor="" className="text-left w-1/3 ">Đang bật</label>
          <InputSelect></InputSelect>
          <label htmlFor="" className="text-left w-1/3 ">Mô tả</label>

          <InputDescription></InputDescription>
        </div>

        <div className="mr-6 border-2 p-6 rounded-lg h-full">
          <p htmlFor="" className="text-left font-medium text-xl pb-2">Thumnail</p>
          <label htmlFor="" className="text-left w-1/3 text-gray-500 ">Photo</label>
          <div className=" border-2 rounded-lg bg-gray-100 border-dashed p-6 justify-items-center grid mt-4">
            <svg className="mb-4" width="52" height="52" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="40" height="40" rx="20" fill="#DEDEFA" />
              <path d="M17.3334 20.25C18.2999 20.25 19.0834 19.4665 19.0834 18.5C19.0834 17.5335 18.2999 16.75 17.3334 16.75C16.3669 16.75 15.5834 17.5335 15.5834 18.5C15.5834 19.4665 16.3669 20.25 17.3334 20.25Z" fill="#5C59E8" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7084 11.2084C12.7754 11.2084 11.2084 12.7754 11.2084 14.7084V29.2917C11.2084 31.2247 12.7754 32.7917 14.7084 32.7917H29.2917C31.2247 32.7917 32.7917 31.2247 32.7917 29.2917V14.7084C32.7917 12.7754 31.2247 11.2084 29.2917 11.2084H14.7084ZM29.2917 13.5417H14.7084C14.064 13.5417 13.5417 14.064 13.5417 14.7084V23.7712L16.4569 21.9772C16.6509 21.8578 16.8967 21.8623 17.0862 21.9887L20.1976 24.0629L25.1419 20.2173C25.3526 20.0534 25.6476 20.0534 25.8582 20.2172L30.4584 23.7952V14.7084C30.4584 14.064 29.936 13.5417 29.2917 13.5417ZM13.5417 29.2917V26.511L16.7249 24.5521L20.3026 26.9372L25.5001 22.8947L30.4584 26.7512V29.2917C30.4584 29.936 29.936 30.4584 29.2917 30.4584H14.7084C14.064 30.4584 13.5417 29.936 13.5417 29.2917Z" fill="#5C59E8" />
              <rect x="2" y="2" width="40" height="40" rx="20" stroke="#EFEFFD" stroke-width="4" />
            </svg>
            <p className="mb-4 text-gray-500 text-center ">Kéo thả ảnh vào đây hoặc bấm thêm ảnh</p>
            <Button
              text={"Thêm ảnh"}
              Class={"flex  font-medium items-center bg-indigo-100 hover:bg-indigo-700 hover:text-white  transition ease-in-out text-indigo-500 py-2 px-4 rounded-lg  "}
            />
          </div>
        </div>
        
      </div>

      <Button
        text={"Tiếp tục"}
        Class={"flex m-6 font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "}
      />
    </>
  )
}
