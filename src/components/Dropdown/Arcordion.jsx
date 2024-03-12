import { useEffect, useState } from "react";
import classNames from "classnames";
import Plus from "../commom/icons/Plus";
import PlayCircleFill from "../commom/icons/PlayCircleFill";
import { useQuery } from "react-query";
import { apiServer } from "../../utils/http";
import { isEmpty } from "lodash";

function ArcordionItem({ course_id }) {
  const [active, setActive] = useState([]);
  const { data: courseData, isLoading, isError } = useQuery(
    ['courseData', course_id],
    () => apiServer.get(`/admin-query/getAllLessonQuizzVideo/${course_id}`),
    {
      enabled: !!course_id,
    }
  );

  useEffect(() => {
    if (courseData && courseData.data.success) {
      // Access the data from the response
      const { Course_Info, CourseDoc, SectionDoc, success } = courseData.data;
      const { sectionCount, LessonCount, TotalTime } = Course_Info;

      // Do something with the data...
      // console.log('Section Count:', sectionCount);
      // console.log('Lesson Count:', LessonCount);
      // console.log('Total Time:', TotalTime);
      // console.log('Course Doc:', CourseDoc);
      // console.log('Section Doc:', SectionDoc);
    }
  }, [courseData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching course data.</div>;
  }

  if (!courseData || !courseData.data.Course_Info || !courseData.data.SectionDoc) {
    return <div>Error: Course data is not available.</div>;
  }

  const { Course_Info, SectionDoc } = courseData.data;

  if (isEmpty(SectionDoc)) {
    return <div>Chưa có phần học.</div>;
  }

  function calculateTotalDuration(sections) {
    let totalDurationInSeconds = 0;

    if (sections) {
      sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
          if (lesson.duration) {
            totalDurationInSeconds += lesson.duration;
          }
        });
      });
    }

    return totalDurationInSeconds;
  }

  function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours} giờ ${minutes} phút ${seconds} giây`;
  }
  

  const totalDurationInSeconds = calculateTotalDuration(SectionDoc);
  const formattedTotalDuration = formatDuration(totalDurationInSeconds);
  const sortedSectionDoc = SectionDoc.sort((a, b) => a.section_id - b.section_id);
  return (
    <div className="w-full">
      <p className="mb-2 text-xl font-bold text-black">Nội dung khóa học</p>
      <div className="flex items-center justify-between">
        <div
          className={classNames(
            "gap-2 flex flex-wrap items-center md:gap-4",
            "text-black font-medium text-opacity-80"
          )}
        >
          <p>{courseData.data.Course_Info.sectionCount} Chương</p>
          <div className="hidden w-1 h-1 mt-1 bg-black rounded-full sm:block"></div>
          <p>{courseData.data.Course_Info.LessonCount} Bài học</p>
          <div className="hidden w-1 h-1 mt-1 bg-black rounded-full sm:block"></div>
          <p>Thời lượng {formattedTotalDuration}</p>
        </div>
        <button
          className="text-[#FF6636] font-normal whitespace-nowrap"
          onClick={() => {
            const newArrays = Array.from({ length: 1000 }, (_, i) => i);
            setActive(isEmpty(active) ? newArrays : []);
          }}
        >
          {isEmpty(active) ? "Mở tất cả" : "Đóng tất cả"}
        </button>
      </div>
      {sortedSectionDoc.map((section, sectionIndex) => (
  <Arcordion
    key={sectionIndex}
    title={section.name}
    content={section.lessons}
    lessons={section.lessons.length}
    isOpen={active.includes(sectionIndex)}
    onClick={() => {
      const currentIndex = active.findIndex((it) => sectionIndex === it);

      if (currentIndex !== -1) {
        const newActive = [...active];
        newActive.splice(currentIndex, 1);
        setActive(newActive);
      } else {
        setActive([...active, sectionIndex]);
      }
    }}
  />
))}


    </div>
  );
}

function Arcordion({ title, content, lessons, isOpen, onClick }) {
  const isAccordionOpen = isOpen;
  return (
    <div className="w-full">
      <div
        className={classNames(
          "flex gap-2 items-center mt-2 py-3 px-5 rounded-md border border-[#EBEBEB] bg-[#F5F5F5]",
          "text-black font-medium text-opacity-80"
        )}
        onClick={onClick}
      >
        <Plus
          className={`h-5 w-5 transform ${
            isAccordionOpen ? "rotate-45" : ""
          } ease-in-out duration-300`}
        ></Plus>
        <div className="flex justify-between w-full">
          <p>{title}</p>
          <p>{lessons} bài học</p>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"}`}
        style={{
          overflow: "hidden",
        }}
      >
        {content && Array.isArray(content) ? (
          content.map((item, index) => (
            <div
              className={classNames(
                "pl-8 pr-6 py-2 mt-1 border-b border-[#EBEBEB] flex justify-between",
                "text-black font-medium text-opacity-80"
              )}
              key={index}
            >
              <div className="flex items-center gap-2">
                <PlayCircleFill width={12} height={12} fill="#F05123" />
                <p className="text-sm font-medium text-black text-opacity-80">
                  {item.name}
                </p>
              </div>
              <span className="duration">{item.duration} giây</span>
            </div>
          ))
        ) : (
          <div>Không có dữ liệu bài học</div>
        )}
      </div>
    </div>
  );
}

export default ArcordionItem;
