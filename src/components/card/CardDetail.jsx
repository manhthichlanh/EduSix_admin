import AddTime from "../common/icon/Cart/AddTime";
import Email from "../common/icon/Cart/Email";
import Lock from "../common/icon/Cart/Lock";

const CardDetail = (props) => {
  const { image, name, userId, email, addTime } = props;
  return (
    <div className="w-full border border-gray-200 p-2 pb-6 rounded-lg select-none">
      <div className="w-full bg-blue-500 rounded-lg relative h-36 mb-16">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-gray-200 rounded-full">
          {image}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col text-center pt-2">
        <h4 className="flex items-center gap-2 text-xl font-medium capitalize leading-[24px] tracking-[0.5%] mb-2">
          {name}
        </h4>
        <span className="text-sm font-medium text-gray-400 tracking-[0.5%] leading-[18px]">
          @ImissYou
        </span>
      </div>
      <div className="block w-full h-[1.5px] bg-gray-200 my-4"></div>
      <div className="">
        <div className="flex items-start gap-2 py-3">
          <Lock></Lock>
          <div>
            <p className="font-semibold text-[#4D5464]">UserID</p>
            <p className="font-semibold ">{userId}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 py-3">
          <Email></Email>
          <div>
            <p className="font-semibold text-[#4D5464]">Email</p>
            <p className="font-semibold ">{email}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 py-3">
          <AddTime></AddTime>
          <div>
            <p className="font-semibold text-[#4D5464]">Sign up time</p>
            <p className="font-semibold ">{addTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardDetail;
