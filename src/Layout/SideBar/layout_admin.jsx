import { useState, useEffect } from "react";
import "./layout_admin.scss";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faXmark, // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom"; // Thêm import này
const LayoutAdmin = () => {
  const [isKhaoHocSubMenuOpen, setIsKhaoHocSubMenuOpen] = useState(false);
  const [isBaiVietSubMenuOpen, setIsBaiVietSubMenuOpen] = useState(false);
  const [isThanhVienSubMenuOpen, setIsThanhVienSubMenuOpen] = useState(false);
  const [isAnHienSubMenu, setIsAnHienSubMenu] = useState(
    window.innerWidth > 768
  );
  // const [activeMenu, setActiveMenu] = useState('');

  const toggleKhaoHocSubMenu = () => {
    setIsKhaoHocSubMenuOpen(!isKhaoHocSubMenuOpen);
    // setIsBaiVietSubMenuOpen(false);
    // setActiveMenu('KhaoHoc'); // Khi bấm vào KhaoHoc, setActiveMenu thành 'KhaoHoc'
  };

  const toggleBaiVietSubMenu = () => {
    setIsBaiVietSubMenuOpen(!isBaiVietSubMenuOpen);
    // setIsKhaoHocSubMenuOpen(false);
    // setActiveMenu('BaiViet'); // Khi bấm vào BaiViet, setActiveMenu thành 'BaiViet'
  };
  const toggleThanhVienSubMenu = () => {
    setIsThanhVienSubMenuOpen(!isThanhVienSubMenuOpen);
  
  };

  const toggleAnHienSubMenu = () => {
    setIsAnHienSubMenu(!isAnHienSubMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAnHienSubMenu(window.innerWidth > 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="container-admin">
        <div className="nutanhien_menu">
          <button onClick={toggleAnHienSubMenu}>
            <FontAwesomeIcon icon={isAnHienSubMenu ? faXmark : faBars} />{" "}
            {/* Toggle visibility icon */}
          </button>
        </div>
        {isAnHienSubMenu && (
          <div className="menu-container-admin">
            <img
              src={
                "https://i.imgur.com/AB2qbqm.png"
              }
              alt=""
            />
            <div className="main_Menu">
              <ul>
                <div className="scroll_bar">
                  <div className="single_Menu">
                    <NavLink to="/" activeclassname="active">
                      <h1>
                        <div className="icon-menu">
                          <svg
                            className="custom-svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 5.5C3 4.11929 4.11929 3 5.5 3H8.5C9.88071 3 11 4.11929 11 5.5V8.5C11 9.88071 9.88071 11 8.5 11H5.5C4.11929 11 3 9.88071 3 8.5V5.5ZM5.5 5H8.5C8.77614 5 9 5.22386 9 5.5V8.5C9 8.77614 8.77614 9 8.5 9H5.5C5.22386 9 5 8.77614 5 8.5V5.5C5 5.22386 5.22386 5 5.5 5Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 5.5C13 4.11929 14.1193 3 15.5 3H18.5C19.8807 3 21 4.11929 21 5.5V8.5C21 9.88071 19.8807 11 18.5 11H15.5C14.1193 11 13 9.88071 13 8.5V5.5ZM15.5 5H18.5C18.7761 5 19 5.22386 19 5.5V8.5C19 8.77614 18.7761 9 18.5 9H15.5C15.2239 9 15 8.77614 15 8.5V5.5C15 5.22386 15.2239 5 15.5 5Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.5 13C14.1193 13 13 14.1193 13 15.5V18.5C13 19.8807 14.1193 21 15.5 21H18.5C19.8807 21 21 19.8807 21 18.5V15.5C21 14.1193 19.8807 13 18.5 13H15.5ZM18.5 15H15.5C15.2239 15 15 15.2239 15 15.5V18.5C15 18.7761 15.2239 19 15.5 19H18.5C18.7761 19 19 18.7761 19 18.5V15.5C19 15.2239 18.7761 15 18.5 15Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 15.5C3 14.1193 4.11929 13 5.5 13H8.5C9.88071 13 11 14.1193 11 15.5V18.5C11 19.8807 9.88071 21 8.5 21H5.5C4.11929 21 3 19.8807 3 18.5V15.5ZM5.5 15H8.5C8.77614 15 9 15.2239 9 15.5V18.5C9 18.7761 8.77614 19 8.5 19H5.5C5.22386 19 5 18.7761 5 18.5V15.5C5 15.2239 5.22386 15 5.5 15Z"
                            />
                          </svg>
                        </div>
                        Trang chủ
                      </h1>
                    </NavLink>
                  </div>
                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleKhaoHocSubMenu}>
                      <div className="icon-menu">
                        <svg
                          className="custom-svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6H17C18.6569 6 20 7.34315 20 9V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V9C4 7.34315 5.34315 6 7 6H8ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6H10ZM8 8V8.5C8 9.05228 8.44772 9.5 9 9.5C9.55228 9.5 10 9.05228 10 8.5V8H14V8.5C14 9.05228 14.4477 9.5 15 9.5C15.5523 9.5 16 9.05228 16 8.5V8H17C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V9C6 8.44772 6.44772 8 7 8H8Z"
                          />
                        </svg>
                      </div>
                      Khóa học{" "}
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isKhaoHocSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isKhaoHocSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/list-course" activeclassname="active">
                          <h2>Danh sách khóa học</h2>
                        </NavLink>
                        <NavLink to="/cate-course" activeclassname="active">
                          <h2>Danh mục khóa học</h2>
                        </NavLink>
                        <NavLink to="/list-quiz" activeclassname="active">
                          <h2>Danh sách quiz</h2>   
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleBaiVietSubMenu}>
                      <div className="icon-menu">
                        <svg
                          className="custom-svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6H17C18.6569 6 20 7.34315 20 9V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V9C4 7.34315 5.34315 6 7 6H8ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6H10ZM8 8V8.5C8 9.05228 8.44772 9.5 9 9.5C9.55228 9.5 10 9.05228 10 8.5V8H14V8.5C14 9.05228 14.4477 9.5 15 9.5C15.5523 9.5 16 9.05228 16 8.5V8H17C17.5523 8 18 8.44772 18 9V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V9C6 8.44772 6.44772 8 7 8H8Z"
                          />
                        </svg>
                      </div>
                      Bài viết{" "}
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isBaiVietSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isBaiVietSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/list-blog" activeclassname="active">
                          <h2>Danh sách bài viết</h2>
                        </NavLink>
                        <NavLink to="/cate-blog" activeclassname="active">
                          <h2>Danh mục bài viết</h2>
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <div className="single_Menu">
                    <NavLink to="/order" activeclassname="active">
                      <h1>
                        <div className="icon-menu">
                          <svg
                            className="custom-svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.63803 4.12231C6.45694 3.18063 5.63295 2.5 4.67402 2.5H3.00003C2.44775 2.5 2.00003 2.94772 2.00003 3.5C2.00003 4.05228 2.44775 4.5 3.00003 4.5L4.67402 4.5L6.55005 14.2554C6.91224 16.1388 8.56021 17.5 10.4781 17.5H16.6874C18.5044 17.5 20.0932 16.2752 20.5557 14.518L21.8068 9.76348C22.3074 7.86122 20.8726 6 18.9056 6H6.99912L6.63803 4.12231ZM7.38374 8L8.51406 13.8777C8.69516 14.8194 9.51914 15.5 10.4781 15.5H16.6874C17.5959 15.5 18.3903 14.8876 18.6215 14.009L19.8727 9.25449C20.0396 8.62041 19.5613 8 18.9056 8H7.38374Z"
                            />
                            <path d="M8.75 21.5C7.92157 21.5 7.25 20.8284 7.25 20C7.25 19.1716 7.92157 18.5 8.75 18.5C9.57843 18.5 10.25 19.1716 10.25 20C10.25 20.8284 9.57843 21.5 8.75 21.5Z" />
                            <path d="M17.5 21.5C16.6716 21.5 16 20.8284 16 20C16 19.1716 16.6716 18.5 17.5 18.5C18.3284 18.5 19 19.1716 19 20C19 20.8284 18.3284 21.5 17.5 21.5Z" />
                          </svg>
                        </div>
                        Danh sách mua
                        <div className="number_SideBar">
                          <span>1</span>
                        </div>
                      </h1>
                    </NavLink>
                  </div>

                  <div className="single_Menu dropdow_Focus">
                    <h1 onClick={toggleThanhVienSubMenu}>
                    <div className="icon-menu">
                          <svg
                            className="custom-svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.5 6.5C14.5 8.98528 12.4853 11 10 11C7.51472 11 5.5 8.98528 5.5 6.5C5.5 4.01472 7.51472 2 10 2C12.4853 2 14.5 4.01472 14.5 6.5ZM12.5 6.5C12.5 7.88071 11.3807 9 10 9C8.61929 9 7.5 7.88071 7.5 6.5C7.5 5.11929 8.61929 4 10 4C11.3807 4 12.5 5.11929 12.5 6.5Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2 18.9231C2 15.0996 5.09957 12 8.92308 12H11.0769C14.9004 12 18 15.0996 18 18.9231C18 20.0701 17.0701 21 15.9231 21H4.07692C2.92987 21 2 20.0701 2 18.9231ZM4 18.9231C4 16.2041 6.20414 14 8.92308 14H11.0769C13.7959 14 16 16.2041 16 18.9231C16 18.9656 15.9656 19 15.9231 19H4.07692C4.03444 19 4 18.9656 4 18.9231Z"
                            />
                            <path d="M18.9198 20.0973C18.8164 20.4981 19.0774 21 19.4913 21H19.9231C21.0701 21 22 20.0701 22 18.9231C22 15.0996 18.9004 12 15.0769 12C14.9347 12 14.8829 12.1975 15.0036 12.2727C15.9494 12.8614 16.7705 13.6314 17.4182 14.5343C17.4621 14.5955 17.5187 14.6466 17.5835 14.685C19.0301 15.5424 20 17.1195 20 18.9231C20 18.9656 19.9656 19 19.9231 19H19.4494C19.1985 19 19 19.2106 19 19.4615C19 19.6811 18.9721 19.8941 18.9198 20.0973Z" />
                            <path d="M14.919 8.96308C14.974 8.85341 15.0645 8.76601 15.1729 8.70836C15.9624 8.28814 16.5 7.45685 16.5 6.5C16.5 5.54315 15.9624 4.71186 15.1729 4.29164C15.0645 4.23399 14.974 4.14659 14.919 4.03692C14.6396 3.48001 14.2684 2.97712 13.8252 2.5481C13.623 2.35231 13.7185 2 14 2C16.4853 2 18.5 4.01472 18.5 6.5C18.5 8.98528 16.4853 11 14 11C13.7185 11 13.623 10.6477 13.8252 10.4519C14.2684 10.0229 14.6396 9.51999 14.919 8.96308Z" />
                          </svg>
                        </div>
                      Thành viên{" "}
                      <FontAwesomeIcon
                        className="faChevronIcon"
                        icon={
                          isThanhVienSubMenuOpen ? faChevronUp : faChevronDown
                        }
                      />
                    </h1>
                    {isThanhVienSubMenuOpen && (
                      <div className="single_Menu_1">
                        <NavLink to="/member-user" activeclassname="active">
                          <h2>Danh sách người dùng</h2>
                        </NavLink>
                        <NavLink to="/member-admin" activeclassname="active">
                          <h2>Danh sách admin</h2>
                        </NavLink>
                      </div>
                    )}
                  </div>

                  
                  {/* <div className='single_Menu'>
                    <NavLink to="/tk" activeclassname="active">
                      <h1>
                        <div className='icon-menu'>
                          <svg className="custom-svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"

                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 3C4.55228 3 5 3.44772 5 4V19H20C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"

                            />
                            <path
                              d="M19.832 8.55468C20.1384 8.09516 20.0142 7.47429 19.5547 7.16793C19.0952 6.86158 18.4743 6.98576 18.1679 7.44528L14.7543 12.5657L11.6 10.2C11.1407 9.85553 10.4864 9.96762 10.1679 10.4453L6.16793 16.4453C5.86158 16.9048 5.98576 17.5257 6.44528 17.832C6.90481 18.1384 7.52568 18.0142 7.83203 17.5547L11.2457 12.4342L14.4 14.8C14.8593 15.1444 15.5136 15.0324 15.832 14.5547L19.832 8.55468Z"

                            /></svg>
                        </div>
                        Thống kê
                      </h1>
                    </NavLink>
                  </div> */}
                </div>
                <div className="bottom_siderbar_admin">
                  <div className="dangXuat_Admin">
                    <Button text={"Đăng Xuất"}></Button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutAdmin;
