import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import TableSection from "../../components/Table/Course/TableSection";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ServerApi } from '../../utils/http';
import ToastMessage from '../../utils/alert';

export default function AddSection() {
  const location = useLocation();
  const coursesName = location.state?.coursesName;
  const courseId = location.state?.courseId;
  const navigate = useNavigate();

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
      alert('Hãy nhập tên phần'); // Show an alert if section name is empty
      return;
    }
  
    const shouldContinue = window.confirm("Bạn có muốn tiếp tục không?");
  
    if (shouldContinue) {
      try {
        const response = await ServerApi.get('section');
        const sections = response.data; // Assuming the API returns an array of sections
    
        // Sort sections in descending order based on section_id
        sections.sort((a, b) => b.section_id - a.section_id);
    
        let lastSectionId = 0;
    
        if (sections.length > 0) {
          const latestSection = sections[0]; // The first section is the latest one
          lastSectionId = latestSection.section_id;
          console.log('Latest Section ID:', lastSectionId); // Log the latest section ID
        } else {
          console.error('No sections found');
          // Handle the case where there are no sections
        }
    
        // Set name, section_id, and ordinal_number in sectionDataToSend
        const sectionDataToSend = {
          ...sectionData,
          status: sectionData.status === "1" ? 1 : 0,
          name: sectionData.name,
          section_id: lastSectionId,
          ordinal_number: sections.length + 1, // Calculate the next ordinal_number
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
    
        const headers = {
          'Content-Type': 'application/json',
        };
    
        const saveResponse = await ServerApi.post('section', sectionDataToSend, { headers });
        console.log('Data saved:', saveResponse.data);
    
        const sectionId = saveResponse.data.section_id;
        ToastMessage("Thêm mới phần học thành công!").success();
        setTimeout(() => {
          navigate('/add-lesson', {
            state: {
              courseName: coursesName,
              course_id: sectionData.course_id,
              name: sectionData.name,
              sectionId,
            },
          });
        }, 500);
      } catch (error) {
        console.error('Error saving data:', error);
        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Status Code:', error.response.status);
        }
        ToastMessage(error.message).error();
        // Handle the error here
      }
    }
    
    
};
  
  




  return (
    <>
      {/* <form action=""> */}
        {/* Title */}
        <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
          {/* Breadcrumbs */}
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
              text={"Thêm thành phần"}
              Class={
                "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
              }
              onClick={handleAddSection}
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
                    <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v18c0-0.553-0.447-1-1-1z" />
                    <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
                  </svg>
                );
              }}
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
            defaultValue={coursesName}
            disabled
            className="w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
          />
          <Input
            label={"Tên phần"}
            type={"text"}
            placeholder="Nhập tên phần"
            className="w-full mt-2 px-3 py-2 my-4 border-2 rounded-lg bg-neutral-100 focus:border-indigo-500 focus:outline-none"
            value={sectionData.name}
            onChange={handleSectionNameChange}
          />
          <InputSelect
            label={"Trạng thái"}
            array={[
              { value: "1", text: "Đang bật" },
              { value: "0", text: "Đang tắt" },
            ]}
            className="mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus-border-indigo-500 focus:outline-none"
            value={sectionData.status}
            onChange={handleStatusChange}
          />
        </div>
        {/* <div className="flex gap-2 px-6">
          <Button
           
            text={"Lưu"}
            Class="flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
          />
          <Button
            onClick={() => console.log("You'll be mine")}
            text={"Tiếp tục"}
            Class={
              "flex font-medium items-center bg-indigo-200 hover:bg-indigo-500 transition ease-in-out text-indigo-500 hover:text-white py-2 px-4 rounded-lg"
            }
          />
        </div> */}
      {/* </form> */}
      <div className="p-6">
        <TableSection></TableSection>
      </div>
    </>
  );
}
