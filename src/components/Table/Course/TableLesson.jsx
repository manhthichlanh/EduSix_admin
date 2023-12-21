// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
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

function TableLesson() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;

  const { data, isLoading, error } = useQuery(['lessons', page], () => fetchLessons(page));

  const lessons = data?.data || [];
  const columns = useMemo(
    () => [
      {
        title: "Tên bài học",
        render: (item) => (
          <div
            className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap"
            key={item.lesson_id}
          >
            {item?.name}
          </div>
        ),
      },
      {
        title: "Trạng thái",
        render: (item) => (
          <div className="py-1" key={item.lesson_id}>
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.type === "upload"
                  ? "text-[#13B2E4] bg-[#E8F8FD]"
                  : "text-[#F04438] bg-[#FEEDEC]"
                } rounded-lg`}
            >
              {item.type === "upload" ? "Video" : "Quiz"}
            </p>
          </div>
        ),
      },
      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2" key={item.lesson_id}>
            <button onClick={() => console.log(`I love you ${item?.lesson_id}`)}>
              <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
            </button>
            <button onClick={() => console.log(`I miss you Ngọc`)}>
              <Trash className="text-gray-500 hover:text-red-500"></Trash>
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
          data={lessons}
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

export default TableLesson;
