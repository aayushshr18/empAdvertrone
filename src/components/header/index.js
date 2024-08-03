
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotices } from '../../services/notice/notice';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';
import { navbarActions } from '../../redux/reducers/other';
import { HamburgerIcon, UserIcon } from '../icons';
import './styles.scss';

const Header = () => {
  const { isActive, isHidden } = useSelector((state) => state.navbar);
  const employee = useSelector((state) => state.employee.loggedInEmployee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    const noticeCount = notices.length;
    if (noticeCount > 0) {
      const interval = setInterval(() => {
        setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % noticeCount);
      }, 9000);

      return () => clearInterval(interval);
    }
  }, [notices]);

  // Function to fetch notices from the database
  const fetchNotices = async () => {
    try {
      const response = await getNotices();
      if (response.success) {
        setNotices(response.data.notices);
      }
    } catch (error) {
      sendErrorNotification('Error fetching notices!');
    }
  };

  const handleNav = () => {
    dispatch(navbarActions.setIsActive(!isActive));
  };

  const handleClick = () => {
    navigate('/profile');
  };

  return !isHidden ? (
    <div className="header">
      <div className="ham-icon" onClick={handleNav}>
        <HamburgerIcon />
      </div>

      <div className="marquee-container" style={{ width: '70%' }}>
        {notices.length > 0 && (
          <marquee className="marquee" behavior="scroll" direction="left" style={{ width: '100%' }}>
            {notices.map((notice, index) => (
              <span key={index} style={{ display: index === currentNoticeIndex ? 'inline' : 'none' }}>
                {notice.notice}
                <>&nbsp;&nbsp;&nbsp;</>
              </span>
            ))}
          </marquee>
        )}
      </div>

      <div className="profile-section" onClick={handleClick}>
        <div className="employee-icon">
          <UserIcon />
        </div>
        <span> Hi {localStorage.getItem('employeeEmail') || '😎'}</span>
      </div>
    </div>
  ) : null;
};

export default Header;