import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import "./Jodit.scss";

const Jodit = ({ label, placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = {
        // Cấu hình Jodit ở đây (nếu cần)
        placeholder: placeholder,
    };

    const handleContentChange = (newContent) => {
        // Xử lý nội dung khi thay đổi
    };

    const handleGetLine = () => {
        // Sử dụng JavaScript để truy cập phần tử JoditEditor
        const joditEditor = editor.current.editor;
        // Lấy nội dung hiện tại trong JoditEditor
        const currentContent = joditEditor.value;

        // Tìm dòng cụ thể mà bạn muốn lấy
        const specificLine = currentContent.split('\n')[N]; // Thay N bằng số dòng bạn muốn lấy
        console.log(specificLine);
    };

    return (
        <div className='Jodit_mota'>
            <label htmlFor="" className="text-base font-medium text-gray-500">{label}</label>
            <div className='Jodit'>
                <JoditEditor
                    ref={editor}
                    onChange={handleContentChange}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                />
            </div>
            <button onClick={handleGetLine}>Lấy dòng cụ thể</button>
        </div>
    );
};

export default Jodit;
