// import { io } from "socket.io-client";
// import TableWiget from "../../components/OrderBookTable/TableWiget";
// import InputText from "../../components/input/input-text";
// import InputNumber from "../../components/input/input-number";
// import InputSelect from "../../components/input/input-select";
// import InputDescription from "../../components/input/input-description";
// import { useState } from "react";
import Table from "../../components/Table/Table";
export default function Home() {
  return (
    <div>
      <div className="flex justify-center m-6">
        <div className="w-full p-4 mr-6 bg-white border-2 rounded-lg">
          <svg
            className="mb-2"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#DEDEFA" />
            <path
              d="M23.9666 18.4475C24.3519 18.0517 24.3433 17.4186 23.9475 17.0334C23.5517 16.6482 22.9186 16.6568 22.5334 17.0525L19.2737 20.4017L17.8755 19.2809C17.4446 18.9354 16.8152 19.0047 16.4698 19.4356C16.1244 19.8666 16.1936 20.4959 16.6246 20.8414L19.0857 22.8143C19.2867 22.9754 19.5771 22.9575 19.7567 22.7729L23.9666 18.4475Z"
              fill="#5C59E8"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 15C10 13.3431 11.3431 12 13 12H27C28.6569 12 30 13.3431 30 15V25C30 26.6569 28.6569 28 27 28H13C11.3431 28 10 26.6569 10 25V15ZM26.1707 14H27C27.5523 14 28 14.4477 28 15V15.8293C27.1476 15.528 26.472 14.8524 26.1707 14ZM24.1 14H15.9C15.5023 15.9591 13.9591 17.5023 12 17.9V22.1C13.9591 22.4977 15.5023 24.0409 15.9 26H24.1C24.4977 24.0409 26.0409 22.4977 28 22.1V17.9C26.0409 17.5023 24.4977 15.9591 24.1 14ZM28 24.1707C27.1476 24.472 26.472 25.1476 26.1707 26H27C27.5523 26 28 25.5523 28 25V24.1707ZM13.8293 26C13.528 25.1476 12.8524 24.472 12 24.1707V25C12 25.5523 12.4477 26 13 26H13.8293ZM12 15.8293C12.8524 15.528 13.528 14.8524 13.8293 14H13C12.4477 14 12 14.4477 12 15V15.8293Z"
              fill="#5C59E8"
            />
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="18"
              stroke="#EFEFFD"
              strokeWidth="4"
            />
          </svg>
          <p className="mb-2 text-left text-gray-500 ">Doanh thu</p>
          <p className="text-2xl font-medium text-left">1.200.000 VND</p>
        </div>
        <div className="w-full p-4 mr-6 bg-white border-2 rounded-lg">
          <svg
            className="mb-2"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#CFE7DC" />
            <path
              d="M16 22C16 21.4477 16.4477 21 17 21H23C23.5523 21 24 21.4477 24 22C24 22.5523 23.5523 23 23 23H17C16.4477 23 16 22.5523 16 22Z"
              fill="#0D894F"
            />
            <path
              d="M17 17.5C16.4477 17.5 16 17.9477 16 18.5C16 19.0523 16.4477 19.5 17 19.5H23C23.5523 19.5 24 19.0523 24 18.5C24 17.9477 23.5523 17.5 23 17.5H17Z"
              fill="#0D894F"
            />
            <path
              d="M16 25.5C16 24.9477 16.4477 24.5 17 24.5H23C23.5523 24.5 24 24.9477 24 25.5C24 26.0523 23.5523 26.5 23 26.5H17C16.4477 26.5 16 26.0523 16 25.5Z"
              fill="#0D894F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10C16.8954 10 16 10.8954 16 12L15 12C13.3431 12 12 13.3431 12 15V27C12 28.6569 13.3431 30 15 30H25C26.6569 30 28 28.6569 28 27V15C28 13.3431 26.6569 12 25 12H24C24 10.8954 23.1046 10 22 10H18ZM22 12H18V14H22V12ZM16 14H15C14.4477 14 14 14.4477 14 15V27C14 27.5523 14.4477 28 15 28H25C25.5523 28 26 27.5523 26 27V15C26 14.4477 25.5523 14 25 14H24C24 15.1046 23.1046 16 22 16H18C16.8954 16 16 15.1046 16 14Z"
              fill="#0D894F"
            />
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="18"
              stroke="#E7F4EE"
              strokeWidth="4"
            />
          </svg>
          <p className="mb-2 text-left text-gray-500 ">Số khóa học</p>
          <p className="text-2xl font-medium text-left">200</p>
        </div>
        <div className="w-full p-4 mr-6 bg-white border-2 rounded-lg">
          <svg
            className="mb-2"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#FCDAD7" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.5 14.5C24.5 16.9853 22.4853 19 20 19C17.5147 19 15.5 16.9853 15.5 14.5C15.5 12.0147 17.5147 10 20 10C22.4853 10 24.5 12.0147 24.5 14.5ZM22.5 14.5C22.5 15.8807 21.3807 17 20 17C18.6193 17 17.5 15.8807 17.5 14.5C17.5 13.1193 18.6193 12 20 12C21.3807 12 22.5 13.1193 22.5 14.5Z"
              fill="#F04438"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 26.9231C11 23.0996 14.0996 20 17.9231 20H22.0769C25.9004 20 29 23.0996 29 26.9231C29 28.0701 28.0701 29 26.9231 29H13.0769C11.9299 29 11 28.0701 11 26.9231ZM13 26.9231C13 24.2041 15.2041 22 17.9231 22H22.0769C24.7959 22 27 24.2041 27 26.9231C27 26.9656 26.9656 27 26.9231 27H13.0769C13.0344 27 13 26.9656 13 26.9231Z"
              fill="#F04438"
            />
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="18"
              stroke="#FEEDEC"
              strokeWidth="4"
            />
          </svg>
          <p className="mb-2 text-left text-gray-500 ">Người dùng</p>
          <p className="text-2xl font-medium text-left">1000</p>
        </div>
        <div className="w-full p-4 bg-white border-2 rounded-lg">
          <svg
            className="mb-2"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#FAE1CF" />
            <path
              d="M14 24C14 23.4477 14.4477 23 15 23H17C17.5523 23 18 23.4477 18 24C18 24.5523 17.5523 25 17 25H15C14.4477 25 14 24.5523 14 24Z"
              fill="#E46A11"
            />
            <path
              d="M15 19C14.4477 19 14 19.4477 14 20C14 20.5523 14.4477 21 15 21H21C21.5523 21 22 20.5523 22 20C22 19.4477 21.5523 19 21 19H15Z"
              fill="#E46A11"
            />
            <path
              d="M14 16C14 15.4477 14.4477 15 15 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H15C14.4477 17 14 16.5523 14 16Z"
              fill="#E46A11"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 15C10 12.7909 11.7909 11 14 11H22C24.2091 11 26 12.7909 26 15V18H27C28.6569 18 30 19.3431 30 21V26C30 27.6569 28.6569 29 27 29H14C11.7909 29 10 27.2091 10 25V15ZM27 27C27.5523 27 28 26.5523 28 26V21C28 20.4477 27.5523 20 27 20H26V26C26 26.5523 26.4477 27 27 27ZM24 26C24 26.3506 24.0602 26.6872 24.1707 27H14C12.8954 27 12 26.1046 12 25V15C12 13.8954 12.8954 13 14 13H22C23.1046 13 24 13.8954 24 15V26Z"
              fill="#E46A11"
            />
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="18"
              stroke="#FDF1E8"
              strokeWidth="4"
            />
          </svg>
          <p className="mb-2 text-left text-gray-500 ">Bài viết</p>
          <p className="text-2xl font-medium text-left">2000</p>
        </div>
      </div>
      <Table></Table>
    </div>
  );
}
