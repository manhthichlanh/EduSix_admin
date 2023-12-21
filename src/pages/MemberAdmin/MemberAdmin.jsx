import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "@headlessui/react";
import Filter from "../../components/common/icon/Filter";
import Search from "../../components/Search/Search";
import TableMemberAdmin from "../../components/Table/Member/TableMemberAdmin";
import Button from "../../components/Button/Button";
export default function Home() {
  return (
    <div className="px-6 py-6 max-h-full">
      <div className="items-end justify-between mb-6">
        {/* Breadcrumbs */}
        <div className="">
          <div className="text-2xl font-medium pb-4">Danh sách admin</div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Danh sách admin</p>
          </div>

        </div>
      </div>
      {/* filter button*/}
      <div className="w-full">
        <div className="flex justify-between ">
          <div className="w-1/3">
            <Search></Search>
          </div>
          <div className="flex">
            <a href="/create-account">
              <Button
                text={"Tạo admin"}
                Class={
                  "flex font-medium items-center bg-indigo-500 hover-bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
                }
                onClick={() => console.log("You are my dream")}
              />
            </a>

            <Menu as="div" className="relative inline-block text-left pl-3">

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


        </div>
        <div className="mt-6">
          <TableMemberAdmin></TableMemberAdmin>
        </div>
      </div>
    </div>
  );
}
