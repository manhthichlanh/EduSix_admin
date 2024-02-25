import Input from "@components/Input/Input"
import Menu from "@components/common/icon/Menu"
import Plus from "@components/common/icon/Plus"
import Button from "@components/Button/Button";
import { useState } from "react";
import { ServerApi } from "@utils/http";

export const AddNewLessonComponent = ({ sectionId }) => {
    const [inputText, setInputText] = useState("");
    const handleAddNewLesson = async () => {
        try {
            const body = {
                section_id: sectionId || 1,
                name: inputText, // Use the lessonName from formValue
                content: "", // Use the description from formValue
                lesson_type: 1,
            }
            await ServerApi.post("lesson", body);
            alert("Tạo mới thành công");
            return <></>
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex mb-6 px-4 py-3 bg-white w-full justify-between items-center border-2 border-gray-200">
            <div className="flex gap-2 w-full items-center mr-4">
                <Menu
                    width="20"
                    height="20"
                />
                <Input
                    type={"text"}
                    placeholder={"Tên bài học"}
                    className={
                        "w-full p-1 focus:border-b-indigo-500 focus:bg-gray-100 focus:border-b-2 focus:outline-none"
                    }
                    onChange={(event) => setInputText(event.target.value)}
                />
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                    <Button
                        text="Thêm mới"
                        Class="truncate flex gap-1 border-2 p-1"
                        Icon={<Plus width="20" height="20" stroke="#1D2026" />}
                        onClick={handleAddNewLesson}
                    />

                </div>
            </div>
        </div>
    )
}