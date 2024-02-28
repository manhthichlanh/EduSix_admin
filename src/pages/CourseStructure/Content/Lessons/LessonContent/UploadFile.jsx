import { useRef, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
const VideoWrapper = styled.div`
position: relative;
width: 100%;
padding-bottom: 56.25%;

max-height: 1080px; // Chiều cao tối đa là 1080px

> div {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
`;
export default function UploadFile() {
    const [selectedFile, setSelectedFile] = useState(null);
    const videoRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            // Load the video file into the video element for preview
            const fileURL = URL.createObjectURL(file);
            videoRef.current.src = fileURL;
        }
    };
    return (
        <div className="p-5">
            <div className="flex w-full">
                <div className="w-full border-2 border-gray-200 py-3 px-4 text-[#8C94A3]">
                    {selectedFile ? selectedFile.name : 'Chưa có tệp nào được chọn'}
                </div>
                <label htmlFor="fileInput" className="w-1/4 bg-[#E9EAF0] px-[72px] py-3 font-medium cursor-pointer">
                    Upload File
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            {/* Conditionally render the video element */}
            {selectedFile && (
                <div className="bg-[#000] max-w-[600px] m-auto mt-[20px]">

                    <VideoWrapper>
                        <div>
                            <ReactPlayer
                                url={URL.createObjectURL(selectedFile)}
                                width="100%"
                                height="100%"
                                controls={true}

                            />
                        </div>
                    </VideoWrapper>
                </div>
            )}
            <div className="py-4">
                <span className="font-medium">Lưu ý:</span> Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.
            </div>
        </div>
    )
}
