import TableFiveCols from "../../components/Table/TableFiveCols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import TableMember from "../../components/Table/TableMember";
export default function Home() {
    return (
        <div>
            <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
                {/* Breadcrumbs */}
                <div className="mt-6">
                    <div className="text-2xl font-medium pb-2">Thông tin chi tiết</div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                        <a href="/" className="text-indigo-500 text">
                            Trang chủ
                        </a>
                        <FontAwesomeIcon icon={faAngleRight} className="" />
                        <a href="/member" className="text-indigo-500 text">
                            Danh sách thành viên
                        </a>
                        <FontAwesomeIcon icon={faAngleRight} className="" />
                        <p className="">Chi tiết tài khoản</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-1/3 my-6 ml-6">Cái cục thông tin màu xanh ở đây</div>
                <div className="w-2/3">
                    <div className="grid gap-6 m-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <Card
                            Icon={function Icon() {
                                return (
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="2"
                                            y="2"
                                            width="36"
                                            height="36"
                                            rx="18"
                                            fill="#DEDEFA"
                                        />
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
                                );
                            }}
                            title="Tổng số tiền đã mua"
                            content="10.000.000"
                            unit="VND"
                        ></Card>
                        <Card
                            Icon={function Icon() {
                                return (
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="36" height="36" rx="18" fill="#D0F0FA" />
                                        <path d="M16 22C16 21.4477 16.4477 21 17 21H23C23.5523 21 24 21.4477 24 22C24 22.5523 23.5523 23 23 23H17C16.4477 23 16 22.5523 16 22Z" fill="#13B2E4" />
                                        <path d="M17 17.5C16.4477 17.5 16 17.9477 16 18.5C16 19.0523 16.4477 19.5 17 19.5H23C23.5523 19.5 24 19.0523 24 18.5C24 17.9477 23.5523 17.5 23 17.5H17Z" fill="#13B2E4" />
                                        <path d="M16 25.5C16 24.9477 16.4477 24.5 17 24.5H23C23.5523 24.5 24 24.9477 24 25.5C24 26.0523 23.5523 26.5 23 26.5H17C16.4477 26.5 16 26.0523 16 25.5Z" fill="#13B2E4" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C16.8954 10 16 10.8954 16 12L15 12C13.3431 12 12 13.3431 12 15V27C12 28.6569 13.3431 30 15 30H25C26.6569 30 28 28.6569 28 27V15C28 13.3431 26.6569 12 25 12H24C24 10.8954 23.1046 10 22 10H18ZM22 12H18V14H22V12ZM16 14H15C14.4477 14 14 14.4477 14 15V27C14 27.5523 14.4477 28 15 28H25C25.5523 28 26 27.5523 26 27V15C26 14.4477 25.5523 14 25 14H24C24 15.1046 23.1046 16 22 16H18C16.8954 16 16 15.1046 16 14Z" fill="#13B2E4" />
                                        <rect x="2" y="2" width="36" height="36" rx="18" stroke="#E8F8FD" stroke-width="4" />
                                    </svg>
                                );
                            }}
                            title="Khóa học đã tham gia"
                            content="100"
                        ></Card>
                        <Card
                            Icon={function Icon() {
                                return (
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="36" height="36" rx="18" fill="#CFE7DC" />
                                        <path d="M23.9666 18.4475C24.3519 18.0517 24.3433 17.4186 23.9475 17.0334C23.5517 16.6482 22.9186 16.6568 22.5334 17.0525L19.2737 20.4017L17.8755 19.2809C17.4446 18.9354 16.8152 19.0047 16.4698 19.4356C16.1244 19.8666 16.1936 20.4959 16.6246 20.8414L19.0857 22.8143C19.2867 22.9754 19.5771 22.9575 19.7567 22.7729L23.9666 18.4475Z" fill="#0D894F" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6094 10.3453C19.3847 9.5952 20.6152 9.5952 21.3905 10.3453L22.7193 11.6307L24.5498 11.3718C25.618 11.2207 26.6135 11.944 26.7999 13.0065L27.1193 14.8275L28.7524 15.694C29.7054 16.1996 30.0856 17.3699 29.6119 18.3391L28.7999 20L29.6119 21.661C30.0856 22.6301 29.7054 23.8004 28.7524 24.306L27.1193 25.1725L26.7999 26.9935C26.6135 28.056 25.618 28.7793 24.5498 28.6282L22.7193 28.3693L21.3905 29.6547C20.6152 30.4048 19.3847 30.4048 18.6094 29.6547L17.2806 28.3693L15.45 28.6282C14.3819 28.7793 13.3864 28.056 13.2 26.9935L12.8806 25.1725L11.2475 24.306C10.2945 23.8004 9.91426 22.6301 10.388 21.661L11.1999 20L10.388 18.3391C9.91426 17.3699 10.2945 16.1996 11.2475 15.694L12.8806 14.8275L13.2 13.0065C13.3864 11.944 14.3819 11.2207 15.45 11.3718L17.2806 11.6307L18.6094 10.3453ZM19.9999 11.7827L22.0314 13.7479L24.8299 13.3521L25.3183 16.136L27.8151 17.4607L26.5738 20L27.8151 22.5393L25.3183 23.864L24.8299 26.6479L22.0314 26.2521L19.9999 28.2173L17.9685 26.2521L15.1699 26.6479L14.6816 23.864L12.1848 22.5393L13.4261 20L12.1848 17.4607L14.6816 16.136L15.1699 13.3521L17.9685 13.7479L19.9999 11.7827Z" fill="#0D894F" />
                                        <rect x="2" y="2" width="36" height="36" rx="18" stroke="#E7F4EE" stroke-width="4" />
                                    </svg>
                                );
                            }}
                            title="Khóa học đã hoàn thành"
                            content="1504"
                        ></Card>
                    </div>
                    <TableMember
                        title={"Thống kê"}
                        column1Title="Order Id"
                        column2Title="Khóa học"
                        column3Title="Giá"
                        column4Title={"Trạng thái"}
                        column5Title="Thời gian"
                    ></TableMember>
                </div>
            </div>

        </div>
    );
}
