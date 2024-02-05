
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from 'react-router-dom';

const useMathPath = (location) => {
  const { pathname } = location;
  const parentPath = '/course-structure';
  return (childrenPath) => {
    const handlePath = `${parentPath}/${(childrenPath.trim().split("/").join(""))}`;
    console.log({ handlePath, pathname })
    return handlePath === pathname;
  }
}
//Nơi custom lại các child route như icon, path, title;
const routes = [
  {
    path: "/general-info",
    icon: faPlayCircle,
    title: "Thông tin khóa học",
  },
  {
    path: "/content",
    icon: faPlayCircle,
    title: "Chương trình giảng dạy",
  },
  {
    path: "/publish",
    icon: faPlayCircle,
    title: "Publish Course",
  }
]
// 
const activeClass = 'relative after:absolute after:w-full after:border-b-4 after:border-blue-500 after:bottom-0 after:left-0 after:animate-proccessing';
const generateTest = (mathPath) => {
  let activeState = activeClass;
  return routes.map((item) => {
    const isMathPath = mathPath(item.path);
    const exportHTML = (
        <Link to={"/course-structure"+item.path}>
          <div className={`p-6 flex items-center gap-2 
           ${activeState}`}>
            <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
            <div className="text-base font-medium">{item.title}</div>
          </div>
        </Link>

    )
    if (isMathPath) activeState = "";
    return exportHTML;
  })
}

export default function CourseStructure() {
  const location = useLocation();
  const mathPath = useMathPath(location);
  console.log(mathPath("/general-info"))
  return (
    <>
      <div className="m-6 bg-white border-2 rounded-lg">
        <div className="grid grid-cols-3 gap-6 border-b-2 border-gray-200">
          {
            generateTest(mathPath)
          }
        </div>
        <h1 className="text-2xl p-6">Thông tin khóa học</h1>
      </div>
      <Outlet></Outlet>
    </>


  )
}
