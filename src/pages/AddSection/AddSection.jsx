import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import TableSection from "../../components/Table/Course/TableSection";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ServerApi } from '../../utils/http';
import ToastMessage from '../../utils/alert';
import { useQuery } from 'react-query';

const getCourseById = async (courseId) => {
  try {
    const response = await ServerApi.get("course/" + courseId);
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export default function AddSection() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const navigate = useNavigate();
  const { isLoading, error, data: course } = useQuery(["courseById", courseId], () => getCourseById(courseId));
  const [sectionData, setSectionData] = useState({
    course_id: courseId,
    name: '',
    status: '1',
  });

  const handleSectionNameChange = (e) => {
    setSectionData({
      ...sectionData,
      name: e.target.value,
    });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value === "1" ? "1" : "0";
    setSectionData({
      ...sectionData,
      status: newStatus,
    });
  };

  const handleAddSection = async () => {
    if (!sectionData.name) {
      ToastMessage("Hãy nhập tên phần").error();
      return;
    }

    const shouldContinue = window.confirm("Bạn có muốn tiếp tục không?");

    if (shouldContinue) {
      try {
        // Send a POST request to create a new section
        const response = await ServerApi.post('section', sectionData);

        // Get the created section's ID from the response
        const sectionId = response.data.section_id;

        // Show a success toast message
        ToastMessage("Thêm mới phần học thành công!").success();

        // Redirect to the "add-lesson" page with relevant data
        setTimeout(() => {
          navigate(`/add-lesson?sectionId=${sectionId}&courseId=${sectionData.course_id}`, {
            state: {
              courseName: course?.name,
              courseId: sectionData.course_id,
              sectionName: sectionData.name,
              sectionId,
            },
          });
        }, 500);
      } catch (error) {
        console.error('Error saving data:', error);
        ToastMessage(error.message).error();
      }
    }
  };

  return (
    <>
      <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        <div className="mt-6">
          <div className="text-2xl font-medium pb-2">Thêm phần</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/list-cate" className="text-indigo-500">
              Danh sách khóa học
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/add-course" className="text-indigo-500">
              Thêm khóa học
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Thêm phần</p>
          </div>
        </div>
        <div className="flex gap-2 whitespace-nowrap xl:mt-0 lg:mt-4 md:mt-4 md:justify-end mt-4 sm:mb-0 sm:mt-4 sm:justify-end">
          <Button
            text={"Hủy"}
            Class={
              "flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg"
            }
          />
          <Button
            text={"Thêm thành phần"}
            Class={
              "flex font-medium items-center bg-indigo-500 hover-bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
            }
            onClick={handleAddSection}
          />
        </div>
      </div>

      <div className="px-6 py-6 m-6 bg-white border-2 rounded-lg">
        <p htmlFor="" className="pb-2 text-xl font-medium text-left">
          Thêm phần
        </p>
        <input
          label="Tên khóa học"
          type="text"
          defaultValue={course?.name}
          disabled
          className="w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus-border-indigo-500 focus-outline-none"
        />
        <Input
          label={"Tên phần"}
          type={"text"}
          placeholder="Nhập tên phần"
          className="w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus-border-indigo-500 focus-outline-none"
          value={sectionData.name}
          onChange={handleSectionNameChange}
        />
        <InputSelect
          label={"Trạng thái"}
          array={[
            { value: "1", text: "Đang bật" },
            { value: "0", text: "Đang tắt" },
          ]}
          className="mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus-outline-none"
          value={sectionData.status}
          onChange={handleStatusChange}
        />
      </div>
      <div className="p-6">
        <TableSection
          courseName={course?.name}
          courseId={courseId}
        />
      </div>
    </>
  );
}