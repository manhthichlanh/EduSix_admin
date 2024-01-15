// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Pencil from "../common/icon/Pencil";
import Trash from "../common/icon/Trash";
import { useQuery } from "react-query";
import { ServerApi } from "../../utils/http";
function TableCate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;
  const fetchCategoryData = async () => {
    try {
      const response = await ServerApi.get("/category");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching category data");
    }
  };
  const { data: categoryData, isLoading, isError } = useQuery('categoryData', fetchCategoryData);
  const columns = useMemo(
    () => [
      {
        title: "Khóa học",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div>
              <h5 className="capitalize font-medium text-base leading-[20px] whitespace-nowrap">
                {item?.cate_name}
              </h5>
              <span className="capitalize text-gray-400 text-sm font-normal leading-[18px]">
                {item?.category_id}
              </span>
            </div>
          </div>
        ),
      },
      {
        title: "Số lượng",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.lesson}</div>
        ),
      },
      {
        title: "Thời gian",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">{item?.views}</div>
        ),
      },

      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2">
            <button onClick={() => console.log(`I love you ${item?.category_id}`)}>
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
    <div className="border rounded-lg ">
      <div className="">
        <Table
          columns={columns}
          data={categoryData}
          rowKey="id"
          scroll={{
            x: true,
          }}
        ></Table>
        <div className="flex items-center justify-end p-4">
          <Pagination
            limit={LIMIT}
            total={categoryData ? categoryData.length : 0}
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

export default TableCate;
