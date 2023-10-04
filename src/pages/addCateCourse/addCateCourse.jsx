import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputDescription from "../../components/Input/InputDescription";
import Button from "../../components/Button/Button";
export default function Home() {
  return (
    <>
      <form action="">
        <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
          {/* Breadcrumbs */}
          <div className="mt-6">
            <div className="text-2xl font-medium pb-2">Thêm danh mục</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <a href="/" className="text-indigo-500 text">
                Trang chủ
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <a href="/cate-course" className="text-indigo-500">
                Danh mục
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <p className="">Thêm danh mục</p>
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
        <div className="px-6 py-4 m-6 bg-white border-2 rounded-lg">
          <Input
            label={"Tên danh mục"}
            placeholder={"Nhập tên danh mục"}
            className={
              "mt-2 px-4 pb-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            value={""}
          ></Input>
          <InputDescription
            label={"Mô tả"}
            placeholder={"Nhập mô tả"}
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            cols={"30"}
            rows={"10"}
            value={""}
          ></InputDescription>
        </div>
      </form>
    </>
  );
}
