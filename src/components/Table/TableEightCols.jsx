import React from "react";
import Button from "./../button/Button";

function TableEightCols({
  column1Title,
  column2Title,
  column3Title,
  column4Title,
  column5Title,
  column6Title,
  column7Title,
  column8Title,
}) {
  const data = [
    {
      course: "Học ăn",
      id: "00001",
      category: "Marketing",
      lessons: "10",
      price: "1.200.000",
      status: "active",
      time: "30 giờ",
    },
    {
      course: "Học nói",
      id: "00002",
      category: "HTML, CSS",
      lessons: "20",
      price: "2.500.000",
      status: "inactive",
      time: "40 giờ",
    },
    {
      course: "Học gói",
      id: "00003",
      category: "Social Skill",
      lessons: "15",
      price: "0",
      status: "active",
      time: "35 giờ",
    },
    {
      course: "Học mở lời yêu em",
      id: "00004",
      category: "Social Skill",
      lessons: "18",
      price: "0",
      status: "inactive",
      time: "38 giờ",
    },
    {
      course:
        "Ngày tôi rời đi, tôi chỉ là 1 chàng trai. Khi tôi trở về tôi sẽ là 1 người đàn ông. Lúc đó chúng ta đừng làm bạn nhau nữa, làm người yêu nhau đi.",
      id: "00005",
      category: "Html, css",
      lessons: "11",
      price: "10",
      status: "inactive",
      time: "38 giờ",
    },
  ];

  return (
    <div className="flex flex-col px-6">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y table-auto">
              <thead className="bg-neutral-100">
                <tr className="font-sans rounded-lg whitespace-nowrap">
                  <td className="px-6 py-4 font-medium">{column1Title}</td>
                  <td className="px-6 py-4 font-medium">{column2Title}</td>
                  <td className="px-6 py-4 font-medium">{column3Title}</td>
                  <td className="px-6 py-4 font-medium">{column4Title}</td>
                  <td className="px-6 py-4 font-medium">{column5Title}</td>
                  <td className="px-6 py-4 font-medium">{column6Title}</td>
                  <td className="px-6 py-4 font-medium">{column7Title}</td>
                  <td className="px-6 py-4 font-medium">{column8Title}</td>
                </tr>
              </thead>
              <tbody className="rounded-xl">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="transition border-t-2 border-b-2 hover:bg-neutral-100 whitespace-nowrap"
                  >
                    <td className="px-6 py-6 font-medium text-gray-500 whitespace-nowrap sm:whitespace-normal">
                      {item.course}
                    </td>
                    <td className="px-6 py-6 font-bold text-blue-500 whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-500 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-500 whitespace-nowrap">
                      {item.lessons}
                    </td>
                    <td
                      className={`px-6 py-6 font-bold min-h-60 whitespace-nowrap ${
                        item.price === "0" ? "text-gray-500" : "text-red-500"
                      }`}
                    >
                      {item.price === "0" ? "Miễn phí" : item.price}
                    </td>
                    <td className="px-6 py-6">
                      <p
                        className={`py-1 px-2 inline-block justify-center items-center font-medium whitespace-nowrap ${
                          item.status === "active"
                            ? "text-emerald-600 bg-gray-200"
                            : "text-red-600 bg-gray-200"
                        } rounded-lg`}
                      >
                        {item.status === "active" ? "Đang bật" : "Đang tắt"}
                      </p>
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-500 whitespace-nowrap">
                      {item.time}
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          Icon={function Icon() {
                            return (
                              <svg
                                className="text-gray-500 fill-current hover:text-blue-400"
                                width="32"
                                height="32"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 1.25C7.68802 1.27789 5.47859 2.20872 3.84366 3.84366C2.20872 5.47859 1.27789 7.68802 1.25 10C1.27789 12.312 2.20872 14.5214 3.84366 16.1563C5.47859 17.7913 7.68802 18.7221 10 18.75C12.312 18.7221 14.5214 17.7913 16.1563 16.1563C17.7913 14.5214 18.7221 12.312 18.75 10C18.7221 7.68802 17.7913 5.47859 16.1563 3.84366C14.5214 2.20872 12.312 1.27789 10 1.25ZM15 10.625H10.625V15H9.375V10.625H5V9.375H9.375V5H10.625V9.375H15V10.625Z" />
                              </svg>
                            );
                          }}
                          onClick={() => console.log("Now I'm just a boy.")}
                        ></Button>
                        <Button
                          Icon={function Icon() {
                            return (
                              <svg
                                className="text-gray-500 fill-current hover:text-yellow-400"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M20.7656 8.18414C21.9372 7.01257 21.9372 5.11307 20.7656 3.9415L20.0585 3.23439C18.887 2.06282 16.9875 2.06282 15.8159 3.23439L4.42916 14.6211C4.01548 15.0348 3.73179 15.5604 3.61299 16.1333L2.80932 20.0085C2.66319 20.7131 3.28687 21.3368 3.99155 21.1907L7.86677 20.387C8.43962 20.2682 8.96523 19.9845 9.37892 19.5709L20.7656 8.18414ZM19.3514 5.35571L18.6443 4.64861C18.2538 4.25808 17.6206 4.25808 17.2301 4.64861L16.1694 5.7093L18.2907 7.83062L19.3514 6.76993C19.742 6.3794 19.742 5.74624 19.3514 5.35571ZM16.8765 9.24483L14.7552 7.12351L5.84337 16.0353C5.70548 16.1732 5.61092 16.3484 5.57132 16.5394L5.07698 18.923L7.46065 18.4287C7.6516 18.3891 7.82681 18.2945 7.9647 18.1567L16.8765 9.24483Z"
                                />
                              </svg>
                            );
                          }}
                          onClick={() =>
                            console.log("When I return, I will be a man.")
                          }
                        ></Button>
                        <Button
                          Icon={function () {
                            return (
                              <svg
                                className="text-gray-500 fill-current hover:text-red-600"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 9.75C10.5523 9.75 11 10.1977 11 10.75V16.75C11 17.3023 10.5523 17.75 10 17.75C9.44772 17.75 9 17.3023 9 16.75V10.75C9 10.1977 9.44772 9.75 10 9.75Z" />
                                <path d="M15 10.75C15 10.1977 14.5523 9.75 14 9.75C13.4477 9.75 13 10.1977 13 10.75V16.75C13 17.3023 13.4477 17.75 14 17.75C14.5523 17.75 15 17.3023 15 16.75V10.75Z" />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M18 6V5C18 3.34315 16.6569 2 15 2H9C7.34315 2 6 3.34315 6 5V6H4.5C3.94772 6 3.5 6.44772 3.5 7C3.5 7.55228 3.94772 8 4.5 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H19.5C20.0523 8 20.5 7.55228 20.5 7C20.5 6.44772 20.0523 6 19.5 6H18ZM15 4H9C8.44772 4 8 4.44772 8 5V6H16V5C16 4.44772 15.5523 4 15 4ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z"
                                />
                              </svg>
                            );
                          }}
                          onClick={() =>
                            console.log(
                              "Then stop being my friend and be my lover"
                            )
                          }
                        ></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-4 space-x-2">
              <div className="font-medium text-gray-500">
                Showing 1-5 from 15
              </div>
              <div className="flex justify-between gap-2 mx-auto">
                <Button
                  Icon={function Icon() {
                    return (
                      <svg
                        className="text-indigo-500 fill-current"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.43934 12.3536C7.24408 12.1583 7.24408 11.8417 7.43934 11.6464L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289Z"
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
                        className="text-indigo-500 transition-colors fill-current hover:text-white"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.5607 12.3536C16.7559 12.1583 16.7559 11.8417 16.5607 11.6464L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z"
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
        </div>
      </div>
    </div>
  );
}

export default TableEightCols;
