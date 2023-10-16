// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { isNumber } from "lodash";
import { Menu } from "@headlessui/react";
import Filter from "../common/icon/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const data = [
  {
    course: "HTML, CSS",
    id: "00001",
    lesson: "1000",
    views: "10000",
    price: 0,
    status: "inactive",
  },
  {
    course: "JavaScript",
    id: "00002",
    lesson: "800",
    views: "150",
    price: 1200000,
    status: "inactive",
  },
  {
    course: "ReactJS",
    id: "00003",
    lesson: "1200",
    views: 200,
    price: 0,
    status: "Active",
  },
  {
    course: "AngularJS",
    id: "00004",
    lesson: "1200",
    views: 200,
    price: 1000000,
    status: "Active",
  },
];

function TableIndex() {
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
              <h5 className="capitalize font-medium text-base leading-[20px] whitespace-nowrap">
                {item?.course}
              </h5>
              <span className="capitalize text-gray-400 text-sm font-normal leading-[18px]">
                {item?.id}
              </span>
            </div>
          </div>
        ),
      },
      {
        title: "Bài học",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.lesson}</div>
        ),
      },
      {
        title: "Lượt xem",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.views}</div>
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
    ],
    []
  );

  return (
    <div className="border rounded-lg ">
      <div className="flex items-center justify-between px-6 py-6">
        <p className="text-lg font-semibold">Thống kê</p>
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <Filter></Filter>
              <p className="text-lg font-medium">Lọc</p>
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-48 mt-2 space-y-2 origin-right bg-white border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-md ${
                      active ? "bg-blue-500 text-white" : "text-gray-700"
                    }`}
                    role="menuitem"
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-md ${
                      active ? "bg-blue-500 text-white" : "text-gray-700"
                    }`}
                    role="menuitem"
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="">
        <Table
          columns={columns}
          data={data}
          rowKey="id"
          scroll={{
            x: true,
          }}
        ></Table>
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
    </div>
  );
}

export default TableIndex;
