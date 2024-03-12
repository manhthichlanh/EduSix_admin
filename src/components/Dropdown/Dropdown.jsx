import { Disclosure } from "@headlessui/react";
import ChevronUp from "../common/icon/ChevronUp";
import classNames from "classnames";
import PlayCircleFill from "../common/icon/PlayCircleFill";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Dropdown({
  SectionDoc,
  markLessonAsCompleted,
  completedLessons,
  setCompletedLessons,
  courseId,
  handleSelectLesson
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonIdFromURL = searchParams.get("lessonId");
  const [currentSection, setCurrentSection] = useState(0);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (!alertShown && completedLessons.length === 0) {
      const firstLesson = SectionDoc[0]?.lessons[0];
      handleLessonClick(firstLesson);
      setAlertShown(true);
    }

    const initialLessonId = lessonIdFromURL || localStorage.getItem("currentLessonId");
    const initialLesson = SectionDoc.flatMap(section => section.lessons).find(lesson => lesson.lesson_id === initialLessonId);
    
    if (initialLesson) {
      handleLessonClick(initialLesson);
    }
  }, [alertShown, completedLessons, lessonIdFromURL, SectionDoc]);

  const handleLessonClick = (lesson) => {
    handleSelectLesson(lesson);
    navigate(`/course-video-iframe?courseId=${courseId}&lessonId=${lesson.lesson_id}`);
    const newSectionIndex = SectionDoc.findIndex((section) =>
      section.lessons.includes(lesson)
    );
    if (newSectionIndex !== -1 && newSectionIndex !== currentSection) {
      setCurrentSection(newSectionIndex);
    }
  };

  return (
    <div className="w-full">
      {SectionDoc?.map((section, sectionIndex) => (
        <Disclosure key={sectionIndex} defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  "flex items-center justify-between w-full px-4 py-2 bg-[#F5F5F5] bg-zinc-100 border-b ",
                  "text-black text-sm font-medium",
                  "focus:outline-none",
                  "hover:bg-slate-200"
                )}
              >
                <div className="flex flex-col">
                  <span>{section.name}</span>
                  <div
                    className={classNames(
                      "flex items-center gap-1",
                      "text-black text-opacity-60 text-xs"
                    )}
                  >
                    <span>{section.lessons.length} lessons</span> |{" "}
                    <span>{section.totalTime} seconds</span>
                  </div>
                </div>
                <ChevronUp
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-[#F5F5F5]">
                {section.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.includes(lesson.lesson_id);

                  return (
                    <button
                      key={lessonIndex}
                      onClick={() => handleLessonClick(lesson)}
                      style={{
                        backgroundColor: lessonIdFromURL === lesson.lesson_id.toString()
                          ? "#d1ffd3"
                          : "",
                      }}
                      className={classNames(
                        "w-full px-4 py-2 focus:bg-[#FCDCD3]  relative group bg-orange-100 my-0.5 hover:bg-slate-200",
                        { "bg-[#FCDCD3]": lessonIdFromURL === lesson.lesson_id.toString() },
                        { "completed": isCompleted },
                        { "active": lessonIdFromURL === lesson.lesson_id.toString() }
                      )}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-orange-600">
                            {lesson.name}
                          </p>
                          <div className="flex items-center justify-start gap-1">
                            <p className="text-xs font-normal text-black text-opacity-60">
                              {lesson.duration} mins
                            </p>
                          </div>
                        </div>

                        <PlayCircleFill
                          width={12}
                          height={12}
                          fill={isCompleted ? "#1F8354" : "#FF6636"}
                          className=""
                        />
                      </div>
                    </button>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
