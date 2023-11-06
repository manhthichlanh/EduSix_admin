import { useEffect, useState } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import Add from "../../common/icon/Add";
import { ServerApi } from "../../../utils/http";

function TableSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const coursesName = searchParams.get("coursesName");
  console.log(coursesName);
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 5;
  const [sectionData, setSectionData] = useState([]);

  useEffect(() => {
    if (courseId) {
      fetchSectionData(courseId, page);
    }
  }, [courseId, page]);

  const fetchSectionData = async (course_id, currentPage) => {
    try {
      const response = await ServerApi.get(`/section?course_id=${course_id}`);
      setSectionData(response.data);
      navigate(`?courseId=${course_id}&page=${currentPage}`, { replace: true });
    } catch (error) {
      console.error("Error fetching section data:", error);
      setSectionData([]); // Set data to an empty array in case of an error
    }
  };

  // Filter sectionData to include only items with the matching course_id
  const filteredSectionData = sectionData.filter((item) => item.course_id === Number(courseId));

  const startIndex = (page - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const displayedData = filteredSectionData.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Tên phần",
      render: (item) => (
        <div className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap">
          {item?.name}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      render: (item) => (
        <div className="py-1">
          <p
            className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${
              item.status === "Active"
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
            } rounded-lg`}
          >
            {item.status === true ? "Đang bật" : "Đã tắt"}
          </p>
        </div>
      ),
    },
    {
      title: "Thao tác",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button onClick={() => console.log(`I miss you Ngọc`)}>
            <Add className="text-gray-500  hover:text-blue-500"></Add>
          </button>
          <button onClick={() => console.log(`I love you ${item?.id}`)}>
            <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
          </button>
          <button onClick={() => console.log(`I miss you Ngọc`)}>
            <Trash className="text-gray-500  hover:text-red-500"></Trash>
          </button>
        </div>
      ),
    },
  ];

  // Calculate the total number of pages based on the length of displayedData
  const totalPages = Math.ceil(filteredSectionData.length);

  return (
    <div className="border rounded-lg">
      <div className="">
        <Table
          columns={columns}
          data={displayedData}
          rowKey="id"
          scroll={{
            x: true,
          }}
        ></Table>
        <div className="flex items-center justify-end p-4">
          <Pagination
            limit={LIMIT}
            total={totalPages}
            current={page}
            onChange={(value) => {
              fetchSectionData(courseId, value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TableSection;
