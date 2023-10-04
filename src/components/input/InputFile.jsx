import Input from "./Input";
function InputFile({ title, label, className, placeholder, value, onChange }) {
  return (
    <div className="p-6 border-2 rounded-lg">
      <div className="text-lg font-medium">{title}</div>
      <div className="font-medium text-gray-500">{label}</div>
      <div className={className}>
        <svg
          className="mb-4"
          width="52"
          height="52"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="40" height="40" rx="20" fill="#DEDEFA" />
          <path
            d="M17.3334 20.25C18.2999 20.25 19.0834 19.4665 19.0834 18.5C19.0834 17.5335 18.2999 16.75 17.3334 16.75C16.3669 16.75 15.5834 17.5335 15.5834 18.5C15.5834 19.4665 16.3669 20.25 17.3334 20.25Z"
            fill="#5C59E8"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7084 11.2084C12.7754 11.2084 11.2084 12.7754 11.2084 14.7084V29.2917C11.2084 31.2247 12.7754 32.7917 14.7084 32.7917H29.2917C31.2247 32.7917 32.7917 31.2247 32.7917 29.2917V14.7084C32.7917 12.7754 31.2247 11.2084 29.2917 11.2084H14.7084ZM29.2917 13.5417H14.7084C14.064 13.5417 13.5417 14.064 13.5417 14.7084V23.7712L16.4569 21.9772C16.6509 21.8578 16.8967 21.8623 17.0862 21.9887L20.1976 24.0629L25.1419 20.2173C25.3526 20.0534 25.6476 20.0534 25.8582 20.2172L30.4584 23.7952V14.7084C30.4584 14.064 29.936 13.5417 29.2917 13.5417ZM13.5417 29.2917V26.511L16.7249 24.5521L20.3026 26.9372L25.5001 22.8947L30.4584 26.7512V29.2917C30.4584 29.936 29.936 30.4584 29.2917 30.4584H14.7084C14.064 30.4584 13.5417 29.936 13.5417 29.2917Z"
            fill="#5C59E8"
          />
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="20"
            stroke="#EFEFFD"
            strokeWidth="4"
          />
        </svg>
        <p className="mb-4 text-center text-gray-500 ">
          Kéo thả ảnh vào đây hoặc bấm chọn tệp
        </p>
        <Input
          type={"file"}
          className={
            "w-full text-sm text-slate-500 file:mr-2 file:px-4 file:py-2 file:rounded-md file:border-none file:bg-blue-500 file:text-white file:hover:bg-blue-700 ease-in-out transition"
          }
        ></Input>
      </div>
    </div>
  );
}

export default InputFile;
