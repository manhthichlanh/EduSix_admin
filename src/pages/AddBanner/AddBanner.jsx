import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import InputFile from "../../components/Input/InputFile";
import { useNavigate } from 'react-router-dom';
import { ServerApi } from '../../utils/http';
import { convertViToEn } from '../../utils/helper';
import ToastMessage from '../../utils/alert';
import { useMutation } from 'react-query';

export default function AddBanner() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    banner_name: "",
    status: true,
    link: "",
    thumnail: null, // Use null instead of an empty string for files
  });

  const resetForm = () => {
    setFormValue({
      banner_name: "",
      status: true,
      link: "",
      thumnail: null,
    });
  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, banner_name: e.target.value });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value === "true"; // Convert the string to a boolean
    setFormValue({ ...formValue, status: newStatus });
  };
  const handleLinkChange = (e) => {
    setFormValue({ ...formValue, link: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newName = convertViToEn(file.name);
    setFormValue({ ...formValue, thumnail: file, thumnailName: newName });
  };

  const addBannerMutation = useMutation(
    (formData) => ServerApi.post('/banner/addBanner/', formData),
    {
      onSuccess: () => {
        ToastMessage('Thêm banner thành công').success();
        navigate('/list-banner');
      },
      onError: (error) => {
        ToastMessage(`Thêm banner thất bại: ${error.message}`).error();
      },
    }
  );

  const handleSave = () => {
    const { banner_name, status, link, thumnail } = formValue;

    if (!banner_name || !link || !thumnail) {
      ToastMessage('Nhập đầy đủ thông tin.').warn();
      return;
    }

    const formData = new FormData();
    formData.append('name_banner', banner_name);
    formData.append('status', status);
    formData.append('link', link);
    formData.append('thumnail', thumnail);

    addBannerMutation.mutate(formData);
  };


  return (
    <>
      <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        {/* Breadcrumbs */}
        <div className="mt-6">
          <div className="text-2xl font-medium pb-2">Thêm banner</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/list-banner" className="text-indigo-500">
              Danh sách banner
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Thêm banner</p>
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
            onClick={() => {
              resetForm();
            }}
          />
            <Button
        text={"Thêm"}
        Class={
          "flex font-medium items-center bg-indigo-500 hover-bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
        }
        Icon={() => (
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
        )}
        onClick={handleSave}
      />
        </div>
      </div>
      <div className="w-full gap-6 p-6 md:grid sm:grid lg:flex md:grid-cols-1 sm:grid-cols-1">
        <div className="w-full px-6 py-4 border-2 rounded-lg">
          <p htmlFor="" className="pb-2 text-xl font-medium text-left">
            Thông tin
          </p>
          <Input
            type={"text"}
            label={"Tên banner"}
            placeholder={"Nhập tên banner"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
            }
            value={formValue.banner_name}
            onChange={handleInputChange}
          />
          <Input
            type={"text"}
            label={"Nhập Link"}
            placeholder={"Nhập link khóa học"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
            }
            value={formValue.link}
            onChange={handleLinkChange}
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
            title="thumnails"
            label={"Image"}
            className={
              "grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center"
            }
            onChange={handleFileChange}
            value={""}
          ></InputFile>
        </div>
      </div>
    </>
  );
}
