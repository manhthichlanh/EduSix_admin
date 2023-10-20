import Table from "rc-table";
import { useMemo } from "react";
import { isNumber } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const data = [
  {
    id: "1",
    courseName: "When I left, I was just a boy. When I return",
    category: "Danh mục 1",
    userName: "Vũ Huy Đức",
    email: "vuhuyduc2100@gmail.com",
    price: 200000,
    paymentMethod: "Visa",
    duration: "25:08:03",
    addTime: "1 Dec 2023",
  },
  {
    id: "2",
    courseName: "Khóa học B",
    category: "Danh mục 2",
    userName: "Nguyễn Châu Bảo Ngọc",
    email: "121212@gmail.com",
    price: 0,
    paymentMethod: "masterCard",
    duration: "15:04:03",
    addTime: "1 Dec 2023",
  },
  {
    id: "3",
    courseName: "Khóa học C",
    category: "Danh mục 1",
    userName: "Võ Ngọc Gia Linh",
    email: "user1@example.com",
    price: 15000000,
    paymentMethod: "masterCard",
    duration: "09:09:23",
    addTime: "1 Dec 2023",
  },
  {
    id: "4",
    courseName: "Advanced React Masterclass",
    category: "Danh mục 2",
    userName: "Trần Thị Mỹ Duyên",
    email: "dashdasjh@gmail.com",
    price: 250000,
    paymentMethod: "paypal",
    duration: "12:45:00",
    addTime: "2 Dec 2023",
  },
  {
    id: "5",
    courseName: "Machine Learning Basics",
    category: "Danh mục 3",
    userName: "Phòng Thị Trúc Lan",
    email: "đjsa@gmail.com",
    price: 1000000,
    paymentMethod: "masterCard",

    duration: "18:30:15",
    addTime: "2 Dec 2023",
  },
  {
    id: "6",
    courseName: "Web Development Fundamentals",
    category: "Danh mục 1",
    userName: "Bùi Lệ Thu",
    email: "dashdasjh@gmail.com",
    price: 0,
    paymentMethod: "masterCard",

    duration: "30:20:45",
    addTime: "2 Dec 2023",
  },
  {
    id: "7",
    courseName: "Data Science for Beginners",
    category: "Danh mục 4",
    userName: "Ngô Thủy Đan",
    email: "dashdasjh@gmail.com",
    price: 800000,
    paymentMethod: "visa",
    duration: "08:15:30",
    addTime: "3 Dec 2023",
  },
  {
    id: "8",
    courseName: "Python Programming Basics",
    category: "Danh mục 3",
    userName: "Nguyễn Xuân Quỳnh Chi",
    email: "dashdasjh@gmail.com",
    price: 1200000,
    paymentMethod: "Paypal",
    duration: "22:10:10",
    addTime: "3 Dec 2023",
  },
];

function TableOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "ID",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item?.id}</div>
        ),
      },
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
        title: "Thời gian",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">{item?.addTime}</div>
        ),
      },
      {
        title: "Khách hàng",
        render: (item) => (
          <div className="">
            <div className="py-1 text-[#667085] font-medium">
              {item?.userName}
            </div>
            <div className="py-1 text-[#667085] font-sm text-sm">
              {item?.email}
            </div>
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
        title: "Phương thức thanh toán",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">
            {item?.paymentMethod}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="border rounded-lg">
      <div className="">
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

export default TableOrder;
