import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from "../../components/Button/Button";
import {
    faChevronUp,
    faChevronDown,

} from '@fortawesome/free-solid-svg-icons';
import './topbar.scss';
const topBar = () => {
    const [isUser_AdminOpen, setIsUser_AdminOpen] = useState(false);
    const [isSeachOpen, setIsSeachOpen] = useState(false);
    const [isThongbaoOpen, setIsThongbaoOpen] = useState(false);

    const toggleUserAdminSubMenu = () => {
        setIsUser_AdminOpen(!isUser_AdminOpen);
        setIsSeachOpen(false);
        setIsThongbaoOpen(false);
    };

    const toggleSeachSubMenu = () => {
        setIsSeachOpen(!isSeachOpen);
        setIsUser_AdminOpen(false);
        setIsThongbaoOpen(false);
    };

    const toggleThongbaoSubMenu = () => {
        setIsThongbaoOpen(!isThongbaoOpen);
        setIsUser_AdminOpen(false);
        setIsSeachOpen(false);
    };
    return (
        <div className='topbar'>
            <div className='thanh_topBar'>
                {/* <svg className='icon_topBar_menu'
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7Z"
                        fill="#667085"
                    />
                    <path
                        d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                        fill="#667085"
                    />
                    <path
                        d="M4 16C3.44772 16 3 16.4477 3 17C3 17.5523 3.44772 18 4 18H20C20.5523 18 21 17.5523 21 17C21 16.4477 20.5523 16 20 16H4Z"
                        fill="#667085"
                    />
                </svg> */}
                <div className='topBar_Right'>
                    <div className='topBar_Right_utilities'>
                        <div className='icon_TopBar' onClick={toggleSeachSubMenu}>
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.7846 16.1989C11.6462 18.6414 7.10652 18.4203 4.22179 15.5356C1.0976 12.4114 1.0976 7.34604 4.22179 4.22185C7.34599 1.09765 12.4113 1.09765 15.5355 4.22185C18.4202 7.10657 18.6413 11.6462 16.1988 14.7847L20.4853 19.0711C20.8758 19.4616 20.8758 20.0948 20.4853 20.4853C20.0948 20.8758 19.4616 20.8758 19.0711 20.4853L14.7846 16.1989ZM5.63601 14.1213C7.97915 16.4645 11.7781 16.4645 14.1213 14.1213C16.4644 11.7782 16.4644 7.9792 14.1213 5.63606C11.7781 3.29291 7.97915 3.29291 5.63601 5.63606C3.29286 7.9792 3.29286 11.7782 5.63601 14.1213Z"
                                    fill="#667085"
                                />
                            </svg>

                        </div>
                        {isSeachOpen && (
                            <div className='seach_Admin'>
                                <div className='input_seach_Admin'>
                                    <input type="search" name="" id="" placeholder='Nhập từ khóa để tìm...' />
                                </div>
                                <div className='submit_Search'>
                                    <button>Tìm kiếm</button>
                                </div>
                            </div>
                        )}
                        <div className='icon_TopBar'>
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3H6C4.34315 3 3 4.34315 3 6V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V6C21 4.34315 19.6569 3 18 3H17C17 2.44772 16.5523 2 16 2C15.4477 2 15 2.44772 15 3H9ZM19 7V6C19 5.44772 18.5523 5 18 5H17C17 5.55228 16.5523 6 16 6C15.4477 6 15 5.55228 15 5H9C9 5.55228 8.55228 6 8 6C7.44772 6 7 5.55228 7 5H6C5.44772 5 5 5.44772 5 6V7H19ZM5 9V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H5Z"
                                    fill="#667085"
                                />
                            </svg>
                            <div className='number_utilities'>
                                <span>1</span>
                            </div>

                        </div>
                        <div className='icon_TopBar' onClick={toggleThongbaoSubMenu}>
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V3.57088C7.60769 4.0561 4.99997 6.97352 4.99997 10.5V15.5L4.28237 16.7558C3.71095 17.7558 4.433 19 5.58474 19H8.12602C8.57006 20.7252 10.1362 22 12 22C13.8638 22 15.4299 20.7252 15.874 19H18.4152C19.5669 19 20.289 17.7558 19.7176 16.7558L19 15.5V10.5C19 6.97354 16.3923 4.05614 13 3.57089V3ZM6.99997 16.0311L6.44633 17H17.5536L17 16.0311V10.5C17 7.73858 14.7614 5.5 12 5.5C9.23854 5.5 6.99997 7.73858 6.99997 10.5V16.0311ZM12 20C11.2597 20 10.6134 19.5978 10.2676 19H13.7324C13.3866 19.5978 12.7403 20 12 20Z"
                                    fill="#667085"
                                />
                            </svg>

                            <div className='number_utilities'>
                                <span>99+</span>
                            </div>

                        </div>
                        {isThongbaoOpen && (
                            <div className='thongBao_Admin'>
                                <h1>THÔNG BÁO</h1>
                                <div className='thongBao_Admin_sroll'>
                                    <div className='thongBao_Admin_box'>
                                        <p>Đạt đã sửa Bài Viết</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='icon_TopBar'>
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM18.3334 6H5.6667L11.4 10.3C11.7556 10.5667 12.2445 10.5667 12.6 10.3L18.3334 6ZM4 7.24998V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V7.25002L13.8 11.9C12.7334 12.7 11.2667 12.7 10.2 11.9L4 7.24998Z"
                                    fill="#667085"
                                />
                            </svg>



                        </div>

                    </div>
                    <div className='user_Admin' onClick={toggleUserAdminSubMenu}>
                        <div className='avatar_User_Admin'>
                            <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
                            <div className='hoatdong_user_Admin'>

                            </div>
                        </div>
                        <div className='tt_user_Admin'>
                            <h1>Phạm Trường Đạt</h1>
                            <p>Admin</p>
                        </div>
                        <div className='icon_User_Admin'>
                            <FontAwesomeIcon
                                className='faChevronIcon'
                                icon={isUser_AdminOpen ? faChevronUp : faChevronDown}
                            />
                        </div>
                        {isUser_AdminOpen && (
                            <div className='cropdow_user_Admin'>
                                <div className='tt_user_Admin_1'>
                                    <h1>Phạm Trường Đạt</h1>
                                    <p>Admin</p>
                                </div>
                                <Button text={"Đăng Xuất"}></Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default topBar;