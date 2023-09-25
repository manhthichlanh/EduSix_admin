import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Tab, Menu } from "@headlessui/react";
import FilterIcon from "../../components/common/icon/FilterIcon";
import { Fragment } from "react";
import TableOrder from "../../components/Table/TableOrder";
export default function Home() {
  return (
    <div className="px-6 py-6 max-h-full">
      <p className="font-semibold text-2xl">Danh sách mua</p>
      {/* Breadcrumbs-Button */}
      <div className="my-4 flex justify-between items-center">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <a href="/" className="text-indigo-500 text">
            Trang chủ
          </a>
          <FontAwesomeIcon icon={faAngleRight} className="" />
          <p className="">Danh sách mua</p>
        </div>
      </div>
      {/* filter button*/}
      <div className="w-full">
        <div className="flex justify-between">
          <div className="border rounded-lg px-2">
            <Tab.Group className="py-2">
              <Tab.List className="flex items-center rounded-md gap-2">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "bg-blue-200 text-[#4543AE] font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                          : " text-gray-400 font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                      }
        transition hover:bg-[#EFEFFD] hover:text-[#5C59E8]
      `}
                    >
                      1 Ngày
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "bg-blue-200 text-[#4543AE] font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                          : " text-gray-400 font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                      }
        transition hover:bg-[#EFEFFD] hover:text-[#5C59E8]
      `}
                    >
                      1 Tuần
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "bg-blue-200 text-[#4543AE] font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                          : " text-gray-400 font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                      }
        transition hover:bg-[#EFEFFD] hover:text-[#5C59E8]
      `}
                    >
                      1 Tháng
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "bg-blue-200 text-[#4543AE] font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                          : " text-gray-400 font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                      }
        transition hover:bg-[#EFEFFD] hover:text-[#5C59E8]
      `}
                    >
                      1 Năm
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "bg-blue-200 text-[#4543AE] font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                          : " text-gray-400 font-semibold outline-none rounded-md inline-block px-2 py-1 whitespace-nowrap"
                      }
        transition hover:bg-[#EFEFFD] hover:text-[#5C59E8]
      `}
                    >
                      Tất cả
                    </button>
                  )}
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="px-4 py-2 border rounded-lg flex items-center gap-2">
              <FilterIcon></FilterIcon>
              <p className="text-lg font-medium">Lọc</p>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 space-y-2 w-48 border bg-white border-gray-200 rounded-md shadow-lg origin-right">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`block px-4 py-2 rounded-md ${
                      active ? "bg-blue-500 text-white" : "text-gray-700"
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
                    className={`block px-4 py-2 rounded-md ${
                      active ? "bg-blue-500 text-white" : "text-gray-700"
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
        <div className="mt-6">
          <TableOrder></TableOrder>
        </div>
      </div>
    </div>
  );
}
