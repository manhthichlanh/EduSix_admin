import Card from "../../components/Card/Card";
import TableIndex from "../../components/Table/TableIndex";

// import ToastMessage from "../../utils/alert";
import { Alert } from "@mui/material";
import { useEffect } from "react";

import CourseIcon from "../../components/common/icon/Cart/CourseIcon";
import UserIcon from "../../components/common/icon/Cart/UserIcon";
import BlogIcon from "../../components/common/icon/Cart/BlogIcon";
import CashIcon from "../../components/common/icon/Cart/CashIcon";

export default function Home() {
  // useEffect(() => {
  //   ToastMessage(`Chúc mừng bạn kẻ chiến thắng!`).warn();
  // }, []);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdParam = searchParams.get('userId');
    console.log(userIdParam)
  }, []);
  return (
    <div>
      <Alert severity="success" color="info">
        This is a success alert — check it out!
      </Alert>
      <div className="grid gap-4 m-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card
          Icon={function Icon() {
            return <CashIcon></CashIcon>;
          }}
          title="Doanh thu"
          content={Number("10000000").toLocaleString("vi-VN") + "đ"}
          unit="VND"
        ></Card>
        <Card
          Icon={function Icon() {
            return <CourseIcon></CourseIcon>;
          }}
          title="Số khóa học"
          content="100"
        ></Card>
        <Card
          Icon={function Icon() {
            return <UserIcon></UserIcon>;
          }}
          title="Người dùng"
          content="1504"
        ></Card>
        <Card
          Icon={function Icon() {
            return <BlogIcon></BlogIcon>;
          }}
          title="Bài viết"
          content="10"
        ></Card>
      </div>
      <div className="m-6">
        <TableIndex></TableIndex>
      </div>
    </div>
  );
}
