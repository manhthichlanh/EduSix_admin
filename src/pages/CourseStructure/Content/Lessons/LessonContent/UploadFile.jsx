import { useState } from "react";
import { ServerApi } from "@utils/http";
import Close from '@components/common/icon/Close'
import { useMutation } from "react-query";
import { useSocket } from "@services/SocketService";
import moment from "moment";
export default function UploadFile({lesson_id}) {
    const { socket } = useSocket();
    const [progress, setProgress] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [fileData, setFileData] = useState(null);
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (form_data) => {
            return ServerApi.post('video/stream/create', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Socket-ID': `${socket.id}`
                },
            });
        },
        onMutate: (context) => {
            setFileData(context.file_videos);
            socket.on("process_info", (info) => {
                setIsPending(true);
                setProgress(info.progress_percent);
            })
        },
        onError: (error, variables, context) => {
            // An error happened!
            console.log(`rolling back optimistic update with id ${context.id}`, error);
            setIsPending(false);
        },
        onSuccess: (data, variables, context) => {
            console.log({ data, variables, context })
            setIsPending(false);
        },
    })
    console.log({ isSuccess, isError })
    const UploadStatus = () => {
        return (
            <div className="p-5">
                <div className="relative overflow-x-auto flex">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-md text-gray-700  bg-white dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên file
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kiểu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày đăng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {fileData.name}
                                </th>
                                <td className="px-6 py-4">
                                    {fileData.type}
                                </td>
                                <td className="px-6 py-4">
                                    {
                                        isPending && (
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                    <div className="bg-[#5C59E8] h-2.5 rounded-full m-0 p-0" style={{ width: `${progress}%` }}></div>

                                                </div>
                                                <span className="ml-2 text-sm font-medium text-[#5C59E8] dark:text-white">{Number.parseInt(progress)}%</span>
                                            </div>
                                        )
                                    }
                                    {
                                        isSuccess && (
                                            <h1>Thành công</h1>
                                        )
                                    }
                                </td>
                                <td className="px-6 py-4">
                                    {moment().format("DD-MM-YYYY")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="px-6 my-auto">
                        <Close
                            className="cursor-pointer"
                            width="20px"
                            height="20px"
                            onClick={()=>{
                                socket.emit("process-action", { actionId: 3, actionName: "Cancel" })
                            }}
                        />
                    </div>
                </div>
            </div>);
    }
    const UploadVideo = () => {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                console.log(file);
                mutate({ file_videos: file, lesson_id, lesson_type: 1 })
            }
        };
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
    const renderUploadFileContent = () => {
        if (!lesson_id) return <h1>Không tìm thấy được id của bài học!</h1>
        switch (true) {
            case isPending:
                return UploadStatus()
            case isSuccess:
                return UploadStatus()
            default:
                return UploadVideo();
        }
    }
    return renderUploadFileContent()

}
