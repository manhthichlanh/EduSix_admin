import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/input";
import InputSelect from "../../components/Input/InputSelect";
import InputFile from "../../components/Input/InputFile";
import InputDescription from "../../components/Input/InputDescription";
import Button from "../../components/Button/Button";
import { ServerApi } from "../../utils/http";
import { convertViToEn } from '../../utils/helper';
import ToastMessage from '../../utils/alert';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(true);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    cate_name: '',
    status: true,
    ordinal_number: '',
    logo_cate: ''
  });

  const handleNameChange = (e) => {
    setFormValue({ ...formValue, cate_name: e.target.value })
  };



  const handleNumberChange = (e) => {
    setFormValue({ ...formValue, ordinal_number: e.target.value })
  };


  const handleStatusChange = (e) => {
    setFormValue({ ...formValue, status: Boolean(e.target.value) })
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const newForm = new FormData();
    const newName = convertViToEn(file.name); // Đặt tên mới ở đây
    newForm.append('file', file, newName);
    setFormValue({ ...formValue, thumbnail: newForm.get("file") })
  }
  
  const handleSave = () => {
    console.log(formValue)

    const headers = {
      'Content-Type': `multipart/form-data`,
    }
    ServerApi.post('category', formValue, { headers })
      .then(response => {
        console.log('Data saved:', response.data);
        const categoryId = response.data.id;
        ToastMessage("Thêm Category thành công!").success();
        setTimeout(() => {
          navigate('/cate-course', { state: { cateName: inputValue, categoryId } })
        }, 500
        )
      })
      .catch(error => {
        console.error('Error saving data:', error);
        ToastMessage(error.message).error();
        // Handle the error here
      });

  };
  return (
    <>
      <form action="">
        <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
          {/* Breadcrumbs */}
          <div className="mt-6">
            <div className="text-2xl font-medium pb-2">Thêm danh mục</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <a href="/" className="text-indigo-500 text">
                Trang chủ
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <a href="/cate-course" className="text-indigo-500">
                Danh mục
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <p className="">Thêm danh mục</p>
            </div>
          </div>
          <div className="flex gap-2 whitespace-nowrap xl:mt-0 lg:mt-4 md:mt-4 md:justify-end mt-4 sm:mb-0 sm:mt-4 sm:justify-end">
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
              onClick={() => console.log("You are my dream")}
            />
            <Button
              text={"Thêm"}
              Class={
                "flex font-medium items-center bg-indigo-500 hover-bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
              }
              Icon={function Icon() {
                return (
                  <svg
                    className="pr-2"
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v18c0-0.553-0.447-1-1-1z" />
                    <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0-1-0.447-1-1z" />
                  </svg>
                );
              }}
              onClick={() => {
                const newFormError = {
                  "Tên": formValue.cate_name,
                }

                let errCount = 0;
                for (const [key, value] of Object.entries(newFormError)) {
                  if (!value) {
                    errCount++;
                    ToastMessage(`${key} format sai!`).warn()
                  }
                }
                if (errCount === 0) handleSave()

              }
              } />
          </div>
        </div>

        <div className="w-full gap-6 p-6 md:grid sm:grid lg:flex md:grid-cols-1 sm:grid-cols-1">
        <div className="w-full px-6 py-4 border-2 rounded-lg">
          <p htmlFor="" className="pb-2 text-xl font-medium text-left">
            Thông tin
          </p>
          <Input
            type={"text"}
            label={"Tên danh mục"}
            placeholder={"Nhập tên danh mục"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
            }
            value={formValue.cate_name}
            onChange={handleNameChange}
          />

          <InputSelect
            label={"Trạng thái"}
            array={[
              { value: "true", text: "Bật" },
              { value: "false", text: "Tắt" },
            ]}
            value={formValue.status.toString()} // Ensure that the value is a string
            onChange={handleStatusChange}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
            }
          />
        </div>
        <div className="lg:my-0 md:my-0 sm:my-0 my-6">
          <InputFile
            title="Thumbnails"
            className={
              "grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center"
            }
            onChange={handleFileChange}
            value={""}
          ></InputFile>
        </div>
      </div>


      </form>
    </>
  );
}
