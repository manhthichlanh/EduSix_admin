import Table from "rc-table";
import { useMemo } from "react";
// import { isNumber } from "lodash";
import PencilIcon from "../../common/icon/PencilIcon";
import TrashIcon from "../../common/icon/TrashIcon";
import AddIcon from "../../common/icon/AddIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";

const data = [
  {
    userName: "Vũ Huy Đức",
    email: "user1@example.com",
    role: 1,
    status: "Active",
    addTime: "2023-09-19 10:30 AM",
  },
  {
    userName: "Nguyễn Châu Bảo Ngọc",
    email: "user2@example.com",
    role: 1,
    status: "Inactive",
    addTime: "2023-09-20 02:15 PM",
  },
  {
    userName: "Phòng Thị Trúc Lan",
    email: "user3@example.com",
    role: 0,
    status: "Active",
    addTime: "2023-09-21 09:45 AM",
  },
  {
    userName: "Bùi Lệ Thu",
    email: "user3@example.com",
    role: 0,
    status: "Inactive",
    addTime: "2023-09-21 09:45 AM",
  },
  {
    userName: "Võ Ngọc Gia Linh",
    email: "user3@example.com",
    role: 1,
    status: "Active",
    addTime: "2023-09-21 09:45 AM",
  },
];

function TableMemberAdmin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "Tên admin",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
              {/* Image here */}
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.userName}
              </p>
              <p className="capitalize font-sm text-sm text-gray-400 leading-[20px]">
                {item?.email}
              </p>
            </div>
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
              {item.status === "Active" ? "Đang hoạt động" : "Không hoạt động"}
            </p>
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
export default TableMemberAdmin;