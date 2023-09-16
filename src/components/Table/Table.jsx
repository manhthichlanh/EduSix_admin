// Dữ liệu giả
const data = [
  {
    course: "HTML, CSS",
    sku: "00001",
    lesson: "1000",
    views: "10000",
    price: "0",
    status: "inactive",
  },
  {
    course: "JavaScript",
    sku: "00002",
    lesson: "800",
    views: "150",
    price: "1.200.000",
    status: "inactive",
  },
  {
    course: "ReactJS",
    sku: "00003",
    lesson: "1200",
    views: "200",
    price: "0",
    status: "active",
  },
  {
    course: "AngularJS",
    sku: "00004",
    lesson: "1200",
    views: "200",
    price: "1.000.000",
    status: "active",
  },
];

export default function Table() {
  return (
    <div className="border rounded-lg m-6">
      <div className="flex items-center justify-between px-6 py-5 ">
        <div className="text-lg font-medium">Thống kê</div>
        <button className="flex items-center justify-center px-4 py-2 font-medium transition border-2 rounded-lg hover:bg-blue-200">
          <img
            className=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAKlJREFUSEvtlcsNgzAQBYcOUgIlUEJSGVAZlJASUgIdJPLNsgV6hiULklfyxcJvVoM/DU7VOHGp4L+Zr6rdVT+NO5jTvLV//DUGZ5zLgd1UG5vO45Rz/AC6wk7ewLK1RgEH7VMh+AVkOznOuDTYTXWhZe1zRXWa1AJhxPUBwpBrD3gA+oQwAmFerluB3VTLOo9eICYg9Vk8BVZ6c53SxJ5dbdJIBZtoVEJ+uZMUH0bSsx4AAAAASUVORK5CYII="
          />
          <div>Filter</div>
        </button>
      </div>
      <table className="w-full mb-8 table-auto">
        <thead className="bg-neutral-100">
          <tr className="font-sans rounded-lg">
            <td className="px-6 py-4 font-medium">Khóa học</td>
            <td className="px-6 py-4 font-medium">Bài học</td>
            <td className="px-6 py-4 font-medium">Lượt xem</td>
            <td className="px-6 py-4 font-medium">Giá</td>
            <td className="px-6 py-4 font-medium text-center">Trạng thái</td>
          </tr>
        </thead>
        <tbody className="rounded-xl">
          {data.map((item, index) => (
            <tr
              key={index}
              className="transition border-t-2 border-b-2 hover:bg-neutral-100"
            >
              <td className="px-6 py-4">
                <div>
                  <div className="text-base font-medium">{item.course}</div>
                  <div className="mt-1 text-medium text-stone-400">
                    SKU: {item.sku}
                  </div>
                </div>
              </td>
              <td className="px-6 py-6 font-medium text-gray-500 ">
                {item.lesson}
              </td>
              <td className="px-6 py-6 font-medium text-gray-500">
                {item.views}
              </td>
              <td
                className={`px-6 py-6 font-bold min-h-60 ${
                  item.price === "0" ? "text-gray-500" : "text-red-500"
                }`}
              >
                {item.price === "0" ? "Miễn phí" : item.price}
              </td>
              <td className="flex items-center justify-center px-2 py-6">
                <p
                  className={`py-1 px-2 inline-block justify-center items-center font-medium ${
                    item.status === "active"
                      ? "text-green-600 bg-gray-200"
                      : "text-red-700 bg-gray-200"
                  } rounded-lg`}
                >
                  {item.status === "active" ? "Activated" : "Inactivate"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between px-6 py-2 space-x-2">
        <div className="font-medium text-gray-500 ">Showing 1-5 from 15</div>
        <div className="flex items-center justify-between gap-3 mx-auto">
          <button className="px-3 py-2 transition duration-300 bg-transparent border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white ">
            {"<"}
          </button>
          <button className="inline-block px-3 py-2 transition duration-300 bg-transparent border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white">
            1
          </button>

          <button className="px-3 py-2 transition duration-300 bg-transparent border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white">
            2
          </button>
          <button className="px-3 py-2 transition duration-300 bg-transparent border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white">
            3
          </button>
          <button className="px-3 py-2 transition duration-300 bg-transparent border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white"></button>
        </div>
      </div>
    </div>
    // <div className="w-40 h-40 bg-black rounded-lg"></div>
  );
}
