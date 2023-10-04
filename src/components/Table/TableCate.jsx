// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import PencilIcon from "../common/icon/PencilIcon";
import TrashIcon from "../common/icon/TrashIcon";

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
  {
    course: "Node.js",
    id: "00005",
    lesson: "900",
    views: "800",
    price: 1500000,
    status: "Active",
  },
  {
    course: "Python",
    id: "00006",
    lesson: "1500",
    views: "5000",
    price: 0,
    status: "Active",
  },
  {
    course: "Ruby on Rails",
    id: "00007",
    lesson: "700",
    views: "300",
    price: 800000,
    status: "Inactive",
  },
  {
    course: "Vue.js",
    id: "00008",
    lesson: "1100",
    views: "1200",
    price: 0,
    status: "Active",
  },
  {
    course: "Django",
    id: "00009",
    lesson: "1000",
    views: "10000",
    price: 2000000,
    status: "Active",
  },
];

function TableCate() {
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
        title: "Số lượng",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.lesson}</div>
        ),
      },
      {
        title: "Thời gian",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.views}</div>
        ),
      },

      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2">
            <button onClick={() => console.log(`I love you ${item?.id}`)}>
              <PencilIcon className="text-gray-500 hover:text-orange-600"></PencilIcon>
            </button>
            <button onClick={() => console.log(`I miss you Ngọc`)}>
              <TrashIcon className=" text-gray-500 hover:text-red-500"></TrashIcon>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className=" border rounded-lg">
      <div className="">
        <Table
          columns={columns}
          data={data}
          key="id"
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

export default TableCate;
