import { useMemo, useState, useEffect, useRef  } from "react";
import Table from "rc-table";
import Pencil from "../../components/common/icon/Pencil";
import Trash from "../../components/common/icon/Trash";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ServerApi, serverEndpoint } from '../../utils/http';
import ToastMessage from '../../utils/alert';
import { useMutation, useQueryClient } from 'react-query';

const DraggableBodyRow = ({ index, moveRow, ...restProps }) => {
  const [, drop] = useDrop({
    accept: "table-row",
    hover: (item, monitor) => {
      if (!restProps.draggable) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = monitor.getClientOffset();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "table-row",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  return (
    <tr ref={(node) => drag(drop(node))} style={{ opacity }} {...restProps} />
  );
};

const TableBanner = ({ data, isLoading, isError, triggerFetching }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; 
  const [selectedOrdinalNumber, setSelectedOrdinalNumber] = useState("");
  const [editWindowOpen, setEditWindowOpen] = useState(false); // State to track if the edit window is open
  const [editedItem, setEditedItem] = useState(null); // State to store the item being edited

  const inputFileRef = useRef(null); // Create a ref for the input file element

  const handlethumnailChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Lấy đường dẫn của hình ảnh
  
    const formData = new FormData();
    formData.append('thumnail', file);
    setEditedItem({ ...editedItem, formData, imageUrl }); // Lưu đường dẫn của hình ảnh vào editedItem
  };
  const moveRow = (dragIndex, hoverIndex) => {
    const newData = [...data];
    const draggedRow = newData[dragIndex];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, draggedRow);
  };

  const dataArray = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (dataArray.length > 0) {
      setSelectedOrdinalNumber(dataArray[0].ordinal_number);
    }
  }, [dataArray]);

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
        if (!editedItem.name_banner || !editedItem.link || !editedItem.status || !editedItem.ordinal_number) {
          ToastMessage('Vui lòng nhập đầy đủ thông tin').warn();
          return; // Ngừng xử lý nếu có bất kỳ trường nào chưa được nhập
        }
      const formData = new FormData();
      formData.append('name_banner', editedItem.name_banner);
      formData.append('link', editedItem.link);
      formData.append('status', editedItem.status);
      formData.append('ordinal_number', editedItem.ordinal_number);
      if (editedItem.formData) {
        formData.append('thumnail', editedItem.formData.get('thumnail'));
      }
  
      const response = await ServerApi.patch(`/banner/${editedItem.id}`, formData);
  
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



  const handleStatusChange = async (bannerId, newStatus) => {
    try {
      const response = await ServerApi.patch(`/banner/${bannerId}`, {
        status: newStatus,
      });
      await triggerFetching();
      ToastMessage('Cập nhật trạng thái banner thành công').success();
      const updatedData = [...data];
      const updatedIndex = updatedData.findIndex((item) => item.id === bannerId);

      if (updatedIndex !== -1) {
        updatedData[updatedIndex] = { ...updatedData[updatedIndex], status: newStatus };
      }
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  const handleOrdinalNumberChange = async (bannerId, ordinalNumber) => {
    try {
      const response = await ServerApi.patch(`/banner/${bannerId}`, {
        ordinal_number: ordinalNumber,
      });
      await triggerFetching();
      ToastMessage('Thay đổi thứ tự banner thành công').success();

      const updatedData = [...data];
      const updatedIndex = updatedData.findIndex((item) => item.id === bannerId);

      if (updatedIndex !== -1) {
        updatedData[updatedIndex] = { ...updatedData[updatedIndex], ordinal_number: ordinalNumber };
      }

    } catch (error) {
      console.error('Error updating ordinal_number: ', error);
    }
  };


  const deleteBanner = async (bannerId) => {
    try {
      await ServerApi.delete(`/banner/${bannerId}`);
      triggerFetching();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Banner",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 w-[100px]  overflow-hidden bg-gray-300 rounded-lg">
              <img src={`${serverEndpoint}banner/thumnail/${item.thumnail}`} alt="" />
            </div>
            <div className="">
              <p className="capitalize font-medium text-base leading-[20px]">
                {item?.name_banner}
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "ID",
        key: "id",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">{item.id}</div>
        ),
      },
      {
        title: "Link",
        render: (item) => (
          <div className="py-1 text-[#667085] font-medium">
            {item?.link}
          </div>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (item) => (
          <div className="py-1">
            <label className="switch">
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => handleStatusChange(item.id, !item.status)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ),
      },
      {
        title: "Ordinal Number",
        key: "ordinal_number",
        render: (item) => (
          <div className="py-1 text-[#5C59E8] font-medium">
            <select
              value={item.ordinal_number}
              onChange={(e) => {
                setSelectedOrdinalNumber(e.target.value);
                handleOrdinalNumberChange(item.id, e.target.value);
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
              const shouldDelete = window.confirm(`Bạn có chắc muốn xóa banner: ${item.name_banner}?` );
              if (shouldDelete) {
                // Gọi hàm xóa
                deleteBanner(item.id);
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

  // Calculate the correct endIndex based on the current page and LIMIT
  const endIndex = currentPage * LIMIT;

  const onPageChange = (page) => {
    navigate({
      search: `?page=${page}`,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border rounded-lg">
        {/* Add a selector for ordinal numbers */}
        <Table
          components={{
            body: {
              row: (props) => <DraggableBodyRow draggable moveRow={moveRow} {...props} />,
            },
          }}
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
            <h2 className="text-center text-[20px] text-blue-500 font-[600]">Sửa Banner: {editedItem.name_banner}</h2>
            <div className="mt-[10px] border-b-[3px] py-[10px] max-h-[500px] overflow-auto">
              <p className="mb-[10px]">
            <label>Tên:</label><br/>
               <input className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" placeholder="Nhập tên banner" type="text" value={editedItem.name_banner} onChange={(e) => setEditedItem({ ...editedItem, name_banner: e.target.value })} />
               </p>
               <p className="mb-[10px]">
               <label>Đường dẫn:</label> <br/>
               <input className="w-[100%] border-solid border-2 border-indigo-600 p-[10px] rounded-[5px] my-[5px]" placeholder="Nhập đường dẫn" type="text" value={editedItem.link} onChange={(e) => setEditedItem({ ...editedItem, link: e.target.value })} />
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
            {(editedItem.thumnail || editedItem.imageUrl) && (
  <div>
   <img
  src={editedItem.imageUrl || `${serverEndpoint}banner/thumnail/${editedItem.thumnail}`}
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
    </DndProvider>
  );
}

export default TableBanner;
