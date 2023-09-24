import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import TableMemberDetail from "../../components/Table/Member/TableMemberDetail";
import WalletIcon from "../../components/common/icon/WalletIcon";
import CartIcon from "../../components/common/icon/CartIcon";
import CheckIcon from "../../components/common/icon/CheckIcon";
import CarđDetail from "../../components/card/CardDetail";
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
      <div className="grid grid-cols-12 gap-6 px-6 py-4">
        {/* card */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <CarđDetail
            name="BaoNgoc"
            userId="001"
            email="vuhuyduc2100@gmail.com"
            addTime="09/09/2023"
          ></CarđDetail>
          {/* <div className="w-full border border-gray-200 p-2 pb-6 rounded-lg select-none">
            <div className="w-full bg-blue-500 rounded-lg relative h-36 mb-16">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center flex-col text-center pt-2">
              <h4 className="flex items-center gap-2 text-base font-medium capitalize leading-[24px] tracking-[0.5%] mb-2">
                Linda Blair
                <span className="capitalize bg-blue-100 text-blue-500 rounded-full py-1 px-1.5 text-xs leading-[18px] font-semibold">
                  Premium
                </span>
              </h4>
              <span className="text-xs font-medium text-gray-400 tracking-[0.5%] leading-[18px]">
                @linda_blair321
              </span>
            </div>
            <div className="block w-full h-px bg-gray-200 my-4" />
          </div> */}
        </div>
        {/* table */}
        <div className="col-span-full xl:col-span-8 2xl:col-span-9">
          <div className="grid grid-cols-12 gap-6 pb-4">
            <div className="cols-span-12 xl:col-span-4 lg:col-span-6 md:col-span-ful sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <WalletIcon></WalletIcon>;
                }}
                title={"Doanh thu"}
                b-6
                content={`${Number(1000000).toLocaleString("vi-VN")} VND`}
              ></Card>
            </div>
            <div className="cols-span-12 xl:col-span-4 lg:col-span-6 md:col-span-ful sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <CartIcon></CartIcon>;
                }}
                title="Khóa học đã tham gia"
                content={"10"}
              ></Card>
            </div>
            <div className="cols-span-12 xl:col-span-4 lg:col-span-12 md:col-span-ful sm:col-span-full">
              <Card
                Icon={function Icon() {
                  return <CheckIcon></CheckIcon>;
                }}
                title="Khóa học đã hoàn thành"
                content={"11"}
              ></Card>
            </div>
          </div>
          <div className="border rounded-lg mt-2">
            <TableMemberDetail></TableMemberDetail>
          </div>
        </div>
      </div>
    </div>
  );
}
