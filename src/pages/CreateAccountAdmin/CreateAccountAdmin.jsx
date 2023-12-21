import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import InputFile from "../../components/Input/InputFile";
import { useNavigate } from 'react-router-dom';
import { ServerApi } from '../../utils/http';
import { convertViToEn, getLocalData } from '../../utils/helper';
import ToastMessage from '../../utils/alert';
import { useQuery } from 'react-query';
import Jodit from '../../components/Jodit/Jodit';
// Define a query function to fetch course data
const getCategory = async () => {
    try {
        const response = await ServerApi.get("/category");
        const cateData = response.data;
        const newData = cateData.map(item => ({ value: item.category_id, text: item.cate_name }))
        return newData;
    } catch (error) {
        throw new Error("Error fetching course data");
    }
};

export default function CreateAccount() {
    const [selectedValue, setSelectedValue] = useState('0'); // Mặc định là "Miễn phí" (0)
    const [price, setPrice] = useState('');
    const [inputValue, setInputValue] = useState('');
    // const [numberOfLessons, setNumberOfLessons] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('1'); // Mặc định là "Đang bật" (1)
    const [formValue, setFormValue] = useState({
        fullname: "",
        username: "",
        slug: null,
        content: "",
        status: true,
        role: 1,
        avata: ""
    })



    // Use React Query to fetch and manage course data
    const { data: cateData, isLoading, isError } = useQuery("cateData", getCategory);
    const navigate = useNavigate();
    const handleSelectChange = (e) => {
        setFormValue({ ...formValue, role: e.target.value })
    };


    const handleFullnameChange = (e) => {
        setFormValue({ ...formValue, fullname: e.target.value })

    };

    const handleUsernameChange = (e) => {
        setFormValue({ ...formValue, username: e.target.value })
    };

    const handlePasswordChange = (e) => {
        setFormValue({ ...formValue, password: e.target.value })
    };


    const handleStatusChange = (e) => {
        setFormValue({ ...formValue, status: Boolean(e.target.value) })
    };
    const handleSelectChangeCourseType = (e) => {
        setFormValue({ ...formValue, type: e.target.value })

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const newForm = new FormData();
        const newName = convertViToEn(file.name); // Đặt tên mới ở đây
        newForm.append('file', file, newName);
        setFormValue({ ...formValue, avata: newForm.get("file") })
    }

    const handleSave = () => {
        console.log(formValue)

        const headers = {
            'Content-Type': `multipart/form-data`,
        }
        ServerApi.post('course', formValue, { headers })
            .then(response => {
                console.log('Data saved:', response.data);
                const courseId = response.data.course_id;
                const coursesName = response.data.name
                ToastMessage("Thêm mới khóa học thành công!").success();
                setTimeout(() => {
                    navigate(`/add-section?courseId=${courseId}&page=1`, { state: { courseName: coursesName, courseId } })
                }, 500
                )
            })
            .catch(error => {
                console.error('Error saving data:', error);
                ToastMessage(error.message).error();
                // Handle the error here
            });

    };
    useEffect(() => {
        const admin_id = getLocalData("auth_info").admin.admin_id;
        console.log({ admin_id })
        setFormValue({ ...formValue, admin_id })
    }, [])
    useEffect(() => {
        if (cateData && cateData?.length > 0) {
            setFormValue({ ...formValue, category_id: cateData[0].value })
        }
    }, [cateData]
    )
    return (
        <>
            <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
                {/* Breadcrumbs */}
                <div className="mt-6">
                    <div className="text-2xl font-medium pb-2">Thêm admin</div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <a href="/" className="text-indigo-500 text">
                            Trang chủ
                        </a>
                        <FontAwesomeIcon icon={faAngleRight} className="" />
                        <a href="/member-admin" className="text-indigo-500">
                            Danh sách admin
                        </a>
                        <FontAwesomeIcon icon={faAngleRight} className="" />
                        <p className="">Thêm admin</p>
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
                                "Fullname": formValue.fullname,
                                "Username": formValue.username,
                                "Password": formValue.password,
                                "Avata": formValue.avata
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
                        label={"Full name"}
                        placeholder={"Nhập tên đầy đủ"}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                        value={formValue.fullname}
                        onChange={handleFullnameChange}
                    />
                    <Input
                        type={"text"}
                        label={"User name"}
                        placeholder={"Nhập user name"}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                        value={formValue.username}
                        onChange={handleUsernameChange}
                    />
                    <Input
                        type={"text"}
                        label={"PassWord"}
                        placeholder={"Password"}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                        value={formValue.password}
                        onChange={handlePasswordChange}
                    />

                    <InputSelect
                        label={"Trạng thái"}
                        array={[
                            { value: true, text: "Đang bật" },
                            { value: false, text: "Tắt" },
                        ]}
                        value={formValue.status}
                        onChange={handleStatusChange}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                    />
                    <InputSelect
                        label={"Role"}
                        array={[
                            { value: true, text: "1" },
                            { value: true, text: "2" },
                            { value: false, text: "3" },
                        ]}
                        className={
                            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
                        }
                        value={formValue.role}
                        onChange={handleSelectChange}
                    />

                </div>
                <div className="lg:my-0 md:my-0 sm:my-0 my-6">
                    <InputFile
                        title="Avata"
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
