import Table from "rc-table";
import { useMemo } from "react";
// import { isNumber } from "lodash";
import PencilIcon from "../common/icon/PencilIcon";
import TrashIcon from "../common/icon/TrashIcon";
import AddIcon from "../common/icon/AddIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";

const data = [
  {
    id: "1",
    courseName: "When I left, I was just a boy. When I return",
    category: "Phần 1",
    numberOfLessons: "12",
    addTime: "1 Dec 2023",
  },
  {
    id: "2",
    courseName: "Khóa học B",
    category: "Phần 2",
    numberOfLessons: "3",
    addTime: "1 Dec 2023",
  },
  {
    id: "3",
    courseName: "Khóa học C",
    category: "Phần 4",
    numberOfLessons: "10",
    addTime: "1 Dec 2023",
  },
  {
    id: "4",
    courseName: "Advanced React Masterclass",
    category: "Phần 2",
    numberOfLessons: "15",
    addTime: "2 Dec 2023",
  },
  {
    id: "5",
    courseName: "Machine Learning Basics",
    category: "phần 3",
    numberOfLessons: "8",
    addTime: "2 Dec 2023",
  },
];

function TableQuiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div>
            <p className="capitalize font-medium text-base leading-[20px]">
              {item?.courseName}
            </p>
          </div>
        ),
      },

      {
        title: "Phần học",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.category}
          </div>
        ),
      },
      {
        title: "Bài học",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.numberOfLessons}
          </div>
        ),
      },
      {
        title: "Số câu hỏi",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.numberOfLessons}
          </div>
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
            <button onClick={() => console.log(`dnsdbhasbj`)}>
              <AddIcon className="text-gray-500 hover:text-blue-500"></AddIcon>
            </button>
            <button onClick={() => console.log(`I love you ${item?.id}`)}>
              <PencilIcon className="text-gray-500 hover:text-orange-600"></PencilIcon>
            </button>
            <button onClick={() => console.log(`I miss you Ngọc`)}>
              <TrashIcon className="text-gray-500 hover:text-red-500"></TrashIcon>
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
          key="id"
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
export default TableQuiz;
