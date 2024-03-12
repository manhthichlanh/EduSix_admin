// import React from "react";
import { useMemo, useState, useEffect, useRef  } from "react";
import Table from "rc-table";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Pencil from "../common/icon/Pencil";
import Trash from "../common/icon/Trash";
import { useQuery } from "react-query";
import { ServerApi, serverEndpoint } from "../../utils/http";
import ToastMessage from '../../utils/alert';
function TableCate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [editWindowOpen, setEditWindowOpen] = useState(false); 
  const [editedItem, setEditedItem] = useState(null); 
  const [selectedOrdinalNumber, setSelectedOrdinalNumber] = useState("");
  const inputFileRef = useRef(null);
  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; 


  const handlethumnailChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Lấy đường dẫn của hình ảnh
  
    const formData = new FormData();
    formData.append('logo_cate', file);
    setEditedItem({ ...editedItem, formData, imageUrl }); // Lưu đường dẫn của hình ảnh vào editedItem
  };

  const handleOpenEditWindow = (item) => {
    setEditedItem(item);
    setEditWindowOpen(true);
  };

  const handleCloseEditWindow = () => {
    setEditWindowOpen(false);
  };

  const fetchCategoryData = async () => {
    try {
      const response = await ServerApi.get("/category");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching category data");
    }
  };


 


  const { data: categoryData, isLoading, isError, refetch: triggerFetching } = useQuery('categoryData', fetchCategoryData);

  const dataArray = Array.isArray(categoryData) ? categoryData : [];
  useEffect(() => {
    if (dataArray.length > 0) {
      setSelectedOrdinalNumber(dataArray[0].ordinal_number);
    }
  }, [dataArray]);

  const handleEditConfirmation = async () => {
    try {
        // Log trước khi gọi API
        // console.log('Gọi API để chỉnh sửa item:', editedItem);
        if (!editedItem.cate_name || !editedItem.status || !editedItem.ordinal_number) {
          ToastMessage('Vui lòng nhập đầy đủ thông tin').warn();
          return; // Ngừng xử lý nếu có bất kỳ trường nào chưa được nhập
        }

      const formData = new FormData();
      formData.append('cate_name', editedItem.cate_name);
      formData.append('status', editedItem.status);
      formData.append('ordinal_number', editedItem.ordinal_number);
      if (editedItem.formData) {
        formData.append('logo_cate', editedItem.formData.get('logo_cate'));
      }
  
      const response = await ServerApi.patch(`/category/${editedItem.category_id}`, formData);
  
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


  const deleteCate = async (cateId) => {
    try {
      await ServerApi.delete(`/category/${cateId}`);
      triggerFetching();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };


  const handleOrdinalNumberChange = async (categoryId, ordinalNumber) => {
    try {
      const response = await ServerApi.patch(`/category/${categoryId}`, {
        ordinal_number: ordinalNumber,
      });
      await triggerFetching();
      ToastMessage('Thay đổi thứ tự danh mục thành công').success();

      const updatedData = [...categoryData];
      const updatedIndex = updatedData.findIndex((item) => item.category_id === categoryId);

      if (updatedIndex !== -1) {
        updatedData[updatedIndex] = { ...updatedData[updatedIndex], ordinal_number: ordinalNumber };
      }

    } catch (error) {
      console.error('Error updating ordinal_number: ', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Danh mục",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[50px] overflow-hidden bg-gray-300 rounded-lg">
            <img src={`${serverEndpoint}category/logo_cate/${item.logo_cate}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.cate_name}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Trạng thái",
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
        title: "Thứ tự hiển thị",
        key: "ordinal_number",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">
            <select
              value={item.ordinal_number}
              onChange={(e) => {
                setSelectedOrdinalNumber(e.target.value);
                handleOrdinalNumberChange(item.category_id, e.target.value);
              }}
              className="ml-2 p-1"
            >
              {Array.from(new Set(dataArray.map((item) => item.ordinal_number))).map((ordinal) => (
                <option key={ordinal} value={ordinal}>
                Hàng  {ordinal}
                </option>
              ))}
            </select>
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
              const shouldDelete = window.confirm(`Bạn có chắc muốn xóa danh mục: ${item.cate_name}?` );
              if (shouldDelete) {
                // Gọi hàm xóa
                deleteCate(item.category_id);
              }
            }}
          >
            <Trash className="text-gray-500  hover:text-red-500"></Trash>
          </button>
          </div>
        ),
      },
    ],
    [selectedOrdinalNumber]
  );

  const endIndex = currentPage * LIMIT;

  const onPageChange = (page) => {
    navigate({
      search: `?page=${page}`,
    });
  };

  return (
    <div className="border rounded-lg ">
      <div className="">
        <Table
          columns={columns}
          data={dataArray.slice((currentPage - 1) * LIMIT, endIndex).map((item, index) => ({ ...item, index }))}
          rowKey="id"
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
            <h2 className="text-center text-[20px] text-blue-500 font-[600]">Sửa Danh Mục: {editedItem.cate_name}</h2>
            <div className="mt-[10px] border-b-[3px] py-[10px] max-h-[500px] overflow-auto">
              <p className="mb-[10px]">
            <label>Tên:</label><br/>
            <input className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" placeholder="Nhập tên danh mục" type="text" value={editedItem.cate_name} onChange={(e) => setEditedItem({ ...editedItem, cate_name: e.target.value })} />
               </p>
              
               <p className="mb-[10px]">
               <label>Trạng thái:</label> <br/>
              <select className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" value={editedItem.status} onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value })}>
                <option value={true}>Đang bật</option>
                <option value={false}>Đang tắt</option>
              </select>
              </p>
            <p className="mb-[10px]">
            <label>Thứ tự:</label> <br/>
              <select className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" value={editedItem.ordinal_number} onChange={(e) => setEditedItem({ ...editedItem, ordinal_number: e.target.value })}>
                {Array.from(new Set(dataArray.map((item) => item.ordinal_number))).map((ordinal) => (
                  <option key={ordinal} value={ordinal}>
                    Hàng {ordinal}
                  </option>
                ))}
              </select>
            </p>
            <p>
            {(editedItem.logo_cate || editedItem.imageUrl) && (
  <div>
   <img
  src={editedItem.imageUrl || `${serverEndpoint}category/logo_cate/${editedItem.logo_cate}`}
  alt="Preview"
  style={{ maxWidth: '300px', maxHeight: '100%,', margin: 'auto', borderRadius: '5px' }}
/>
  </div>
)}
              <input
                id="thumnailInput"
                type="file"
                accept="image/*"
                onChange={handlethumnailChange}
                style={{ display: 'none' }}
                ref={inputFileRef}
              />
     <label htmlFor="thumnailInput" className="custom-file-upload">
  {/* {editedItem?.formData?.get('thumnail')?.file || 'Chọn tệp...'} */}
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

export default TableCate;
