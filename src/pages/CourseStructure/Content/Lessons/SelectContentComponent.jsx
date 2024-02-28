import File from "@components/common/icon/File"
import Youtube from "@components/common/icon/Youtube"
import Quizz from "@components/common/icon/Quizz"
import YoutubeURL from "./LessonContent/YoutubeURL"
import UploadFile from "./LessonContent/UploadFile";
export default function SelectContentComponent({ selectContentAction }) {
    const { prevContentData, callback, quizzes, videofile, youtubeURL } = selectContentAction();
    const { type } = prevContentData;
    const renderHtml = () => {
        switch (type) {
            case 0:
                return (
                    <div className="py-[20px] flex flex-col items-center">
                        <div className="pb-6">Chọn loại nội dung</div>
                        <div className="flex gap-10">
                            <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3"
                                onClick={() => callback(videofile)}
                            >
                                <File
                                    width="36" height="36"
                                />
                                <div className="pt-2 text-[14px]">Upload File</div>
                            </div>
                            <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3"
                                onClick={() => callback(youtubeURL)}

                            >
                                <Youtube
                                    width="36" height="36"
                                />
                                <div className="pt-2 text-[14px]">Youtube</div>
                            </div>
                            <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3"
                                onClick={() => callback(quizzes)}
                            >
                                <Quizz
                                    width="36" height="36"
                                />
                                <div className="pt-2 text-[14px]">Quizz</div>
                            </div>
                        </div>

                    </div>
                )
            case 1:
                return <UploadFile />;
            case 2:
                return <YoutubeURL callback={callback} youtubeURL={youtubeURL} />;
            default:
                break;
        }
    }

    return (
        <>
            {
                (
                    () => renderHtml()
                )()
            }
        </>
    )
}
