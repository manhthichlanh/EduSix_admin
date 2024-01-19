// import React from "react";
import { useMemo } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";

const data = [
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
    {
        name: "HTML, CSS",
        course_id: "00001",
        status: "Active",
        ordinal_number: "20",
        create_at: "10-10-2000"
    },
];

function TableLessonMenu() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const LIMIT = 10;

    const columns = useMemo(
        () => [
            {
                title: "Course Id",
                render: (item) => (
                    <div
                        className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap"
                        key={item.id}
                    >
                        {item?.course_id}
                    </div>
                ),
            },
            {
                title: "Tên phần học",
                render: (item) => (
                    <div
                        className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap"
                        key={item.id}
                    >
                        {item?.name}
                    </div>
                ),
            },
            {
                title: "Số phần học",
                render: (item) => (
                    <div
                        className="capitalize font-medium  text-gray-500 text-base leading-[20px] whitespace-nowrap"
                        key={item.id}
                    >
                        {item?.ordinal_number}
                    </div>
                ),
            },
            {
                title: "Trạng thái",
                render: (item) => (
                    <div className="py-1">
                        <p
                            className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.status === "Active"
                                ? "text-emerald-700 bg-red-100"
                                : "text-orange-600 bg-emerald-100"
                                } rounded-lg`}
                        >
                            {item.status === "Active" ? "Đang bật" : "Đã tắt"}
                        </p>
                    </div>

                ),
            },
            {
                title: "Ngày sửa",
                render: (item) => (
                    <div className="py-1 font-medium text-gray-500">{item?.create_at}</div>
                ),
            },
            {
                title: "Thao tác",
                render: (item) => (
                    <div className="flex items-center gap-2" key={item.id}>
                        <button onClick={() => console.log(`I love you ${item?.id}`)}>
                            <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
                        </button>
                        <button onClick={() => console.log(`I miss you Ngọc`)}>
                            <Trash className="text-gray-500 hover:text-red-500"></Trash>
                        </button>
                    </div>
                ),
            }

        ],
        []
    );

    return (
        <div className="border rounded-lg">
            <div className="">
                <Table
                    columns={columns}
                    data={data}
                    rowKey="id"
                    scroll={{
                        x: true,
                    }}
                ></Table>
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
        </div>
    );
}

export default TableLessonMenu;

