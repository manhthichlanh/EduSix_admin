/* eslint-disable react/prop-types */
import { map, reduce } from "lodash";
import moment from "moment";
import Card from "../../components/Card/Card";
import TableIndex from "../../components/Table/TableIndex";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import CourseIcon from "../../components/common/icon/Cart/CourseIcon";
import UserIcon from "../../components/common/icon/Cart/UserIcon";
import BlogIcon from "../../components/common/icon/Cart/BlogIcon";
import CashIcon from "../../components/common/icon/Cart/CashIcon";
import PieChart from "../../components/chart/PieChart";
import CardAnalytics from "../../components/card/CardAnalytics";
import BarChart from "../../components/chart/BarChart";
import { useQuery } from "react-query";
import { ServerApi } from "../../utils/http";
// import { map } from 'lodash';

export default function Home() {
  const getAnalyticsData = async () => {
    try {
      const response1 = ServerApi.get("/admin-query/general/countAllCourse");
      const response2 = ServerApi.get("admin-query/general/analytic1");
      const getAllRes = await Promise.all([response1, response2]);
      return getAllRes.map((item) => item.data);
    } catch (error) {
      throw new Error("Error fetching course data");
    }
  };

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useQuery("analyticsData", getAnalyticsData);
  const analyticsCard = [
    {
      id: 1,
      content:
        analyticsData && analyticsData?.length > 0
          ? analyticsData[0].totalCourse
          : 0,
      title: "Tổng khóa học",
    },
    {
      id: 2,
      content:
        analyticsData && analyticsData?.length > 0
          ? analyticsData[0].totalSections
          : 0,
      title: "Tổng phần học",
    },
    {
      id: 3,
      content:
        analyticsData && analyticsData?.length > 0
          ? analyticsData[0].totalLessons
          : 0,
      title: "Tổng bài học",
    },
    {
      id: 4,
      content:
        analyticsData && analyticsData?.length > 0
          ? analyticsData[0].totalVideoLessons
          : 0,
      title: "Tổng video",
    },
    {
      id: 5,
      content:
        analyticsData && analyticsData?.length > 0
          ? analyticsData[0].totalQuizzLessons
          : 0,
      title: "Tổng quiz",
    },
  ];
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userIdParam = searchParams.get("userId");
    console.log(userIdParam);
  }, []);

  const currentDay =
    "Ngày " +
    moment().format("DD") +
    " Tháng " +
    moment().format("MM") +
    " Năm " +
    moment().format("YYYY");

  const revenue = Number("10000000").toLocaleString("vi-VN") + "đ";
  const revenueLine = [
    { id: 1, title: "Thiết kế đồ họa", revenue: 1000 },
    { id: 2, title: "Ngôn ngữ", revenue: 100 },
    { id: 3, title: "Lập trình", revenue: 550 },
    { id: 4, title: "Photography", revenue: 200 },
    { id: 5, title: "Kinh tế", revenue: 500 },
    { id: 6, title: "Marketing", revenue: 290 },
  ];

  const totalRevenue = reduce(
    revenueLine,
    (acc, item) => acc + item.revenue,
    0
  );

  const renderRevenueBars = () => {
    return map(revenueLine, (item) => {
      const revenuePercent = (item.revenue / totalRevenue) * 100 || 0;
      const barWidth = `${revenuePercent}%`;
      return (
        <div key={item.id} className="col-span-6">
          <div className="flex justify-between pb-1">
            <p className="text-xs font-medium text-gray-500">{item.title}</p>
            <p className="text-xs font-medium text-gray-500">{`${revenuePercent.toFixed(
              2
            )}%`}</p>
          </div>
          <div className="flex items-center w-full h-4 px-1 bg-orange-200 rounded-lg">
            <div
              className={`h-2  bg-[#FF6636] rounded-lg flex items-center justify-end`}
              style={{ width: barWidth }}
            ></div>
          </div>
        </div>
      );
    });
  };

  const totalUsers =
    analyticsData && analyticsData?.length > 0 ? analyticsData[1].countUser : 0;
  const onlineUsers = 8;
  const offlineUsers = totalUsers - onlineUsers;
  const percentOnline = (onlineUsers / totalUsers) * 100;
  const percentOffline = (offlineUsers / totalUsers) * 100;

  return (
    <div>
      <Alert severity="success" color="info">
        This is a success alert — check it out!
      </Alert>
      <div className="grid grid-cols-12 gap-4 m-6">
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
          <Card
            Icon={function Icon() {
              return <CashIcon></CashIcon>;
            }}
            title="Doanh thu"
            content={Number("10000000").toLocaleString("vi-VN") + "đ"}
            unit="VND"
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
          <Card
            Icon={function Icon() {
              return <CourseIcon></CourseIcon>;
            }}
            title="Số khóa học"
            content="100"
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
          <Card
            Icon={function Icon() {
              return <UserIcon></UserIcon>;
            }}
            title="Người dùng"
            content="1504"
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-6 lg:col-span-3">
          <Card
            Icon={function Icon() {
              return <BlogIcon></BlogIcon>;
            }}
            title="Bài viết"
            content="10"
          ></Card>
        </div>
      </div>
      <div className="m-6">
        <TableIndex></TableIndex>
      </div>
      <div className="px-6 py-4">
        <p className="mb-2 text-lg font-medium">Khóa học</p>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 gap-2 lg:col-span-6">
            <div className="grid grid-cols-12 gap-4">
              {map(analyticsCard, (item) => (
                <div className="col-span-6 lg:col-span-6">
                  <CardAnalytics content={item.content} title={item.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 gap-2 lg:col-span-6">
            <div className="border rounded-md shadow-lg">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 m-6">
        <div className="col-span-12">
          <p className="text-lg font-medium">Doanh thu</p>
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12">
              <div className="grid justify-between w-full grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                  <CardAnalytics content={revenue} title={currentDay} />
                </div>
                <div className="col-span-12 p-2 border rounded-md shadow-lg lg:col-span-8">
                  <div className="grid grid-cols-12 gap-4 px-2 py-3">
                    {renderRevenueBars()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6">
        <p className="mb-2 text-lg font-medium">Người dùng</p>
        <div className="flex flex-col gap-4 px-4 py-3 border rounded-lg shadow-lg">
          <p className="flex flex-col">
            <p className="text-2xl font-medium">{totalUsers}</p>
            <p className="text-xs font-medium text-gray-500">Tổng người dùng</p>
          </p>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-500">
                {percentOnline.toFixed(2)}%
              </p>
              <p className="text-sm font-medium text-gray-500">
                {percentOffline.toFixed(2)}%
              </p>
            </div>
            <div className="flex items-center w-full h-6 bg-orange-200 rounded-xl">
              <div
                className="h-3 mx-2 bg-[#FF6636] rounded-lg"
                style={{ width: `${(onlineUsers / totalUsers) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF6636] rounded-md"></div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{onlineUsers}</p>
                <span className="text-xs font-medium text-gray-500">
                  Đang hoạt động
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 bg-orange-200 rounded-md"></div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{offlineUsers}</p>
                <span className="text-xs font-medium text-gray-500">
                  Không hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="px-6 text-lg font-medium">Lượt truy cập</p>
        <BarChart />
      </div>
    </div>
  );
}
