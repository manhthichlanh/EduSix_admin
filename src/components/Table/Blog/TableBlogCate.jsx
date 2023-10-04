// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import PencilIcon from "../../common/icon/PencilIcon";
import TrashIcon from "../../common/icon/TrashIcon";

const data = [
  {
    course: "HTML, CSS",
    id: "00001",
    lesson: "1000",
  },
  {
    course: "JavaScript",
    id: "00002",
    lesson: "800",
  },
  {
    course: "ReactJS",
    id: "00003",
    lesson: "1200",
  },
  {
    course: "AngularJS",
    id: "00004",
    lesson: "1200",
  },
  {
    course: "Node.js",
    id: "00005",
    lesson: "900",
  },
  {
    course: "Python",
    id: "00006",
    lesson: "1500",
  },
  {
    course: "Ruby on Rails",
    id: "00007",
    lesson: "700",
  },
  {
    course: "Vue.js",
    id: "00008",
    lesson: "1100",
  },
  {
    course: "Django",
    id: "00009",
    lesson: "1000",
  },
];

function TableBlogCate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;

  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap">
            {item?.course}
          </div>
        ),
      },
      {
        title: "Số bài viết hiện có",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.lesson}</div>
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
    <div className=" mt-6 border rounded-lg">
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

export default TableBlogCate;
