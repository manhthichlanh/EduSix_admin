import React from 'react'
import InputFile from '../../../components/Input/InputFile'
import Input from '../../../components/Input/Input';
import InputSelect from '../../../components/Input/InputSelect';
import Jodit from '../../../components/Jodit/Jodit';
import Button from '../../../components/Button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ServerApi } from "../../../utils/http";
import { convertViToEn, getLocalData } from '../../../utils/helper';
import ToastMessage from '../../../utils/alert'

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

export default function GeneralInfo() {
  const [formValue, setFormValue] = useState({
    category_id: "1",
    admin_id: null,
    name: "",
    course_price: "",
    slug: null,
    content: "",
    status: true,
    type: 0,
    thumbnail: "",
    author: ""
  })

  const { data: cateData, isLoading, isError } = useQuery("cateData", getCategory);
  const navigate = useNavigate();
  const handleSelectChange = (e) => {
    setFormValue({ ...formValue, category_id: e.target.value })
  };
  const handleSelectAuthorChange = (e) => {
    setFormValue({ ...formValue, author: e.target.value })
  };

  const handlePriceChange = (e) => {
    setFormValue({ ...formValue, course_price: e.target.value })

  };

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, name: e.target.value })
  };

  const handleDescriptionChange = (content) => {
    setFormValue({ ...formValue, content })
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
    setFormValue({ ...formValue, thumbnail: newForm.get("file") })
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
        ToastMessage("Thêm mới thông tin khóa học thành công!").success();
        setTimeout(() => {
          navigate(`/add-section?courseId=${courseId}`, { state: { courseName: coursesName, courseId } })
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
    <div className="mx-6">
      <div className="lg:my-0 md:my-0 sm:my-0 my-6 bg-white ">
        <InputFile
          title="Hình ảnh khóa học"
          className={
            "grid p-6 mt-4  border-2 border-dashed justify-items-center rounded-md"
          }
          onChange={handleFileChange}
          value={""}
        ></InputFile>
      </div>
      <div className="w-full bg-white p-6 my-6 border-2 rounded-lg">

        <Input
          type={"text"}
          label={"Tên khóa học"}
          placeholder={"Nhập tên khóa học"}
          className={
            "mt-2 px-2 py-2 w-full rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
          }
          value={formValue.name}
          onChange={handleInputChange}
        />
        <div className="w-full flex">
          <div className="flex-1 ">
            <InputSelect
              label={"Danh mục"}
              array={cateData}
              className={
                "px-2 py-2 mt-2 w-full rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
              value={formValue.category_id}
              onChange={handleSelectChange}
            />
          </div>
          <div className="flex-1 ml-4">
            <InputSelect
              label={"Giảng viên"}
              array={cateData}
              className={
                "px-2  py-2 w-full mt-2 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
              value={formValue.author}
              onChange={handleSelectAuthorChange}
            />
          </div>
        </div>


        <InputSelect
          label={"Loại khóa học"}
          array={[
            { value: "0", text: "Miễn phí" },
            { value: "1", text: "Có phí" },
          ]}
          value={formValue.type}
          onChange={handleSelectChangeCourseType}
          className={
            "mt-2 px-2 py-2 w-full rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
          }
        />

        {formValue.type === "1" && (
          <Input
            type="number"
            value={formValue.course_price}
            onChange={handlePriceChange}
            placeholder="Nhập giá"
            min={0}
            className="mt-2 px-2 py-2 w-full bg-white rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
          />
        )}
        <InputSelect
          label={"Trạng thái"}
          array={[
            { value: true, text: "Mở bán" },
            { value: false, text: "Ngưng bán" },
          ]}
          value={formValue.status}
          onChange={handleStatusChange}
          className={
            "mt-2 px-2 py-2 w-full rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
          }
        />
          <Jodit
            label={"Mô tả"}
            value={formValue.content} // Use an empty string as a fallback
            setValue={handleDescriptionChange}
          
          />
      </div>
      <div className="flex justify-end">
      <Button
            text={"Tiếp tục"}
            Class={
              "flex font-medium items-center bg-indigo-500 hover-bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
            }
            onClick={() => {
              const newFormError = {
                "Tên": formValue.name,
                "Mô tả": formValue.content,
                "Hình ảnh": formValue.thumbnail,
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
  )
}
