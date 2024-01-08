import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "rc-table";
import Pagination from "../../common/Pagination";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import { ServerApi } from "../../../utils/http";
import { useQuery } from 'react-query';
const data = [
  {
    course: "HTML, CSS",
    id: "00001",
    lesson: "1000",
    videoType: "upload",
  }
];
function fetchLessons(page) {
  return ServerApi.get(`lesson?page=${page}`);
}

function TableLesson(props) {
  const { courseName, courseId, sectionId, sectionName } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;
  const [lessonData, setLessonData] = useState([]);

  useEffect(() => {
    if (sectionId) {
      fetchLessonData(sectionId, courseId, page);
    }
  }, [sectionId, courseId, page]);

  const fetchLessonData = async (section_id, course_id, currentPage) => {
    try {
      const response = await ServerApi.get(`/lesson?section_id=${section_id}&course_id=${course_id}`);
      setLessonData(response.data);
      // Chuyển đến đúng trang và duyệt trên sectionId trong đường dẫn
      navigate(`?sectionId=${section_id}&courseId=${course_id}&page=${currentPage}`, { replace: true });
    } catch (error) {
      console.error("Error fetching lesson data:", error);
      setLessonData([]); // Set data to an empty array in case of an error
    }
  };

  const columns = [
    {
      title: "Tên bài học",
      render: (item) => (
        <div
          className="capitalize font-medium text-gray-500 text-base leading-[20px] whitespace-nowrap"
          key={item.id} // Đảm bảo rằng giá trị `key` là duy nhất
        >
          {item?.name}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      render: (item) => (
        <div className="py-1" key={item.id}>
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
     ) },
    
    {
      title: "Thao tác",
      render: (item) => (
        <div className="flex items-center gap-2" key={item.id}>
          <button onClick={() => console.log(`I love you ${item?.id}`)}>
            <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
          </button>
          <button onClick={() => console.log(`I miss you Ngọc`)}>
            <Trash className="text-gray-500 hover:text-red-500"></Trash>
          </button>
        </div>
      ),
    },
  ];
  

  // Lọc danh sách bài học dựa trên sectionId từ đường dẫn
  const filteredLessonData = lessonData.filter((item) => item.section_id === sectionId);

  // Tính toán tổng số trang dựa trên độ dài của danh sách bài học
  const totalPages = Math.ceil(filteredLessonData.length);
  const { data, isLoading, error } = useQuery(['lessons', page], () => fetchLessons(page));

  const lessons = data?.data || [];
  // const columns = useMemo(
  //   () => [
  //     {
  //       title: "Tên bài học",
  //       render: (item) => (
  //         <div
  //           className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap"
  //           key={item.lesson_id}
  //         >
  //           {item?.name}
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "Trạng thái",
  //       render: (item) => (
  //         <div className="py-1" key={item.lesson_id}>
  //           <p
  //             className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.type === "upload"
  //                 ? "text-[#13B2E4] bg-[#E8F8FD]"
  //                 : "text-[#F04438] bg-[#FEEDEC]"
  //               } rounded-lg`}
  //           >
  //             {item.type === "upload" ? "Video" : "Quiz"}
  //           </p>
  //         </div>
  //       ),
  //     },
  //     {
  //       title: "Thao tác",
  //       render: (item) => (
  //         <div className="flex items-center gap-2" key={item.lesson_id}>
  //           <button onClick={() => console.log(`I love you ${item?.lesson_id}`)}>
  //             <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
  //           </button>
  //           <button onClick={() => console.log(`I miss you Ngọc`)}>
  //             <Trash className="text-gray-500 hover:text-red-500"></Trash>
  //           </button>
  //         </div>
  //       ),
  //     },
  //   ],
  //   []
  // );

  return (
    <div className="border rounded-lg">
      <div className="">
        <Table
          columns={columns}
          data={lessons}
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
              fetchLessonData(sectionId, courseId, value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TableLesson;
