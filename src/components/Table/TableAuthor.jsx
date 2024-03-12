import { useMemo, useState, useEffect, useRef  } from "react";
import Table from "rc-table";
import Pencil from "../../components/common/icon/Pencil";
import Trash from "../../components/common/icon/Trash";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { ServerApi, serverEndpoint } from '../../utils/http';
import ToastMessage from '../../utils/alert';

function TableAuthor({ data, triggerFetching }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; // Parse the current page from the URL
  const dataArray = Array.isArray(data) ? data : [];
  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null); 
  const inputFileRef = useRef(null);

  const handlethumbnailChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Lấy đường dẫn của hình ảnh
  
    const formData = new FormData();
    formData.append('thumbnail', file);
    setEditedItem({ ...editedItem, formData, imageUrl }); // Lưu đường dẫn của hình ảnh vào editedItem
  };

  const handleOpenEditWindow = (item) => {
    setEditedItem(item);
    setEditWindowOpen(true);
  };

  const handleCloseEditWindow = () => {
    setEditWindowOpen(false);
  };

  const handleEditConfirmation = async () => {
    try {
        // Log trước khi gọi API
        // console.log('Gọi API để chỉnh sửa item:', editedItem);
        if (!editedItem.name_user || !editedItem.status || !editedItem.thumbnail) {
          ToastMessage('Vui lòng nhập đầy đủ thông tin').warn();
          return; // Ngừng xử lý nếu có bất kỳ trường nào chưa được nhập
        }
      const formData = new FormData();
      formData.append('name_user', editedItem.name_user);
      formData.append('status', editedItem.status);
      formData.append('ordinal_number', editedItem.ordinal_number);
      if (editedItem.formData) {
        formData.append('thumbnail', editedItem.formData.get('thumbnail'));
      }
  
      const response = await ServerApi.patch(`/author/${editedItem.author_id}`, formData);
  
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


  const deleteAuthor = async (authorId) => {
    try {
      await ServerApi.delete(`/author/${authorId}`);
      triggerFetching();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
  
  const columns = useMemo(
    () => [
      {
        title: "Tác giả",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[50px]  overflow-hauthor_idden bg-gray-300 rounded-lg">
            <img src={`${serverEndpoint}author/thumbnail/${item.thumbnail}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.name_user}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (item) => (
          <div className="py-1">
            <p
              className={`py-1 px-3 inline-block font-medium whitespace-nowrap ${item.status === true
                ? "text-emerald-700 bg-red-100"
                : "text-orange-600 bg-emerald-100"
                } rounded-lg`}
            >
              {item.status === true? "Đang bật" : "Đang tắt"}
            </p>
          </div>
        ),
      },
      {
        title: "Thời gian tạo",
        render: (item) => (
          <div className="flex items-center gap-2">
            
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px] py-1 text-[#667085] font-medium">
                {item?.created_at}
              </p>
            </div>
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
              const shouldDelete = window.confirm(`Bạn có chắc muốn xóa tác giả: ${item.name_user}?` );
              if (shouldDelete) {
                // Gọi hàm xóa
                deleteAuthor(item.author_id);
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
  return (
    <div className="">
      <div className="border rounded-lg">
      <Table
       
        columns={columns}
        data={dataArray.slice((currentPage - 1) * LIMIT, endIndex).map((item, index) => ({ ...item, index }))}
        rowKey="author_id"
        scroll={{
          x: true,
        }}
      ></Table>
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
            <h2 className="text-center text-[20px] text-blue-500 font-[600]">Sửa tác giả: {editedItem.name_user}</h2>
            <div className="mt-[10px] border-b-[3px] py-[10px] max-h-[500px] overflow-auto">
              <p className="mb-[10px]">
            <label>Tên:</label><br/>
               <input className="w-[100%] border-solauthor_id border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" placeholder="Nhập tên tác giả" type="text" value={editedItem.name_user} onChange={(e) => setEditedItem({ ...editedItem, name_user: e.target.value })} />
               </p>
               <p className="mb-[10px]">
               <label>Trạng thái:</label> <br/>
              <select className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" value={editedItem.status} onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value })}>
                <option value={true}>Đang bật</option>
                <option value={false}>Đang tắt</option>
              </select>
              </p>
            <p>
            {(editedItem.thumbnail || editedItem.imageUrl) && (
  <div>
   <img
  src={editedItem.imageUrl || `${serverEndpoint}author/thumbnail/${editedItem.thumbnail}`}
  alt="Preview"
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
export default TableAuthor;