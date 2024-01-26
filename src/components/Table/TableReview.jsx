import Table from "rc-table";
import { useMemo } from "react";
import Pencil from "../../components/common/icon/Pencil";
import Trash from "../../components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";

const data = [
  
  {
    id:5,
    avata: "images",
    name: "Digital Marketing",
    created_at: "12/12/1222",
    status: "Active"
  }
  , {
    id:6,
    avata: "images",
    name: " Machine Learning",
    created_at: "12/12/1222",
    status: "Active"
  }
  , {
    id:7,
    avata: "images",
    name: "Android Development",
    created_at: "12/12/1222",
    status: "Active"
  }
];


function TableReview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;

  const columns = useMemo(
    () => [
      {
        title: "Người đại diện",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              {/* Image here */}
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Ngày đăng",
        key: "created_at",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item.created_at}</div>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.status === "Active"
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
                } rounded-lg`}
            >
              {item.status === "Active" ? "Active" : "Inactive"}
            </p>
          </div>
        ),
      },
      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigate(`/add-banner?bannerId=${item.banner_id}`, {
                  state: { courseName: item.name, courseId: item.course_id }, // Pass coursesName in state
                })
              }
            >
              <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
            </button>
            <button>
              <Trash className="text-gray-500  hover:text-red-500"></Trash>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="border rounded-lg">
        <Table    
          columns={columns}
          data={data}
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
export default TableReview;