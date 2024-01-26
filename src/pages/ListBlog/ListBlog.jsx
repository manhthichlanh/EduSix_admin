import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { Menu } from "@headlessui/react";
import Filter from "../../components/common/icon/Filter";
import Search from "../../components/Search/Search";
import TableBanner from "../../components/Table/TableBanner";
import { Link, useSearchParams } from "react-router-dom";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import TableBlog from "../../components/Table/Blog/TableBlogList";
import { ServerApi } from '../../utils/http';
import { useQuery } from 'react-query';
export default function ListAuthor() {

  const getBlogData = async () => {
    try {
      const response = await ServerApi.get("/blog");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching author data");
    }
  };

  const { data: blogData, isLoading, isError } = useQuery("blogData", getBlogData);
console.log(blogData);

  return (
    <div className="px-6 py-6 max-h-full">
      <div className="items-end justify-between mb-6 xl:flex lg:flex md:flex sm:flex">
        {/* Breadcrumbs */}
        <div className="">
          <div className="text-2xl font-medium pb-4">Danh sách blog</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Danh sách blog</p>
          </div>
        </div>
        <div className="flex gap-2 whitespace-nowrap mt-4 sm:mb-0 sm:mt-4 sm:justify-end">
          <Link to="/add-blog">
            <Button
              text={"Thêm blog"}
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
            />
          </Link>
        </div>
      </div>
      {/* filter button*/}
      <div className="w-full">
        <div className="flex justify-between ">
          <div className="w-1/3">
            <Search></Search>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="px-4 py-2 border rounded-lg flex items-center gap-2">
              <Filter></Filter>
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
        <div className="border rounded-lg mt-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading data</p>
        ) : (
          <TableBlog data={blogData} />
        )}
      </div>

      </div>
    </div>
  );
}
