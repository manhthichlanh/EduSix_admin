import React, { useMemo } from "react";
import Table from "rc-table";
import { isNumber } from "lodash";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import Add from "../../common/icon/Add";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { useQuery } from "react-query";
import { ServerApi } from "../../../utils/http";

function TableCourse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 10;

  // Define a query function to fetch course data
  const getCourseData = async () => {
    try {
      const response = await ServerApi.get("/course");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching course data");
    }
  };

  // Use React Query to fetch and manage course data
  const { data: courseData, isLoading, isError } = useQuery("courseData", getCourseData);
  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              <img src={item?.thumbnail} alt={item?.thumbnail} />
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "ID",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item?.course_id}</div>
        ),
      },
      {
        title: "Danh mục",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.category_id}
          </div>
        ),
      },
      // {
      //   title: "Số bài học",
      //   render: (item) => (
      //     <div className="py-1 text-[#667085] font-medium">
      //       {item?.numberOfLessons}
      //     </div>
      //   ),
      // },
      {
        title: "Giá",
          render: (item) => (
            <span
              className={`font-medium tracking-[0.5%] leading-[18px] ${
                item?.type === 0 ? "text-emerald-600" : (item?.type === 2 ? "text-red-500" : "")
              }`}
            >
              {item?.type === 0
                ? "Free"
                : (item?.type === 1 
                  ? `${Number(item?.price).toLocaleString("vi-VN")}đ`
                  : "N/A"
                )
              }
            </span>
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
              {item.status === "Active" ? "Đang bật" : "Đã tắt"}
            </p>
          </div>
        ),
      },
      {
        title: "Thời lượng",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.total_course_time}</div>
        ),
      },
      {
        title: "Ngày thêm",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.created_at}</div>
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
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="">
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={courseData}
          rowKey="id"
          scroll={{
            x: true,
          }}
        ></Table>
      </div>
      <div className="flex items-center justify-end p-4">
        <Pagination
          limit={LIMIT}
          total={courseData.length} // Replace with the total count from your API
          current={page}
          onChange={(value) =>
            navigate({
              search: `?page=${value}`,
            })
          }
        />
      </div>
    </div>
  );
}

export default TableCourse;
