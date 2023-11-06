
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { useQuery } from "react-query";
import { ServerApi, serverEndpoint } from "../../../utils/http";
import Pencil from "../../common/icon/Pencil";
import Trash from "../../common/icon/Trash";
import Add from "../../common/icon/Add";

function TableCourse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 5; // Set the limit to 5 items per page

  // Define a query function to fetch course data
  const getCourseData = async () => {
    try {
      const response = await ServerApi.get("/course");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching course data");
    }
  };


  // Use React Query to fetch and manage course data
  const { data: courseData, isLoading, isError } = useQuery("courseData", getCourseData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  // Check if courseData is defined before slicing
  if (!courseData) {
    return null; // or return a loading message
  }

  // Calculate the start and end indexes for the current page
  const startIndex = (page - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const displayedData = courseData.slice(startIndex, endIndex);
  const columns = [
    {
      title: "Course",
      key: "name",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-300 rounded-lg">
            <img className="w-12 h-12" src={`${serverEndpoint}course/thumbnail/${item.thumbnail}`} />
          </div>
          <div>
            <p className="capitalize font-medium text-base leading-[20px]">
              {item.name}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "ID",
      key: "course_id",
      render: (item) => (
        <div className="py-1 text-[#5C59E8] font-medium">{item.course_id}</div>
      ),
    },
    {
      title: "Category",
      key: "category_id",
      render: (item) => (
        <div className="py-1 text-[#667085] font-medium">
          {item.category_id}
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (item) => (
        <span
          className={`font-medium tracking-[0.5%] leading-[18px] ${item.type === 0
            ? "text-emerald-600"
            : item.type === 2
              ? "text-red-500"
              : ""
            }`}
        >
          {item.type === 0
            ? "Free"
            : item.type === 1
              ? `${Number(item.price).toLocaleString("vi-VN")}đ`
              : "N/A"}
        </span>
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
      title: "Duration",
      key: "total_course_time",
      render: (item) => (
        <div className="py-1 font-medium text-gray-500">
          {item.total_course_time}
        </div>
      ),
    },
    {
      title: "Date Added",
      key: "created_at",
      render: (item) => (
        <div className="py-1 font-medium text-gray-500">{item.created_at}</div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`/add-section?courseId=${item.course_id}&courseName=${item.name}`, {
                state: { courseName: item.name, courseId: item.course_id }, // Pass coursesName in state
              })
            }
          >
            <Add className="text-gray-500  hover:text-blue-500"></Add>
          </button>
          <button>
            <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
          </button>
          <button>
            <Trash className="text-gray-500  hover:text-red-500"></Trash>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={displayedData}
          rowKey={(record) => record.course_id + record.created_at}
          scroll={{
            x: true,
          }}
        />
      </div>
      <div className="flex items-center justify-end p-4">
        <Pagination
          limit={LIMIT}
          total={courseData.length}
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


export default TableCourse;
