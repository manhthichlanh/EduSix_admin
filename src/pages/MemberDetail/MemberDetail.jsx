import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import TableMemberDetail from "../../components/Table/Member/TableMemberDetail";
import MoneyIcon from "../../components/common/icon/MoneyIcon";
import BlogIconDetail from "../../components/common/icon/BlogIconDetail";
import CourseIcon from "../../components/common/icon/CourseIcon";
import CardDetail from "../../components/card/CardDetail";

export default function Home() {
  return (
    <div>
      <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        {/* Breadcrumbs */}
        <div className="mt-6">
          <div className="pb-2 text-2xl font-medium">Thông tin chi tiết</div>
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
      <div className="grid grid-cols-12 gap-6 px-6 py-4">
        {/* card */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <CardDetail
            name="BaoNgoc"
            userId="001"
            email="vuhuyduc2100@gmail.com"
            addTime="09/09/2023"
          ></CardDetail>
        </div>
        {/* table */}
        <div className="col-span-full xl:col-span-8 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6 pb-4">
            <div className="col-span-full xl:col-span-4 lg:col-span-6 sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <MoneyIcon></MoneyIcon>;
                }}
                title={"Doanh thu"}
                content={`${Number(1000000).toLocaleString("vi-VN")} VND`}
              ></Card>
            </div>
            <div className="col-span-full xl:col-span-4 lg:col-span-6 sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <BlogIconDetail></BlogIconDetail>;
                }}
                title={"Khóa học đang tham gia"}
                content={"10"}
                // content={`${Number(1000000).toLocaleString("vi-VN")} VND`}
              ></Card>
            </div>
            <div className="col-span-full xl:col-span-4 lg:col-span-12 sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <CourseIcon></CourseIcon>;
                }}
                title={"Khóa học đã hoàn thành"}
                content={"11"}
              ></Card>
            </div>
          </div>
          <div className="mt-2 border rounded-lg">
            <TableMemberDetail></TableMemberDetail>
          </div>
        </div>
      </div>
    </div>
  );
}
