import Table from "rc-table";

import { useMemo } from "react";
import { isNumber } from "lodash";

const data = [
  {
    orderID: "ORD001",
    course: "Khóa học A",
    price: 0,
    status: "learning",
    purchaseTime: "2023-09-19 10:30 AM",
  },
  {
    orderID: "ORD002",
    course: "Khóa học B",
    price: 750000,
    status: "finished",
    purchaseTime: "2023-09-20 02:15 PM",
  },
  {
    orderID: "ORD003",
    course: "Khóa học C",
    price: 0,
    status: "finished",
    purchaseTime: "2023-09-21 09:45 AM",
  },
  {
    orderID: "ORD004",
    course: "Khóa học D",
    price: 500000,
    status: "finished",
    purchaseTime: "2023-09-22 04:20 PM",
  },
  {
    orderID: "ORD005",
    course: "Khóa học E",
    price: 250000,
    status: "learning",
    purchaseTime: "2023-09-23 08:00 AM",
  },
];

function TableMemberDetail() {
  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
              {/* Image here */}
            </div>
            <div>
              <h5 className="capitalize font-medium text-base text-gray-500 leading-[20px] whitespace-nowrap">
                {item?.course}
              </h5>
            </div>
          </div>
        ),
      },
      {
        title: "ID",
        render: (item) => (
          <div className=" py-1 text-blue-500 font-semibold">
            {item?.orderID}
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
                item.status === "learning"
                  ? "text-blue-500 bg-blue-100"
                  : "text-green-600 bg-green-100"
              } rounded-lg`}
            >
              {item.status === "learning" ? "Đang học " : "Đã hoàn thành"}
            </p>
          </div>
        ),
      },
      {
        title: "Ngày mua",
        render: (item) => (
          <div className="py-1 text-base font-medium text-gray-500">
            {item?.purchaseTime}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={data}
      rowKey="orderID"
      scroll={{
        x: true,
      }}
    />
  );
}

export default TableMemberDetail;
