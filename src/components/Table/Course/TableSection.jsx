// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import Add from "../../common/icon/Add";

const data = [
  {
    course: "HTML, CSS",
    id: "00001",
    lesson: "1000",
    status: "Active",
  },
  {
    course: "JavaScript",
    id: "00002",
    lesson: "800",
    status: "Active",
  },
  {
    course: "ReactJS",
    id: "00003",
    lesson: "1200",
    status: "Inative",
  },
  {
    course: "AngularJS",
    id: "00004",
    lesson: "1200",
    status: "Inactive",
  },
  {
    course: "Node.js",
    id: "00005",
    lesson: "900",
    status: "Active",
  },
  {
    course: "Python",
    id: "00006",
    lesson: "1500",
    status: "Active",
  },
  {
    course: "Ruby on Rails",
    id: "00007",
    lesson: "700",
    status: "Active",
  },
  {
    course: "Vue.js",
    id: "00008",
    lesson: "1100",
    status: "Active",
  },
  {
    course: "Django",
    id: "00009",
    lesson: "1000",
    status: "Active",
  },
];

function TableSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;

  const columns = useMemo(
    () => [
      {
        title: "Tên phần",
        render: (item) => (
          <div className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap">
            {item?.course}
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
              {item.status === "Active" ? "Đang bật" : "Đã tắt"}
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

export default TableSection;
