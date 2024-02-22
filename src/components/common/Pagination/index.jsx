import RcPagination from "rc-pagination";
import localeInfo from 'rc-pagination/es/locale/vi_VN';

export default function Pagination({ current, total, limit, onChange }) {
  return (
    <>
    <RcPagination
      total={total}
      pageSize={limit}
      current={current}
      onChange={onChange}
      hideOnSinglePage
      jumpNextIcon="..."
      jumpPrevIcon="..."
      locale={localeInfo}
      prevIcon={
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
         
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.2071 5.29289C15.5976 5.68342 15.5976 6.31658 15.2071 6.70711L9.91421 12L15.2071 17.2929C15.5976 17.6834 15.5976 18.3166 15.2071 18.7071C14.8166 19.0976 14.1834 19.0976 13.7929 18.7071L7.43934 12.3536C7.24408 12.1583 7.24408 11.8417 7.43934 11.6464L13.7929 5.29289C14.1834 4.90237 14.8166 4.90237 15.2071 5.29289Z"
            fill="#2563eb"
          />
        </svg>
      }
      nextIcon={
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.5607 12.3536C16.7559 12.1583 16.7559 11.8417 16.5607 11.6464L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z"
            fill="#2563eb"
          />
        </svg>
      }
    />
    </>
  );
}
