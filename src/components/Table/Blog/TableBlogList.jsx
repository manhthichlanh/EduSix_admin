import Table from "rc-table";
import { useMemo, useState, useRef, useEffect } from "react";
import Pencil from "@components/common/icon/Pencil";
import Trash from "@components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@components/common/Pagination";
import { ServerApi, serverEndpoint } from '../../../utils/http';
import ToastMessage from '../../../utils/alert';
import Jodit from "../../../components/Jodit/Jodit";
import { useQuery } from 'react-query';
function TableBlog({ data, triggerFetching }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; // Parse the current page from the URL
  const dataArray = Array.isArray(data) ? data : [];

  const { data: blogCateData } = useQuery("cateData", () => getBlogCategory());
  const { data: authorData } = useQuery("authorData", () => getAuthor());

  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (blogCateData && authorData) {
      // Kiểm tra nếu cả hai dữ liệu đã có sẵn
      setEditedItem((prevItem) => ({
        ...prevItem,
        blog_category_id: blogCateData[0]?.value || '', // Chọn giá trị đầu tiên nếu có
        author_id: authorData[0]?.value || '', // Chọn giá trị đầu tiên nếu có
      }));
    }
  }, [blogCateData, authorData]); // useEffect sẽ chạy lại khi có thay đổi trong các giá trị này

  const handlethumbnailChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Lấy đường dẫn của hình ảnh

    const formData = new FormData();
    formData.append('thumbnail', file);
    setEditedItem({ ...editedItem, formData, imageUrl }); // Lưu đường dẫn của hình ảnh vào editedItem
  };

  const handleOpenEditWindow = (item) => {
    setEditedItem(item.blog);
    setEditWindowOpen(true);
  };

  const handleCloseEditWindow = () => {
    setEditWindowOpen(false);
  };

  const handleEditConfirmation = async () => {
    try {
      // Log trước khi gọi API
      // console.log('Gọi API để chỉnh sửa item:', editedItem);
      if (!editedItem.name || !editedItem.status || !editedItem?.content || !editedItem.thumbnail) {
        ToastMessage('Vui lòng nhập đầy đủ thông tin').warn();
        return; // Ngừng xử lý nếu có bất kỳ trường nào chưa được nhập
      }
      // if (!editedItem.blog_category_id) {
      //   ToastMessage('Vui lòng nhập danh mục').warn();
      //   return;
      // }
      // if (!editedItem.author_id) {
      //   ToastMessage('Vui lòng nhập tác giả').warn();
      //   return;
      // }
      const formData = new FormData();
      formData.append('name', editedItem.name);
      formData.append('status', editedItem.status);
      formData.append('content', editedItem.content);
      formData.append('blog_category_id', editedItem.blog_category_id || ""); // Kiểm tra nếu không chọn, gán giá trị null
    formData.append('author_id', editedItem.author_id || ""); // Kiểm tra nếu không chọn, gán giá trị null
      if (editedItem.formData) {
        formData.append('thumbnail', editedItem.formData.get('thumbnail'));
      }

      const response = await ServerApi.patch(`/blog/${editedItem.blog_id}`, formData);

      // console.log('Phản hồi từ API sau khi chỉnh sửa:', response);

      if (response.status === 200) {
        await triggerFetching();
        ToastMessage('Chỉnh sửa thông tin thành công').success();
        handleCloseEditWindow();
      } else {
        ToastMessage('Đã xảy ra lỗi khi chỉnh sửa thông tin').error();
      }
    } catch (error) {
      console.error('Error updating item: ', error);
      ToastMessage('Đã xảy ra lỗi khi chỉnh sửa thông tin').error();
    }
  };


  const deleteBlog = async (blogId) => {
    try {
      await ServerApi.delete(`/blog/${blogId}`);
      triggerFetching();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  const columns = useMemo(
    () => [
      {
        title: "Blog",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[50px] overflow-hidden bg-gray-300 rounded-lg">
              <img src={`${serverEndpoint}blog/thumbnail/${item.blog.thumbnail}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px] w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                {item?.blog.name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Người Đăng",
render: (item) => (
  <div className="py-1 text-[#667085] font-medium">
    <div className="name">{item?.adminData ? item?.adminData?.fullname : item?.userData?.fullname}</div>
    <div className={`type text-[13px]  ${item?.adminData ? 'text-blue-500' : 'text-green-500'}`}>
      {item?.adminData ? "Admin" : "Người dùng"}
    </div>
  </div>
),
      },
      {
        title: "Danh mục bài viết",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.blogCategoryData ? (
            item?.blogCategoryData?.name_blog_category
            ) : ("Không có")}
          </div>
        ),
      },
      {
        title: "Tác giả",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.authorData ? (
            item?.authorData?.name_user
            ) : ("Không có")}
          </div>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.blog.status === true
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
                } rounded-lg`}
            >
              {item.blog.status === true ? "Đang bật" : "Đang tắt"}
            </p>
          </div>
        ),
      },
      {
        title: "Thao tác",
        render: (item) => (
          <div className="flex items-center gap-2">
            <button onClick={() => handleOpenEditWindow(item)}>
              <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
            </button>
            <button
              onClick={() => {
                // Hiển thị cảnh báo (confirm) trước khi xóa
                const shouldDelete = window.confirm(`Bạn có chắc muốn xóa bài viết: ${item.blog.name}?`);
                if (shouldDelete) {
                  // Gọi hàm xóa
                  deleteBlog(item.blog.blog_id);
                }
              }}
            >
              <Trash className="text-gray-500  hover:text-red-500"></Trash>
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const endIndex = currentPage * LIMIT;

  const onPageChange = (page) => {
    navigate({
      search: `?page=${page}`,
    });
  };



  const getBlogCategory = async () => {
    try {
      const response = await ServerApi.get("/blogCategory");
      const cateData = response.data;
      return cateData.map(item => ({ value: item.blog_category_id, text: item.name_blog_category }));
    } catch (error) {
      throw new Error("Error fetching blogcategory data");
    }
  };

  const getAuthor = async () => {
    try {
      const response = await ServerApi.get("/author");
      const authorData = response.data;
      return authorData.map(item => ({ value: item.author_id, text: item.name_user }));
    } catch (error) {
      throw new Error("Error fetching author data");
    }
  };

  return (
    <div className="">
      <div className="border rounded-lg">
        <Table
          columns={columns}
          data={dataArray.slice((currentPage - 1) * LIMIT, endIndex).map((item, index) => ({ ...item, index }))}
          rowKey={(record) => record.blog.blog_id} // Use the unique identifier for each row
          scroll={{
            x: true,
          }}
        />
      </div>
      <div className="flex items-center justify-end p-4">
        <Pagination
          limit={LIMIT}
          total={dataArray.length}
          current={currentPage} // Use the current page
          onChange={onPageChange}
        />
      </div>

      {editWindowOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[2]">
          <div className="bg-white p-[20px] rounded-lg w-[600px] m-[20px]">
            {/* Content of the edit window */}
            <h2 className="text-center text-[20px] text-blue-500 font-[600] truncate">Sửa bài viết: {editedItem.name}</h2>
            <div className="mt-[10px] border-b-[3px] py-[10px] max-h-[500px] overflow-auto">
              <p className="mb-[10px]">
                <label>Danh mục:</label> <br />
                <select
                  className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]"
                  value={editedItem.blog_category_id}
                  onChange={(e) => setEditedItem({ ...editedItem, blog_category_id: String(e.target.value) })}
                >
                   <option value={""}>Không chọn</option>
                  {blogCateData.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.text}
                    </option>
                  ))}
                </select>
              </p>
              <p className="mb-[10px]">
                <label>Tên:</label><br />
                <input
                  className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]"
                  placeholder="Nhập tên bài viết"
                  type="text"
                  value={editedItem.name} // Accessing name directly from editedItem
                  onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} // Update name under editedItem
                />
              </p>
              <p className="mb-[10px]">
                <label>Tác giả:</label> <br />


                <select
    className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]"
    value={editedItem.author_id}
    onChange={(e) => setEditedItem({ ...editedItem, author_id: e.target.value })}
