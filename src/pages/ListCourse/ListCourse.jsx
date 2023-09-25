import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { Menu } from "@headlessui/react";
import FilterIcon from "../../components/common/icon/FilterIcon";
import TableCourse from "../../components/Table/Course/TableCourse";
export default function Home() {
  return (
    <div className="px-6 py-6 max-h-full">

      <div className="items-end justify-between mb-6 xl:flex lg:flex md:flex sm:flex">
        {/* Breadcrumbs */}
        <div className="">
          <div className="text-2xl font-medium pb-4">Danh sách khóa học</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Danh sách khóa học</p>
          </div>
        </div>
        <div className="flex gap-2 whitespace-nowrap mt-4 sm:mb-0 sm:mt-4 sm:justify-end">
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
            onClick={() => console.log("You will be mine")}
          />
        </div>
      </div>
      {/* filter button*/}
      <div className="w-full ">
        <div className="flex justify-between ">
          <div className=''>
            <div className="relative flex items-center w-full h-12 border-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                placeholder="Search something.." />
            </div>
          </div>
          <Menu as="div" className=" relative inline-block text-left">
            <Menu.Button className="px-4 py-2 border rounded-lg flex items-center gap-2 bg-white ">
              <FilterIcon></FilterIcon>
              <p className="text-lg font-medium">Lọc</p>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 space-y-2 w-48 border bg-white border-gray-200 rounded-md shadow-lg origin-right">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700"
                      }`}
                    role="menuitem"
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-md ${active ? "bg-blue-500 text-white" : "text-gray-700"
                      }`}
                    role="menuitem"
                  >
                    Documentation
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
        <div className="mt-6 border rounded-lg">
          <TableCourse></TableCourse>
        </div>
      </div>
      {/* <TableMemberDetail></TableMemberDetail> */}
    </div>
  );
}
