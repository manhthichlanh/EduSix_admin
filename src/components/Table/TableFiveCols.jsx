import React from "react";
import Button from "../button/Button"; // Đảm bảo bạn đã import Button hoặc sửa thành phần Button nếu cần

const data = [
  {
    course: "HTML, CSS",
    sku: "00001",
    lesson: "1000",
    views: "10000",
    price: "0",
    status: "inactive",
  },
  {
    course: "JavaScript",
    sku: "00002",
    lesson: "800",
    views: "150",
    price: "1.200.000",
    status: "inactive",
  },
  {
    course: "ReactJS",
    sku: "00003",
    lesson: "1200",
    views: "200",
    price: "0",
    status: "active",
  },
  {
    course: "AngularJS",
    sku: "00004",
    lesson: "1200",
    views: "200",
    price: "1.000.000",
    status: "active",
  },
];

function TableFiveCols({
  title,
  column1Title,
  column2Title,
  column3Title,
  column4Title,
  column5Title,
}) {
  return (
    <div className="m-6 border rounded-lg">
      <div className="flex items-center justify-between px-6 py-4 ">
        <div className="text-lg font-bold">{title}</div>

        <Button
          text={"Lọc"}
          Icon={function Icon() {
            return (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8C13 8.55228 13.4477 9 14 9C14.5523 9 15 8.55228 15 8V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H15V4C15 3.44772 14.5523 3 14 3C13.4477 3 13 3.44772 13 4V8Z"
                  fill="#17163A"
                />
                <path
                  d="M3 12C3 11.4477 3.44772 11 4 11H5.5C5.77614 11 6 11.2239 6 11.5V12.5C6 12.7761 5.77614 13 5.5 13H4C3.44772 13 3 12.5523 3 12Z"
                  fill="#17163A"
                />
                <path
                  d="M9 9C8.44772 9 8 9.44772 8 10V14C8 14.5523 8.44772 15 9 15C9.55228 15 10 14.5523 10 14V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H10V10C10 9.44772 9.55228 9 9 9Z"
                  fill="#17163A"
                />
                <path
                  d="M3 6C3 5.44772 3.44772 5 4 5H10.5C10.7761 5 11 5.22386 11 5.5V6.5C11 6.77614 10.7761 7 10.5 7H4C3.44772 7 3 6.55228 3 6Z"
                  fill="#17163A"
                />
                <path
                  d="M15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16V17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H17V20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20V16Z"
                  fill="#17163A"
                />
                <path
                  d="M3 18C3 17.4477 3.44772 17 4 17H12.5C12.7761 17 13 17.2239 13 17.5V18.5C13 18.7761 12.7761 19 12.5 19H4C3.44772 19 3 18.5523 3 18Z"
                  fill="#17163A"
                />
              </svg>
            );
          }}
          Class={
            "flex items-center font-medium gap-3 px-3 py-3 transition duration-300 bg-transparent border-solid border-2 rounded-lg hover:drop-shadow-lg"
          }
        ></Button>
      </div>
      <table className="w-full mb-4 table-auto">
        <thead className="bg-neutral-100">
          <tr className="font-sans rounded-lg">
            <td className="px-6 py-4 font-medium">{column1Title}</td>
            <td className="px-6 py-4 font-medium">{column2Title}</td>
            <td className="px-6 py-4 font-medium">{column3Title}</td>
            <td className="px-6 py-4 font-medium">{column4Title}</td>
            <td className="px-6 py-4 font-medium">{column5Title}</td>
          </tr>
        </thead>
        <tbody className="rounded-xl">
          {data.map((item, index) => (
            <tr
              key={index}
              className="transition border-t-2 border-b-2 hover:bg-neutral-100"
            >
              <td className="flex items-start px-6 py-4">
                <div>
                  <div className="text-base font-medium">{item.course}</div>
                  <div className="mt-1 text-medium text-stone-400">
                    SKU: {item.sku}
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 font-medium text-gray-500 ">
                {item.lesson}
              </td>
              <td className="px-6 py-6 font-medium text-gray-500">
                {item.views}
              </td>
              <td
                className={`px-6 py-6 font-bold min-h-60 ${
                  item.price === "0" ? "text-gray-500" : "text-red-500"
                }`}
              >
                {item.price === "0" ? "Miễn phí" : item.price}
              </td>
              <td className="px-6 py-6">
                <p
                  className={`py-1 px-2 inline-block font-medium ${
                    item.status === "active"
                      ? "text-green-600 bg-gray-200"
                      : "text-red-700 bg-gray-200"
                  } rounded-lg`}
                >
                  {item.status === "active" ? "Activated" : "Inactivate"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-6 py-2 space-x-2">
        <div className="font-medium text-gray-500">Showing 1-5 from 15</div>
        <div className="flex justify-between gap-2 mx-auto">
          <Button
            Icon={function Icon() {
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.43934 12.3536C7.24408 12.1583 7.24408 11.8417 7.43934 11.6464L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289Z"
                    fill="#2563eb"
                  />
                </svg>
              );
            }}
            Class={
              "px-3 py-3 font-medium bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-indigo-100 transition ease-in-out text-indigo-500 rounded-lg"
            }
          ></Button>
          <Button
            text={1}
            Class={
              "px-4 py-2 font-medium bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-indigo-100 transition ease-in-out text-indigo-500 rounded-lg"
            }
          ></Button>
          <Button
            text={2}
            Class={
              "px-4 py-2 font-medium bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-indigo-100 transition ease-in-out text-indigo-500 rounded-lg"
            }
          ></Button>
          <Button
            text={3}
            Class={
              "px-4 py-2 font-medium bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-indigo-100 transition ease-in-out text-indigo-500 rounded-lg"
            }
          ></Button>
          <Button
            Icon={function Icon() {
              return (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.5607 12.3536C16.7559 12.1583 16.7559 11.8417 16.5607 11.6464L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z"
                    fill="#2563eb"
                  />
                </svg>
              );
            }}
            Class={
              "px-3 py-3 font-medium bg-indigo-100 hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-indigo-100 transition ease-in-out text-indigo-500 rounded-lg"
            }
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default TableFiveCols;