>
    <option value={""}>Không chọn</option>
    {authorData.map((author) => (
        <option key={author.value} value={author.value}>
            {author.text}
        </option>
    ))}
</select>
              </p>

              <p className="mb-[10px]">
                <label>Nội dung:</label>
                <Jodit
                  // label={"h"}
                  className={"mt-[-25px]"}
                  placeholder={"Nhập nội dung"}
                  value={editedItem.content}
                  setValue={(content) => setEditedItem({ ...editedItem, content })}
                ></Jodit>

              </p>
              <p className="mb-[10px]">
                <label>Trạng thái:</label> <br />
                <select className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" value={editedItem.status} onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value })}>
                  <option value={true}>Đang bật</option>
                  <option value={false}>Đang tắt</option>
                </select>
              </p>
              <p>
                {(editedItem.thumbnail || editedItem.imageUrl) && (
                  <div>
                    <img
                      src={editedItem.imageUrl || `${serverEndpoint}blog/thumbnail/${editedItem.thumbnail}`}
                      alt="Pblog"
                      style={{ maxWidth: '300px', maxHeight: '100%,', margin: 'auto', borderRadius: '5px' }}
                    />
                  </div>
                )}
                <input
                  id="thumbnailInput"
                  type="file"
                  accept="image/*"
                  onChange={handlethumbnailChange}
                  style={{ display: 'none' }}
                  ref={inputFileRef}
                />
                <label htmlFor="thumbnailInput" className="custom-file-upload">
                  {/* {editedItem?.formData?.get('thumbnail')?.file || 'Chọn tệp...'} */}
                  <p className="bg-green-500 px-[10px] py-[5px] text-white w-[80px] text-center rounded-[5px] mt-[10px] m-auto">Sửa ảnh</p>
                </label>

              </p>
            </div>
            <div className="flex gap-[10px] justify-end">
              <button className="bg-blue-500 px-[10px] py-[5px] text-white w-[80px] text-center rounded-[5px] mt-[10px]" onClick={handleEditConfirmation}>Lưu</button>
              <button className="bg-blue-500 px-[10px] py-[5px] text-white w-[80px] text-center rounded-[5px] mt-[10px]" onClick={handleCloseEditWindow}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TableBlog;