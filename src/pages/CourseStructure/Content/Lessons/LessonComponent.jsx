import { useState } from "react"
import Input from "@components/Input/Input"
import Delete from "@components/common/icon/Delete"
import Menu from "@components/common/icon/Menu"
import PencilLine from "@components/common/icon/PencilLine"
import { ServerApi } from "@utils/http"
import SelectContentComponent from "./SelectContentComponent"
const defaultContent = {
    type: 0,
    headerText: "Nội dung"
}
const uploadVideoFile = {
    type: 1,
    headerText: "Video file",
}
const uploadVideoYoutube = {
    type: 2,
    headerText: "Video youtube",
}
const uploadQuizzes = {
    type: 3,
    headerText: "Thêm quizz",
}
const chooseContent = (calllback) => {
    return {
        callback: calllback,
        prevContentData: null,
        videofile: uploadVideoFile,
        youtubeURL: uploadVideoYoutube,
        quizzes: uploadQuizzes
    }
}

export const LessonComponent = ({ lessonItem }) => {
    const { name, lesson_id } = lessonItem;
    console.log({ lessonItem });
    const [inputValue, setInputValue] = useState(name);
    const [isActiveEdit, setIsActiveEdit] = useState(false);
    const [isOpenContent, setIsOpentContent] = useState(false);
    const [contentData, setContentData] = useState(defaultContent);
    const selectContentAction = () => {
        const options = chooseContent(setContentData);
        options.prevContentData = contentData;
        return options;
    };
    const handleEditLessonTitle = async () => {
        setIsActiveEdit(!isActiveEdit);
        if (inputValue?.trim() !== name) {
            try {
                await ServerApi.put("lesson/" + lesson_id, { name: inputValue?.trim() });
            } catch (error) {
                setInputValue(name);
                console.log(error)
            }
        }
    }
    const handleContentToggle = () => {
        setIsOpentContent(!isOpenContent)
        switch (contentData.type) {
            case 1:
                if (!contentData.videoFile) setContentData(defaultContent)
                break;
            case 2:
                if (!contentData.videoURL) setContentData(defaultContent)
                break;
            case 3:
                if (!contentData.quizzes.length === 0) setContentData(defaultContent)
                break;
            default:
                break;
        }
        return;
    }

    return (
        <div className="border-2 border-gray-200 mb-6">
            <div className={`flex px-4 ${isOpenContent ? "pt-3" : "py-3"} bg-white w-full justify-between items-center`}>
                <div className="flex gap-2 w-full items-center mr-4"
                >
                    <Menu
                        width="20"
                        height="20"
                    />
                    <Input
                        type={"text"}
                        value={inputValue}
                        disabled={!isActiveEdit}
                        placeholder={"Tên bài học"}
                        className={
                            "w-full p-1 focus:border-b-indigo-500 focus:bg-gray-100 focus:border-b-2 focus:outline-none"
                        }
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <div className={`flex items-center justify-center border-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 cursor-pointer relative after:absolute ${isOpenContent ? "after:bg-white" : ""} after:w-full after:h-1/2 after:mt-10`}
                        onClick={handleContentToggle}
                    >
                        <div className="font-medium text-[#17163A] whitespace-nowrap pr-2">{contentData.headerText}</div>
                        <svg
                            className={`${isOpenContent ? "rotate-45" : ""} transition-transform duration-500 transform origin-center`}
                            fill="#17163A"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
                            <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
                        </svg>
                    </div>
                    <PencilLine
                        width="20"
                        height="20"
                        isedit={isActiveEdit?.toString()}
                        stroke="#1D2026"
                        className="cursor-pointer"
                        onClick={handleEditLessonTitle}

                    />
                    <Delete
                        width="20"
                        height="20"
                        className="cursor-pointer"
                    />
                </div>

            </div>
            {isOpenContent && <div className="border-b-2 border-gray-200"></div>
            }
            {isOpenContent && <SelectContentComponent selectContentAction={selectContentAction} />}
        </div>
    )
}