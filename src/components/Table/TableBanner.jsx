import Table from "rc-table";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Pencil from "../../components/common/icon/Pencil";
import Trash from "../../components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const type = "DraggableBodyRow";

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef();
  const [{ isOver, dropClassname }, drop] = useDrop(
    () => ({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }

        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? "drop-over-downward" : "drop-over-upward",
        };
      },
      drop: (item) => {
        moveRow(item.index, index);
      },
    }),
    [index]
  );

  const [, drag] = useDrag(() => ({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index]);
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassname : ""} `}
      style={{ cursor: "move", ...style }}
      {...restProps}
    >
    </tr>
  );
};


const TableBanner = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;
 
  const columns = useMemo(
    () => [
      {
        title: "Banner",
        key: "name",
        dataIndex: "avata",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              {/* Image here */}
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Link",
        key: "link",
        dataIndex: "link",
        render: (item) => {
          console.log({item});
          return (
            <div className="flex items-center gap-2">
              <div className="">
                <p className="capitalize font-medium text-base leading-[20px]">
                  {item}
                </p>
              </div>
            </div>
          )
        }
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item === "Active"
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
                } rounded-lg`}
            >
              {item === "Active" ? "Active" : "Inactive"}
            </p>
          </div>
        ),
      },
      {
        title: "Thao tác",
        dataIndex: "thaotac",
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


  const [data, setData] = useState([
    {
      id: "1",
      avata: "images",
      link: "aaaaaaa",
      name: "Sơn Tùng MTP",
      status: "Inactive"
    },
    {
      id: "2",
      avata: "images",
      link: "bbbbbbbbbb",
      name: "Banner Học Phần Frontend",
      status: "Active"
    },
    {
      id: "3",
      avata: "images",
      link: "cccccccccccc",
      name: "Banner Khóa Học Python",
      status: "Active"
    },
    // {
    //   id: "1",
    //   name: "images",
    //   address: "Banner Khóa Học Online",
    //   age: 23,
    // },
    // {
    //   id: "2",
    //   name: "images",
    //   address: "Banner Khóa Học Online",
    //   age: 21,
    // },
    // {
    //   id: "3",
    //   name: "images",
    //   address: "Banner Khóa Học Online",
    //   age: 26,
    // },
   
  ]);
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  const component = {
    body: {
      row: DraggableBodyRow
    },
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={data}
          components={component}
          rowKey="id"
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
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
    </DndProvider>
  );
}

export default TableBanner;
