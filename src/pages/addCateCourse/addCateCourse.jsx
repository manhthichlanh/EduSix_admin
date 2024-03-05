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
import Jodit from "../../components/Jodit/Jodit";
import Notification from '../../components/Notification/Notification';
export default function AddReview() {
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleContinue = () => {
    window.location.href="/cate-course"
    };

    const [formValue, setFormValue] = useState({
      cate_name: "",
        status: true,
        logo_cate: null,
    });

    const resetForm = () => {
        setFormValue({
          cate_name: "",
            status: true,
            logo_cate: null,
        });
    };

    const handleInputChange = (e) => {
        setFormValue({ ...formValue, cate_name: e.target.value });
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value === "true"; // Convert the string to a boolean
        setFormValue({ ...formValue, status: newStatus });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const newName = convertViToEn(file.name);
        setFormValue({ ...formValue, logo_cate: file, thumbnailName: newName });
    };

    const addAuthorMutation = useMutation(
        (formData) => ServerApi.post('/category', formData),
        {
            onSuccess: () => {
              setShowSuccessMessage(true);
            },
            onError: (error) => {
                ToastMessage(`Thêm danh mục thất bại: ${error.message}`).error();
            },
        }
    );

    const handleSave = () => {
        const { cate_name, status, logo_cate } = formValue;

        if (!cate_name || !logo_cate ) {
            ToastMessage('Nhập đầy đủ thông tin.').warn();
            return;
        }
//         if (!content){
//             ToastMessage('Nhập đầy đủ thông tin5.').warn();
//             return;
//         }
// if (!cate_name){
//     ToastMessage('Nhập đầy đủ thông tin1.').warn();
//     return;
// }
// if (!work){
//     ToastMessage('Nhập đầy đủ thông tin2.').warn();
//     return;
// }
// if (!status){
//     ToastMessage('Nhập đầy đủ thông tin3.').warn();
//     return;
// }
// if (!logo_cate){
//     ToastMessage('Nhập đầy đủ thông tin4.').warn();
//     return;
// }


        const formData = new FormData();
        formData.append('cate_name', cate_name);
        formData.append('status', status);
        formData.append('logo_cate', logo_cate);
        addAuthorMutation.mutate(formData);
    };


    return (
        <>
            <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
                {/* Breadcrumbs */}
                <div className="mt-6">
                    <div className="text-2xl font-medium pb-2">Thêm danh mục</div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <a href="/" className="text-indigo-500 text">
                            Trang chủ
                        </a>
                        <FontAwesomeIcon icon={faAngleRight} className="" />
                        <a href="/list-review" className="text-indigo-500">
                            Danh sách danh mục
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
                        label={"Tên danh mục"}
                        placeholder={"Nhập tên danh mục"}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                        value={formValue.cate_name}
                        onChange={handleInputChange}
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
                        title="logo_cate"
                        className={
                            "grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center"
                        }
                        onChange={handleFileChange}
                        value={""}
                    ></InputFile>
                </div>
            </div>

            {showSuccessMessage && (
        <Notification
        type="success"
        message="Thêm danh mục thành công"
        onClose={() => setShowSuccessMessage(false)}
        onContinue={handleContinue}
        title_close="Tiếp tục thêm"
        title_continue="Ra danh sách"
        // autoClose={true} 
        // autoCloseTime={20}
      />
      )}
        </>
    );
}
