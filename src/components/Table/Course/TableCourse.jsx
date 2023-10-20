import Table from "rc-table";
import { useMemo } from "react";
import { isNumber } from "lodash";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import Add from "../../common/icon/Add";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";

const data = [
  {
    id: "1",
    courseName: "When I left, I was just a boy. When I return",
    category: "Danh mục 1",
    numberOfLessons: "12",
    price: 200000,
    status: "Active",
    duration: "25:08:03",
    addTime: "1 Dec 2023",
  },
  {
    id: "2",
    courseName: "Khóa học B",
    category: "Danh mục 2",
    numberOfLessons: "3",
    price: 0,
    status: "Inactive",
    duration: "15:04:03",
    addTime: "1 Dec 2023",
  },
  {
    id: "3",
    courseName: "Khóa học C",
    category: "Danh mục 1",
    numberOfLessons: "10",
    price: 15000000,
    status: "Active",
    duration: "09:09:23",
    addTime: "1 Dec 2023",
  },
  {
    id: "4",
    courseName: "Advanced React Masterclass",
    category: "Danh mục 2",
    numberOfLessons: "15",
    price: 250000,
    status: "Active",
    duration: "12:45:00",
    addTime: "2 Dec 2023",
  },
  {
    id: "5",
    courseName: "Machine Learning Basics",
    category: "Danh mục 3",
    numberOfLessons: "8",
    price: 1000000,
    status: "Active",
    duration: "18:30:15",
    addTime: "2 Dec 2023",
  },
  {
    id: "6",
    courseName: "Web Development Fundamentals",
    category: "Danh mục 1",
    numberOfLessons: "20",
    price: 500000,
    status: "Inactive",
    duration: "30:20:45",
    addTime: "2 Dec 2023",
  },
  {
    id: "7",
    courseName: "Data Science for Beginners",
    category: "Danh mục 4",
    numberOfLessons: "6",
    price: 800000,
    status: "Active",
    duration: "08:15:30",
    addTime: "3 Dec 2023",
  },
  {
    id: "8",
    courseName: "Python Programming Basics",
    category: "Danh mục 3",
    numberOfLessons: "10",
    price: 1200000,
    status: "Active",
    duration: "22:10:10",
    addTime: "3 Dec 2023",
  },
];

function TableCourse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              {/* Image here */}
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.courseName}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "ID",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item?.id}</div>
        ),
      },
      {
        title: "Danh mục",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.category}
          </div>
        ),
      },
      {
        title: "Số bài học",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.numberOfLessons}
          </div>
        ),
      },
      {
        title: "Giá",
        render: (item) => (
          <span
            className={`font-medium tracking-[0.5%] leading-[18px] ${
              item?.price === 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isNumber(item?.price) && item?.price === 0
              ? "Miễn phí"
              : `${Number(item?.price).toLocaleString("vi-VN")}đ`}
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
          <div className="py-1 font-medium text-gray-500">{item?.duration}</div>
        ),
      },
      {
        title: "Ngày thêm",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.addTime}</div>
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

  return (
    <div className="">
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={data}
          rowKey="id"
          scroll={{
            x: true,
          }}
        ></Table>
      </div>
      <div className="flex items-center justify-end p-4">
        <Pagination
          limit={LIMIT}
          total={100}
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
