import Table from "rc-table";
import { useMemo, useState } from "react";
import Pencil from "../../components/common/icon/Pencil";
import Trash from "../../components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// const data = [
//   {
//     id:1,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Online",
//     link: "http://localhost:5173/course-banner",
//     status: "Active"
//   },
//   {
//     id:2,
//     thumbnail: "images",
//     banner_name: "Banner Học Phần Frontend",
//     link: "http://localhost:5173/frontend-course",
//     status: "Active"
//   },
//   {
//     id:3,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Python",
//     link: "http://localhost:5173/python-course",
//     status: "Active"
//   }
//   , {
//     id:4,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Java",
//     link: "http://localhost:5173/java-course",
//     status: "Active"
//   }
//   , {
//     id:5,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Digital Marketing",
//     link: "http://localhost:5173/digital-marketing-course",
//     status: "Active"
//   }
//   , {
//     id:6,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Machine Learning",
//     link: "http://localhost:5173/ml-course",
//     status: "Active"
//   }
//   , {
//     id:7,
//     thumbnail: "images",
//     banner_name: "Banner Khóa Học Android Development",
//     link: "http://localhost:5173/android-course",
//     status: "Active"
//   }
// ];

const DraggableBodyRow = ({ index, moveRow, ...restProps }) => {
  const [, drop] = useDrop({
    accept: "table-row",
    hover: (item, monitor) => {
      if (!restProps.draggable) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Không thay thế các mục với chính chúng
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = monitor.getClientOffset();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "table-row",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  return (
    <tr ref={(node) => drag(drop(node))} style={{ opacity }} {...restProps} />
  );
};

function TableBanner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const LIMIT = 10;


  const moveRow = (dragIndex, hoverIndex) => {
    const newData = [...data];
    const draggedRow = newData[dragIndex];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedRow);

    setData(newData);
  };

  const [data, setData] = useState([
    {
      id: 1,
      thumbnail: "images",
      banner_name: "Banner Khóa Học Online",
      link: "http://localhost:5173/course-banner",
      status: "Active"
    },
    {
      id: 2,
      thumbnail: "images",
      banner_name: "Banner Học Phần Frontend",
      link: "http://localhost:5173/frontend-course",
      status: "Active"
    },
    {
      id: 3,
      thumbnail: "images",
      banner_name: "Banner Khóa Học Python",
      link: "http://localhost:5173/python-course",
      status: "Active"
    }
    , {
      id: 4,
      thumbnail: "images",
      banner_name: "Banner Khóa Học Java",
      link: "http://localhost:5173/java-course",
      status: "Active"
    }
  ]);

  const columns = useMemo(
    () => [
      {
        title: "Banner",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
              {/* Image here */}
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.banner_name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "ID",
        key: "id",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item.id}</div>
        ),
      },
      {
        title: "Link",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.link}
          </div>
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
    <DndProvider backend={HTML5Backend}>
      <div className="border rounded-lg">
        <Table
          components={{
            body: {
              row: (props) => <DraggableBodyRow draggable moveRow={moveRow} {...props} />,
            },
          }}
          columns={columns}
          data={data.map((item, index) => ({ ...item, index }))}
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
    </DndProvider>
  );
}
export default TableBanner;