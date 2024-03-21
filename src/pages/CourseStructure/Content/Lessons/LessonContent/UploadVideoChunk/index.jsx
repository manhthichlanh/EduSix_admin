import { useEffect, useState, memo, useCallback } from "react";
import { ServerApi } from "@utils/http";
const UploadVideoChunk = () => {
    const [fileSelected, setFileSelected] = useState(null);
    const [chunkSize] = useState(5 * 1024 * 1024); // 5MB (adjust based on your requirements)
    const [chunkNumber, setChunkNumber] = useState(0);
    const [startChunk, setStartChunk] = useState(0);
    const [endChunk, setEndChunk] = useState(chunkSize);
    const [progress, setProgress] = useState(0);
    const [fileSize, setFileSize] = useState(0);

    console.log(progress)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            setFileSelected(file);
            setFileSize(file.size);
            // uploadNextChunk();
        }
    };
    const uploadCompleted = async () => {
        alert("Upload file hoàn thành!")
    }
    // const countT = useCallback(() => {
    //   setChunkNumber(chunkNumber+1);
    //   console.log(chunkNumber)
    // },[chunkNumber]);
    // useEffect(() => {
    //     setTimeout(() => {
    //         countT();
    //     },1000
    //     )
    // },[chunkNumber,countT])
    const uploadNextChunk = useCallback(async () => {
        console.log(`File info ${endChunk} ${fileSize}`)
        if (endChunk <= fileSize) {
            const chunk = fileSelected.slice(startChunk, endChunk);
            const totalChunks = Math.ceil(fileSize / chunkSize);
            const chunkProgress = 100 / totalChunks;
            const formData = new FormData();
            formData.append("chunk", chunk);
            formData.append("chunkNumber", chunkNumber);
            formData.append("totalChunks", totalChunks);
            formData.append("originalname", fileSelected.name);
            formData.append("videoObjectId", "a06708dbc7b457163095f9");

            try {
                await ServerApi.post("video/upload/chunks/" + chunkNumber, formData)
                const temp = `Chunk ${chunkNumber + 1
                    }/${totalChunks} uploaded successfully`;
                console.log(temp)
                setChunkNumber(chunkNumber + 1);
                setStartChunk(endChunk);
                setEndChunk(endChunk + chunkSize);
                if (chunkNumber == totalChunks) {
                    console.log('Process is complete, counter', chunkNumber)
                    await uploadCompleted();
                } else {
                    setProgress(Number((chunkNumber + 1) * chunkProgress));
                    await uploadNextChunk();
                }
            } catch (error) {
                console.error("Error uploading chunk:", error);
            }
        } else {
            setProgress(100);
        }
    },[fileSelected]);
    useEffect(() => {
        if (fileSelected) {
            uploadNextChunk();
          }
    }, [fileSelected, uploadNextChunk])


    return (
        <div className="p-5">
            <div className="flex w-full">
                <div className="w-full border-2 border-gray-200 py-3 px-4 text-[#8C94A3]">
                    Chưa có tệp nào được chọn
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

            <div className="py-4">
                <span className="font-medium">Lưu ý:</span> Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.
            </div>
        </div>
    )
}
export default memo(UploadVideoChunk);