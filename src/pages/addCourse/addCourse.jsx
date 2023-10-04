import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputSelect from "../../components/Input/InputSelect";
import InputDescription from "../../components/Input/InputDescription";
import Button from "../../components/Button/Button";
import InputFile from "../../components/Input/InputFile";
export default function Home() {
  return (
    <>
      <form action="">
        <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
          {/* Breadcrumbs */}
          <div className="mt-6">
            <div className="text-2xl font-medium pb-2">Thêm khóa học</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <a href="/" className="text-indigo-500 text">
                Trang chủ
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <a href="/list-course" className="text-indigo-500">
                Khóa học
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <p className="">Thêm khóa học</p>
            </div>
          </div>
          <div className="flex gap-2 whitespace-nowrap xl:mt-0 lg:mt-4 md:mt-4 md:justify-end mt-4 sm:mb-0 sm:mt-4 sm:justify-end">
            <Button
              text={"Hủy"}
              Class={
                "flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg"
              }
              Icon={function Icon() {
                return (
                  <svg
                    className="pr-2 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                );
              }}
              onClick={() => console.log("You are my dream")}
            />
            <Button
              text={"Thêm"}
              Class={
                "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
              }
              Icon={function Icon() {
                return (
                  <svg
                    className="pr-2 "
                    fill="#ffffff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
                    <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
                  </svg>
                );
              }}
              onClick={() => console.log("You will be mine")}
            />
          </div>
        </div>
        <div className="w-full gap-6 p-6 md:grid sm:grid lg:flex md:grid-cols-1 sm:grid-cols-1">
          <div className="w-full px-6 py-4 border-2 rounded-lg">
            <p htmlFor="" className="pb-2 text-xl font-medium text-left">
              Thông tin
            </p>
            <InputSelect
              label={"Tên bài học"}
              array={
                [
                  { value: "123", text: "Hello" },
                  { value: "213", text: "Hello2" },
                ]
              }
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
            ></InputSelect>
            <Input
              type={"text"}
              label={"Tên bài học"}
              placeholder={"Nhập tên bài học"}
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
              value={""}
            ></Input>
            <Input
              type={"number"}
              label={"Số bài học"}
              placeholder={"Nhập số bài học"}
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
              value={""}
            ></Input>
            <InputSelect
              label={"Giá"}
              array={
                [
                  { value: "123", text: "Miễn phí" },
                  { value: "213", text: "Có phí" },
                ]
              }
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
            ></InputSelect>
            <InputSelect
              label={"Trạng thái"}
              array={
                [
                  { value: "123", text: "Đang bật" },
                  { value: "213", text: "Đang tắt" },
                ]
              }
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
            ></InputSelect>
            <InputDescription
              label={"Mô tả"}
              placeholder={"Nhập mô tả"}
              className={
                "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
              }
              rows={"10"}
              cols={"30"}
              value={""}
            ></InputDescription>
          </div>
          <div className="lg:my-0 md:my-0 sm:my-0 my-6">
            <InputFile
              title="Thumnails"
              label={"Image"}
              className={
                "grid p-6 mt-4 bg-gray-100 border-2 border-dashed rounded-lg justify-items-center"
              }
              value={""}
            ></InputFile>
          </div>
        </div>
        <Button
          text={"Tiếp tục"}
          Class={
            "flex m-6 font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
          }
          onClick={() => console.log("Please don't belong to anyone")}
        />
      </form>
    </>
  );
}
