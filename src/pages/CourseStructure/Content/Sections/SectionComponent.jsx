import { useState } from "react";
import { ServerApi } from "@utils/http";
import Menu from "@components/common/icon/Menu";
import Input from "@components/Input/Input"
import Plus from "@components/common/icon/Plus";
import PencilLine from "@components/common/icon/PencilLine";
import Delete from "@components/common/icon/Delete";
import { AddNewLessonComponent } from "../Lessons/AddNewLessonComponent";
import { LessonComponent } from "../Lessons/LessonComponent";

export const SectionComponent = ({ currentSectionData, index }) => {
    const { name, section_id, lessons } = currentSectionData;
    console.log({ lessons })
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState(name);
    const [isAddNewLesson, setIsAddNewLesson] = useState(false);
    const handleEditSectionTitle = async () => {
        setIsEdit(!isEdit);
        if (inputValue?.trim() !== name) {
            try {
                await ServerApi.put("section/" + section_id, { name: inputValue?.trim() });
            } catch (error) {
                setInputValue(name);
                console.log(error)
            }
        }
    }
    const handleChangeTitleInput = (event) => {
        const value = event.target.value;
        setInputValue(value);
    }
    const handleToggleNewLesson = () => {
        setIsAddNewLesson(!isAddNewLesson);
    }

    return (
        <div className="px-6 my-6 bg-white  border-2 border-gray-200">
            <div className="py-4">
                <div className="flex bg-white w-full justify-between items-center">
                    <div className="flex gap-2 w-full mr-4 items-center">
                        <Menu width="24" height="24" />
                        <div className="text-[#1D2026] font-medium whitespace-nowrap ">Phần {index + 1}:</div>
                        <Input
                            type={"text"}
                            disabled={!isEdit}
                            value={inputValue}
                            onChange={handleChangeTitleInput}
                            className={
                                "w-full  py-2  focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
                            }
                        />
                    </div>

                    <div className="flex gap-2">
                        <Plus width="24" height="24" stroke={isAddNewLesson ? "red" : "#1D2026"} className={`cursor-pointer hover:${isAddNewLesson ? "opacity-50" : "stroke-[#007bff]"} ${isAddNewLesson ? "rotate-45" : ""} transition-transform duration-500 transform origin-center`}
                            onClick={handleToggleNewLesson}
                        />
                        <PencilLine width="24" height="24" isedit={isEdit?.toString()} stroke="#1D2026" className="cursor-pointer" onClick={
                            handleEditSectionTitle
                        } />
                        <Delete width="24" height="24" />
                    </div>
                </div>
            </div>
            
            {
                lessons && lessons?.map((item, index) => (
                    <LessonComponent lessonItem={item} key={index}/>
                ))
               
            }
            {
                isAddNewLesson && <AddNewLessonComponent sectionId={section_id} />
            }
        </div>
    )
}