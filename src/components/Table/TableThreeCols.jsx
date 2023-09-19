import Button from "../button/Button";
const data = [
  {
    course: "HTML, CSS",
    status: "inactive",
  },
  {
    course: "JavaScript",
    status: "inactive",
  },
  {
    course: "ReactJS",
    status: "active",
  },
  {
    course: "AngularJS",
    status: "active",
  },
];

function TableThreeCols({ column1Title, column2Title, column3Title }) {
  return (
    <div className="mx-6 my-6 overflow-hidden border rounded-lg">
      <table className="w-full table-auto">
        <thead className="bg-neutral-100">
          <tr className="font-sans rounded-lg">
            <td className="px-6 py-4 font-medium">{column1Title}</td>
            <td className="px-6 py-4 font-medium">{column2Title}</td>
            <td className="px-6 py-4 font-medium">{column3Title}</td>
          </tr>
        </thead>
        <tbody className="rounded-xl">
          {data.map((item, index) => (
            <tr key={index} className="transition hover:bg-neutral-100">
              <td className="px-6 py-6 font-medium text-gray-600">
                {item.course}
              </td>
              <td className="px-6 py-6 ">
                <p
                  className={`py-2 px-4 inline-block justify-center items-center font-medium ${
                    item.status === "active"
                      ? "text-red-500 bg-red-50"
                      : "text-blue-500 bg-blue-50"
                  } rounded-lg`}
                >
                  {item.status === "active" ? "Video youtube" : "Video tải lên"}
                </p>
              </td>
              <td className="px-6 py-6 font-medium text-gray-500 ">
                <div className="flex gap-2">
                  <Button
                    Icon={function Icon() {
                      return (
                        <svg
                          className="text-gray-500 fill-current hover:text-yellow-400"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.7656 8.18414C21.9372 7.01257 21.9372 5.11307 20.7656 3.9415L20.0585 3.23439C18.887 2.06282 16.9875 2.06282 15.8159 3.23439L4.42916 14.6211C4.01548 15.0348 3.73179 15.5604 3.61299 16.1333L2.80932 20.0085C2.66319 20.7131 3.28687 21.3368 3.99155 21.1907L7.86677 20.387C8.43962 20.2682 8.96523 19.9845 9.37892 19.5709L20.7656 8.18414ZM19.3514 5.35571L18.6443 4.64861C18.2538 4.25808 17.6206 4.25808 17.2301 4.64861L16.1694 5.7093L18.2907 7.83062L19.3514 6.76993C19.742 6.3794 19.742 5.74624 19.3514 5.35571ZM16.8765 9.24483L14.7552 7.12351L5.84337 16.0353C5.70548 16.1732 5.61092 16.3484 5.57132 16.5394L5.07698 18.923L7.46065 18.4287C7.6516 18.3891 7.82681 18.2945 7.9647 18.1567L16.8765 9.24483Z"
                          />
                        </svg>
                      );
                    }}
                    onClick={() =>
                      console.log("When I return, I will be a man.")
                    }
                  ></Button>
                  <Button
                    Icon={function () {
                      return (
                        <svg
                          className="text-gray-500 fill-current hover:text-red-600"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 9.75C10.5523 9.75 11 10.1977 11 10.75V16.75C11 17.3023 10.5523 17.75 10 17.75C9.44772 17.75 9 17.3023 9 16.75V10.75C9 10.1977 9.44772 9.75 10 9.75Z" />
                          <path d="M15 10.75C15 10.1977 14.5523 9.75 14 9.75C13.4477 9.75 13 10.1977 13 10.75V16.75C13 17.3023 13.4477 17.75 14 17.75C14.5523 17.75 15 17.3023 15 16.75V10.75Z" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18 6V5C18 3.34315 16.6569 2 15 2H9C7.34315 2 6 3.34315 6 5V6H4.5C3.94772 6 3.5 6.44772 3.5 7C3.5 7.55228 3.94772 8 4.5 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H19.5C20.0523 8 20.5 7.55228 20.5 7C20.5 6.44772 20.0523 6 19.5 6H18ZM15 4H9C8.44772 4 8 4.44772 8 5V6H16V5C16 4.44772 15.5523 4 15 4ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z"
                          />
                        </svg>
                      );
                    }}
                    onClick={() =>
                      console.log("Then stop being my friend and be my lover")
                    }
                  ></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TableThreeCols;
