import Table from "rc-table";
import { useMemo } from "react";
import { isNumber } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import { ServerApi } from "../../utils/http";
import { useQuery } from 'react-query';

function fetchPay(page) {
  return ServerApi.get(`order/export-payment`);
}
function TableOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data, isLoading, error } = useQuery(['orders', page], () => fetchPay(page));

  const pay = data?.data || [];
  console.log(pay)
  const LIMIT = 10;
  const columns = useMemo(
    () => [
      {
        title: "ID",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item?.order_id}</div>
        ),
      },
      {
        title: "Khóa học",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              {/* Image here */}
            </div>
            <div>
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.course_id}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Thời gian",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">{item?.created_at}</div>
        ),
      },
      {
        title: "Khách hàng",
        render: (item) => (
          <div className="">
            <div className="py-1 text-[#667085] font-medium">
              {item?.user_id}
            </div>
            <div className="py-1 text-[#667085] font-sm text-sm">
              {item?.user_id}
            </div>
          </div>
        ),
      },
      {
        title: "Giá",
        render: (item) => (
          <span
            className={`font-medium tracking-[0.5%] leading-[18px] ${
              item?.price === 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isNumber(item?.price) && item?.price === 0
              ? "Miễn phí"
              : `${Number(item?.price).toLocaleString("vi-VN")}đ`}
          </span>
        ),
      },
      {
        title: "Phương thức thanh toán",
        render: (item) => (
          <div className="py-1 font-medium text-gray-500">
            {item?.payment_method}
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
          data={pay}
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

export default TableOrder;
