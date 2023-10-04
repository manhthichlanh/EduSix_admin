import Table from "rc-table";
import { useMemo } from "react";
import PencilIcon from "../../common/icon/PencilIcon";
import TrashIcon from "../../common/icon/TrashIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";

const data = [
  {
    id: "1",
    courseName: "When I left, I was just a boy. When I return",
    category: "Danh mục 1",
    description: "When I left",
    addTime: "1 Dec 2023",
  },
  {
    id: "2",
    courseName: "Khóa học B",
    category: "Danh mục 2",
    description: "When I was just a boy",
    addTime: "1 Dec 2023",
  },
  {
    id: "3",
    courseName: "Khóa học C",
    category: "Danh mục 1",
    description: "When I return",
    addTime: "1 Dec 2023",
  },
  {
    id: "4",
    courseName: "Advanced React Masterclass",
    category: "Danh mục 2",
    description: "When I'll be a man",
    addTime: "2 Dec 2023",
  },
  {
    id: "5",
    courseName: "Machine Learning Basics",
    category: "Danh mục 3",
    description: "And the first thing I need to do is find you and I'll say: ",
    addTime: "2 Dec 2023",
  },
  {
    id: "6",
    courseName: "Web Development Fundamentals",
    category: "Danh mục 1",
    description:
      "I'm not perfect but I will love you in the most perfect way so ",
    addTime: "2 Dec 2023",
  },
  {
    id: "7",
    courseName: "Data Science for Beginners",
    category: "Danh mục 4",
    description: "Instead of being friends, can you be my lover?",
    addTime: "3 Dec 2023",
  },
  {
    id: "8",
    courseName: "Python Programming Basics",
    category: "Danh mục 3",
    description:
      "Lorem ip Impedit perspiciatis libero quam nihil quidem eius tempore",
    addTime: "3 Dec 2023",
  },
];

function TableBlogList() {
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
            <div className="w-12 h-12 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
              {/* Image here */}
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.courseName}
              </p>
              <p className="text-gray-500 w-80 truncate overflow-ellipsis">
                {item?.description}
              </p>
            </div>
          </div>
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
        title: "Ngày thêm",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.addTime}</div>
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
export default TableBlogList;
