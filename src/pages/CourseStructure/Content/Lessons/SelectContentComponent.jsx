import File from "@components/common/icon/File"
import Youtube from "@components/common/icon/Youtube"
import Quizz from "@components/common/icon/Quizz"
export default function SelectContentComponent() {
    return (
        <div className="py-[20px] flex flex-col items-center border-t-2 border-gray-200">
            <div className="pb-6">Chọn loại nội dung</div>
            <div className="flex gap-10">
                <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
                    <File
                        width="36" height="36"
                    />
                    <div className="pt-2 text-[14px]">Upload File</div>
                </div>
                <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
                    <Youtube
                        width="36" height="36"
                    />
                    <div className="pt-2 text-[14px]">Youtube</div>
                </div>
                <div className="flex cursor-pointer flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
                    <Quizz
                        width="36" height="36"
                    />
                    <div className="pt-2 text-[14px]">Quizz</div>
                </div>
            </div>

        </div>
    )
}
