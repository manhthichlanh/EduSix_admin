import  { useState, useEffect } from 'react';
import './layout_admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBorderAll,
  faClipboard,
  faChevronUp,
  faChevronDown,
  faCartShopping,
  faUser,
  faXmark, // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const LayoutAdmin = () => {
  const [isKhaoHocSubMenuOpen, setIsKhaoHocSubMenuOpen] = useState(false);
  const [isBaiVietSubMenuOpen, setIsBaiVietSubMenuOpen] = useState(false);
  const [isAnHienSubMenu, setIsAnHienSubMenu] = useState(window.innerWidth > 768);

  const toggleKhaoHocSubMenu = () => {
    setIsKhaoHocSubMenuOpen(!isKhaoHocSubMenuOpen);
    setIsBaiVietSubMenuOpen(false);
  };

  const toggleBaiVietSubMenu = () => {
    setIsBaiVietSubMenuOpen(!isBaiVietSubMenuOpen);
    setIsKhaoHocSubMenuOpen(false);
  };

  const toggleAnHienSubMenu = () => {
    setIsAnHienSubMenu(!isAnHienSubMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsAnHienSubMenu(window.innerWidth > 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='container-admin'>
        <div className='nutanhien_menu'>
          <button onClick={toggleAnHienSubMenu}>
            <FontAwesomeIcon icon={isAnHienSubMenu ? faXmark : faBars} /> {/* Toggle visibility icon */}
          </button>
        </div>
        {isAnHienSubMenu && (
          <div className='menu-container-admin'>
            <img
              src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lazada_%282019%29.svg/2560px-Lazada_%282019%29.svg.png'}
              alt=''
            />
            <div className='main_Menu'>
                <ul>
              <div className='single_Menu'>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faBorderAll} />
                  </div>
                  Trang chủ
                </h1>
              </div>
              <div className='single_Menu' onClick={toggleKhaoHocSubMenu}>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faBagShopping} />
                  </div>
                  Khóa học{' '}
                  <FontAwesomeIcon
                    className='faChevronIcon'
                    icon={isKhaoHocSubMenuOpen ? faChevronUp : faChevronDown}
                  />
                </h1>
                {isKhaoHocSubMenuOpen && (
                  <div className='single_Menu_1'>
                    <h2>Danh sách khóa học</h2>
                    <h2>Danh mục</h2>
                  </div>
                )}
              </div>
              <div className='single_Menu' onClick={toggleBaiVietSubMenu}>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faClipboard} />
                  </div>
                  Bài viết{' '}
                  <FontAwesomeIcon
                    className='faChevronIcon'
                    icon={isBaiVietSubMenuOpen ? faChevronUp : faChevronDown}
                  />
                </h1>
                {isBaiVietSubMenuOpen && (
                  <div className='single_Menu_1'>
                    <h2>Danh sách bài viết</h2>
                    <h2>Danh mục bài viết</h2>
                  </div>
                )}
              </div>
              <div className='single_Menu'>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </div>
                  Danh sách mua
                </h1>
              </div>
              <div className='single_Menu'>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  Thành viên
                </h1>
              </div>
              <div className='single_Menu'>
                <h1>
                  <div className='icon-menu'>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  Thống kê
                </h1>
              </div>
              </ul>
              <div className=''>
                
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutAdmin;
