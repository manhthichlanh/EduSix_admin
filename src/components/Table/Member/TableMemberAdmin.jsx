import Table from "rc-table";
import { useMemo } from "react";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { ServerApi } from "../../../utils/http";
import { useQuery } from 'react-query';

const data = [
  {
    userName: "Vũ Huy Đức",
    email: "user1@example.com",
    role: 1,
    status: "Active",
    addTime: "2023-09-19 10:30 AM",
  }
];
function fetchAdmin(page) {
  return ServerApi.get(`/auth`);
}
function TableMemberAdmin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data, isLoading, error } = useQuery(['auth', page], () => fetchAdmin(page));

  const admin = data?.data || [];
  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "Tên admin",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-300 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png" alt="" />
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.fullname}
              </p>
              <p className="capitalize font-sm text-sm text-gray-400 leading-[20px]">
                Chưa cập nhật
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Role",
        render: (item) => (
          <div className="py-1">
             <p className="capitalize font-sm text-sm text-gray-400 leading-[20px]">
                {item?.role}
              </p>
          </div>
        ),
      },

      {
        title: "Ngày tạo",
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
          data={admin}
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
export default TableMemberAdmin;
