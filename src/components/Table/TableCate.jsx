// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Pencil from "../common/icon/Pencil";
import Trash from "../common/icon/Trash";
import { useQuery } from "react-query";
import { ServerApi, serverEndpoint } from "../../utils/http";
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
        title: "Danh mục",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[50px] overflow-hidden bg-gray-300 rounded-lg">
            <img src={`${serverEndpoint}category/logo_cate/${item.logo_cate}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.cate_name}
              </p>
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
