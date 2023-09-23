import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
export default function Home() {
  return (
    <>
      <form action="">
        <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
          {/* Breadcrumbs */}
          <div className="mt-6">
            <div className="text-2xl font-medium pb-2">Danh sách mua</div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <a href="/" className="text-indigo-500 text">
                Trang chủ
              </a>
              <FontAwesomeIcon icon={faAngleRight} className="" />
              <p className="">Danh sách mua</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
