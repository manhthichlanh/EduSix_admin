import React, { useMemo, useState, useEffect } from "react";
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

const TableBanner = ({ data, isLoading, isError }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const LIMIT = 3;
  const currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; // Parse the current page from the URL
  const [selectedOrdinalNumber, setSelectedOrdinalNumber] = useState("");
  
  
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

  const updateOrdinalNumber = async (bannerId, ordinalNumber) => {
    const response = await ServerApi.patch(`/banner/${bannerId}`, {
      ordinal_number: ordinalNumber,
    });
  
    if (!response.ok) {
      throw new Error('Failed to update ordinal_number');
    }
  
    return response.data; // Adjust this based on your API response structure
  };

  const handleOrdinalNumberChange = async (bannerId, ordinalNumber) => {
    try {
      const response = await ServerApi.patch(`/banner/${bannerId}`, {
        ordinal_number: ordinalNumber,
      });
      ToastMessage('Thay đổi thứ tự banner thành công').success();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
      
      if (!response.ok) {
        throw new Error('Failed to update ordinal_number');
      }

      // Clone the data array before modifying it
      const updatedData = [...data];
      const updatedIndex = updatedData.findIndex((item) => item.id === bannerId);

      if (updatedIndex !== -1) {
        updatedData[updatedIndex] = { ...updatedData[updatedIndex], ordinal_number: ordinalNumber };
      }

    } catch (error) {
      console.error('Error updating ordinal_number: ', error);
    }
  };

  const handleStatusChange = async (bannerId, newStatus) => {
    try {
      const response = await ServerApi.patch(`/banner/${bannerId}`, {
        status: newStatus,
      });
  
      ToastMessage('Cập nhật trạng thái banner thành công').success();
  
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
  
      const updatedData = [...data];
      const updatedIndex = updatedData.findIndex((item) => item.id === bannerId);
  
      if (updatedIndex !== -1) {
        updatedData[updatedIndex] = { ...updatedData[updatedIndex], status: newStatus };
      }
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  const { mutate: mutateOrdinalNumberQuery } = useMutation(updateOrdinalNumber, {
    onSuccess: () => {
      ToastMessage('Thay đổi thứ tự banner thành công').success();
      queryClient.invalidateQueries('banners'); // Assuming you have a query key for your banners data
    },
    onError: (error) => {
      console.error('Error updating ordinal_number: ', error);
    },
  });
  
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
                  {ordinal}
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
            <button
              onClick={() =>
                navigate(`/add-banner?bannerId=${item.id}`, {
                  state: { courseName: item.name, courseId: item.course_id },
                })
              }
            >
              <Pencil className="text-gray-500 hover:text-orange-600"></Pencil>
            </button>
            <button>
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
  </DndProvider>
  );
}

export default TableBanner;