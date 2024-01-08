/* eslint-disable react/prop-types */
const CardAnalytics = (props) => {
  const { title, content } = props;
  return (
    <div className="flex flex-col gap-2 px-6 py-4 border rounded-md shadow-md">
      <p className="text-base font-medium text-gray-500"> {title}</p>
      <p className="text-2xl font-medium whitespace-nowrap">{content}</p>
    </div>
  );
};

export default CardAnalytics;
