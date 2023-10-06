// import { io } from "socket.io-client";
// import { useState } from "react";
import Card from "../../components/Card/Card";

import TableIndex from "../../components/Table/TableIndex";
import CashIcon from "../../components/common/icon/CashIcon";
import ListIcon from "../../components/common/icon/ListIcon";
import UserIcon from "../../components/common/icon/UserIcon";
import BlogIcon from "../../components/common/icon/BlogIcon";
import TableQuiz from "../../components/Table/TableQuiz";

export default function Home() {
  return (
    <div>
      <div className="grid gap-6 m-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card
          Icon={function Icon() {
            return <CashIcon></CashIcon>;
          }}
          title="Doanh thu"
          content={Number("10000000").toLocaleString("vi-VN") + "đ"}
          unit="VND"
          percent="10"
        ></Card>
        <Card
          Icon={function Icon() {
            return <ListIcon></ListIcon>;
          }}
          title="Số khóa học"
          content="100"
          percent="5"
        ></Card>
        <Card
          Icon={function Icon() {
            return <UserIcon></UserIcon>;
          }}
          title="Người dùng"
          content="1504"
          percent="10"
        ></Card>
        <Card
          Icon={function Icon() {
            return <BlogIcon></BlogIcon>;
          }}
          title="Bài viết"
          content="10"
          percent="0"
        ></Card>
      </div>
      <div className="m-6">
        <TableIndex></TableIndex>
        <TableQuiz></TableQuiz>
      </div>
    </div>
  );
}
