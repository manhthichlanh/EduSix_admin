import { Link, useSearchParams } from "react-router-dom";
import { filter, map } from "lodash";
import classNames from "classnames";
import { useQuery } from "react-query";
import { ServerApi } from "../../utils/http";
import { Fragment, useState } from "react";
import { convertViToEn } from "../../utils/helper";
import SearchIcon from "../../components/common/icon/SearchIcon";
import Input from "../../components/Input/Input";
import ChevronUp from "./../../components/common/icon/ChevronUp";
import ChevronDown from "./../../components/common/icon/ChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { Listbox, Transition } from "@headlessui/react";
import TableCourse from "../../components/Table/Course/TableCourse";

const filterItems = [
  { id: 1, title: "Mặc định" },
  {
    id: 2,
    title: "Giá: từ thấp đến cao",
  },
  {
    id: 3,
    title: "Giá: từ cao đến thấp",
  },
  {
    id: 4,
    title: "Từ A - Z",
  },
  {
    id: 5,
    title: "Từ Z - A",
  },
  {
    id: 6,
    title: "Mới nhất",
  },
  { id: 7, title: "Cũ nhất" },
];

export default function Home() {
  const getCourseData = async () => {
    try {
      const response = await ServerApi.get("/course");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching course data");
    }
  };

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery("courseData", getCourseData);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(filterItems[0]);

  const filteredCourses = filter(courseData, (course) => {
    const nameMatches = convertViToEn(course.name).includes(
      convertViToEn(searchQuery)
    );
    return nameMatches;
  }).sort((a, b) => {
    switch (selectedFilter.id) {
      case 2:
        return a.course_price - b.course_price;
      case 3:
        return b.course_price - a.course_price;
      case 4:
        return a.name.localeCompare(b.name);
      case 5:
        return b.name.localeCompare(a.name);
      case 6:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 7:
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return 0;
    }
  });

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleFilterChange = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
  };

  const [searchParams] = useSearchParams();
 

  return (
    <div className="max-h-full px-6 py-6">
      <div className="items-end justify-between mb-6 xl:flex lg:flex md:flex sm:flex">
        {/* Breadcrumbs */}
        <div className="">
          <div className="pb-4 text-2xl font-medium">Danh sách khóa học</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Danh sách khóa học</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 whitespace-nowrap sm:mb-0 sm:mt-4 sm:justify-end">
          <Link to="/add-course">
            <Button
              text={"Thêm khóa học"}
              Class={
                "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
              }
              Icon={function Icon() {
                return (
                  <svg
                    className="pr-2 "
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
                    <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
                  </svg>
                );
              }}
              onClick={() => {
                console.log("hello");
              }}
            />
          </Link>
        </div>
      </div>
      {/* filter button*/}
      <div className="w-full ">
        <div className="flex justify-between ">
          <div className="w-1/3">
            <div
              className={classNames(
                "relative, flex items-center w-full h-16 border-2 rounded-lg bg-white overflow-hidden",
                "focus-within:shadow-lg"
              )}
            >
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <SearchIcon></SearchIcon>
              </div>
              <Input
                className="h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                placeholder="Search something.."
                onChange={handleSearchInputChange}
                value={searchQuery}
              ></Input>
            </div>
          </div>

          <div className="w-1/3">
            <Listbox value={selectedFilter} onChange={handleFilterChange}>
              <div className="relative mt-1">
                <Listbox.Button
                  className={classNames(
                    "relative w-full cursor-default rounded-lg bg-white py-2 pl-6 pr-10 text-left shadow-md",
                    "focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300",
                    "sm:text-sm"
                  )}
                >
                  <span className="block truncate">{selectedFilter.title}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className={classNames(
                      "absolute mt-1 py-1 max-h-60 w-full rounded-md bg-white shadow-lg overflow-auto ring-1 ring-black/5",
                      "focus:outline-none sm:text-sm"
                    )}
                  >
                    {map(filterItems, (item) => (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-[#FDF1E8] text-black" : "text-gray-900"
                          }`
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.title}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D3620F]">
                                <ChevronUp className="h-5 w-5 rotate-90" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="mt-6 border rounded-lg">
          <TableCourse
            data={filteredCourses}
            
            total={filteredCourses.length}
          
          ></TableCourse>
        </div>
      </div>
    </div>
  );
}
