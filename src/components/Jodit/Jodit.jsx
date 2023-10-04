import { useState, useRef, } from 'react';
import JoditEditor from 'jodit-react';
import "./Jodit.scss";
const Jodit = ({label, placeholder,}) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config={
        // Cấu hình Jodit ở đây (nếu cần)
        placeholder:placeholder,
    }
    const handleContentChange = (newContent) => {
        // Xử lý nội dung khi thay đổi
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
        </div>
    );
};

export default Jodit;