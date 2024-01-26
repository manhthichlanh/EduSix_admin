import Table from "rc-table";
import { useMemo } from "react";
import Pencil from "../../../components/common/icon/Pencil";
import Trash from "../../../components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/common/Pagination";
import { ServerApi, serverEndpoint } from '../../../utils/http';


function TableBlog({ data }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; // Parse the current page from the URL
  const dataArray = Array.isArray(data) ? data : [];
  const columns = useMemo(
    () => [
      {
        title: "Blog",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
            <img src={`${serverEndpoint}blog/thumbnail/${item.blog.thumbnail}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px] w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {item?.blog.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.blog.status === true
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
                } rounded-lg`}
            >
              {item.blog.status === true? "Đang bật" : "Đang tắt"}
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
  const endIndex = currentPage * LIMIT;

  const onPageChange = (page) => {
    navigate({
      search: `?page=${page}`,
    });
  };
  return (
    <div className="">
      <div className="border rounded-lg">
      <Table
       
        columns={columns}
        data={dataArray.slice((currentPage - 1) * LIMIT, endIndex).map((item, index) => ({ ...item, index }))}
        rowKey="id"
        scroll={{
          x: true,
        }}
      ></Table>
      </div>
      <div className="flex items-center justify-end p-4">
      <Pagination
        limit={LIMIT}
        total={dataArray.length}
        current={currentPage} // Use the current page
        onChange={onPageChange}
      />
      </div>
    </div>
  );
}
export default TableBlog;