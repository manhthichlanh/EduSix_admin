import Table from "rc-table";
import { useMemo } from "react";
// import { isNumber } from "lodash";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
// import AddIcon from "../../common/icon/AddIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { ServerApi } from "../../../utils/http";
import { useQuery } from 'react-query';

const data = [
  {
    userName: "Vũ Huy Đức",
    email: "user1@example.com",
    lessonJoined: 10,
    role: 1,
    status: "Active",
    addTime: "2023-09-19 10:30 AM",
  }
];
function fetchUser(page) {
  return ServerApi.get(`user`);
}
function TableMemberUser() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data, isLoading, error } = useQuery(['user', page], () => fetchUser(page));

  const users = data?.data || [];

  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "Tên người dùng",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-300 rounded-full">
              <img src={item?.avatar} alt={item?.avatar}/>
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.fullname}
              </p>
              <p className="capitalize font-sm text-sm text-gray-400 leading-[20px]">
                {item?.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Khóa học đã đăng kí",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">
            {/* {item?.lessonJoined} */} Chưa cập nhật
          </div>
        ),
      },
      {
        title: "Trạng thái",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${
                item.status === "2"
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
              } rounded-lg`}
            >
              {item.status === "2" ? "Không hoạt động" : "Đang hoạt động"}
            </p>
          </div>
        ),
      },

      {
        title: "Ngày thêm",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.created_at}</div>
        ),
      },
      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2">
            <button onClick={() => console.log(`I love you ${item?.id}`)}>
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
    <div className="">
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={users}
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
export default TableMemberUser;
