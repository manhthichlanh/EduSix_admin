import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./CourseVideo.scss";
import Dropdown from "../../components/Dropdown/Dropdown";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { ServerApi, serverEndpoint } from "../../utils/http";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";
import {
  faXmark, // Add FontAwesome icons for hiding and showing the menu
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const CourseVideo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const lessonId = searchParams.get("lessonId");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [selectedAnswersByQuestion, setSelectedAnswersByQuestion] = useState({});
  const [isAnHienSubMenu1, setIsAnHienSubMenu1] = useState(false);
  const [isAnHienSubMenu, setIsAnHienSubMenu] = useState(
    window.innerWidth > 1000
  );

  const videoURL = `${serverEndpoint}video/stream/${selectedVideo}`;
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
  



const toggleAnHienSubMenu = () => {
  setIsAnHienSubMenu(!isAnHienSubMenu);
};
const toggleAnHienSubMenu1 = () => {
  setIsAnHienSubMenu1(!isAnHienSubMenu1);
  setIsAnHienSubMenu(false);
};
useEffect(() => {
  const handleResize = () => {
    setIsAnHienSubMenu(window.innerWidth > 1000);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  useEffect(() => {
    // Fetch course data based on courseId
  }, [courseId]);

  useEffect(() => {
    // Fetch lesson data based on lessonId
  }, [lessonId]);

  const handleNextQuestion = () => {
    if (questionIndex < selectedQuiz.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  // Fetch course data based on courseId
  const { data: courseData, isLoading, isError, refetch: refetchCourseData } = useQuery(
    ["courseData", courseId],
    () => ServerApi.get(`/admin-query/getAllLessonQuizzVideo/${+courseId}`),
    { enabled: !!courseId }
  );
  
  useEffect(() => {
    // Gọi lại API để cập nhật dữ liệu khi courseId thay đổi
    refetchCourseData();
  }, [courseId, refetchCourseData]);

  // Fetch certificate data based on courseId

  // Fetch all the lessons for the course
  useEffect(() => {
    if (
      courseData &&
      courseData.data.success &&
      courseData.data.SectionDoc &&
      lessonId
    ) {
      const lesson = courseData.data.SectionDoc
        .map((section) => section.lessons)
        .flat()
        .find(
          (lesson) => lesson.lesson_id.toString() === lessonId.toString()
        );

      if (lesson) {
        setSelectedLesson(lesson);
        setSelectedVideo(lesson.videos?.[0]?.file_videos || null);
        setSelectedQuiz(lesson.quizzs || []);
        setQuestionIndex(0);
      }
    }
  }, [courseData, lessonId]);


 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching course data.</div>;
  }

  if (
    !courseData ||
    !courseData.data ||
    !courseData.data.Course_Info ||
    !courseData.data.SectionDoc
  ) {
    return <div>Error: Course data is not available.</div>;
  }

  const { Course_Info, SectionDoc, CourseDoc } = courseData.data;
  const sortedSectionDoc = SectionDoc.sort(
    (a, b) => a.section_id - b.section_id
  );
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedVideo(
      lesson.isQuiz
        ? lesson.quizzs?.[0]?.file_videos || null
        : lesson.videos?.[0]?.file_videos || null
    );
    setSelectedQuiz(lesson.quizzs || []);
    setQuestionIndex(0);
  
    // Cập nhật URL với lessonId mới
    const newURL = `/course-video-iframe?courseId=${courseId}&lessonId=${lesson.lesson_id}`;
    window.history.pushState({}, '', newURL);
    navigate(newURL);


    setCompletedLessons(newURL);
  };

  const handleAnswerSelect = (answerIndex, isCorrect) => {
    const currentQuestionId = selectedQuiz[questionIndex]?.id; // Assuming you have a unique identifier for each question

    let newSelectedAnswers;

    const allowsMultipleCorrectAnswers =
      selectedQuiz[questionIndex]?.answers?.filter((answer) => answer.isCorrect).length > 1;

    if (allowsMultipleCorrectAnswers) {
      newSelectedAnswers = selectedAnswersByQuestion[currentQuestionId] || [];
      newSelectedAnswers = newSelectedAnswers.includes(answerIndex)
        ? newSelectedAnswers.filter((selectedIndex) => selectedIndex !== answerIndex)
        : [...newSelectedAnswers, answerIndex];
    } else {
      newSelectedAnswers = [answerIndex];
    }

    setSelectedAnswersByQuestion({
      ...selectedAnswersByQuestion,
      [currentQuestionId]: newSelectedAnswers,
    });
  };
  const handleSaveAnswers = () => {
    let correctAnswersCount = 0;

    selectedQuiz.forEach((question) => {
      const userAnswers = selectedAnswersByQuestion[question.id] || [];
      const correctAnswers = question.answers.filter((a) => a.isCorrect).map((a, index) => index);

      if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
        correctAnswersCount++;
      }
    });

    const isAllCorrect = correctAnswersCount === selectedQuiz.length;

    if (isAllCorrect) {
      // Hiển thị thông báo chúc mừng
      alert("Chúc mừng bạn đã hoàn thành 100% câu hỏi.");

      // Chuyển hướng sau một khoảng thời gian ngắn
      setTimeout(() => {
      
      }, 2000); // Đợi 2 giây trước khi chuyển hướng
    } else {
      // Hiển thị thông báo lỗi
      alert(`Bạn đã trả lời sai ${selectedQuiz.length - correctAnswersCount} câu hỏi. Vui lòng xem lại.`);
    }
  };

  const allowsMultipleCorrectAnswers =
    selectedQuiz[questionIndex]?.answers?.filter((answer) => answer.isCorrect).length > 1;


    const isAllQuestionsAnswered = () => {
      return selectedQuiz.every(question =>
        selectedAnswersByQuestion.hasOwnProperty(question.id)
      );
    };
  return (
    <>
      <div className="CourseVideo">
        <div className="Header">
          <div className="directional">
            <div className="name_course">
              <p>{CourseDoc.name}</p>
            </div>
          </div>
        
        </div>

        <div className="Content_CourseVideo">
          <div className="CourseVideo_Left">
          {selectedVideo && (
  <div className="video">
    <VideoWrapper>
      <ReactPlayer
        url={videoURL}
        width="100%"
        height="100%"
        controls={true}
      />
    </VideoWrapper>
  </div>
)}
 {selectedQuiz.length > 0 && (
              <div className="Quiz">
                <div className="QuizQuestions">
                  <div className="InputQuizQuestions">
                    {selectedQuiz.length > 0 && (
                      <>
                        {/* Display information about multiple/single correct answers */}
                        <p className="AnswerInfo">
                          {allowsMultipleCorrectAnswers
                            ? "Câu hỏi chọn được nhiều đáp án"
                            : "Câu hỏi chọn được 1 đáp án"}
                        </p>

                        <Input
                          className="InputQuestions"
                          type="text"
                          placeholder={selectedQuiz[questionIndex]?.question ? `${selectedQuiz[questionIndex].question}?` : ""}
                          disabled
                        />

                        <div className="Answer">
                          {selectedQuiz[questionIndex]?.answers?.map((answer, answerIndex) => (
                            <div
                              key={answerIndex}
                              className={`AnswerOption ${selectedAnswersByQuestion[selectedQuiz[questionIndex]?.id]?.includes(answerIndex)
                                ? "selected"
                                : ""
                                }`}
                              onClick={() => handleAnswerSelect(answerIndex, answer.isCorrect)}
                            >
                              <span className="AnswerLabel">
                                {String.fromCharCode(65 + answerIndex).toUpperCase()}.{" "}
                              </span>
                              <p
                                className={`InputAnswer ${selectedAnswersByQuestion[selectedQuiz[questionIndex]?.id]?.includes(answerIndex)
                                  ? "selected"
                                  : ""
                                  }`}
                              >
                                {answer.answer}
                              </p>
                            </div>
                          ))}

                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="ButtonGroup">
                  {questionIndex > 0 && (
                    <Button Class="back" text="Trở lại" onClick={handlePreviousQuestion}></Button>
                  )}
                  {questionIndex < selectedQuiz.length - 1 && (
                    <Button Class="continue" text="Tiếp tục" onClick={handleNextQuestion}></Button>
                  )}
                 
                </div>
                <div className="ButtonGroup">
                  {questionIndex > 0 && (
                    <Button Class="back" text="Trở lại" onClick={handlePreviousQuestion}></Button>
                  )}
                  {questionIndex < selectedQuiz.length - 1 && (
                    <Button Class="continue" text="Tiếp tục" onClick={handleNextQuestion}></Button>
                  )}
                  {isAllQuestionsAnswered() && (
                    <Button
                      Class="save-answers"
                      text="Lưu Đáp Án"
                      onClick={handleSaveAnswers}
                    />
                  )}
                </div>
              </div>
            )}
{!selectedVideo && (
  <div className="video">
    <p>Video không khả dụng. Vui lòng thử lại sau.</p>
  </div>
)}
          <i className="text-orange-500">Lưu Ý: Nếu như video không load thì hãy bấm vào bài học để load lại video</i>
            <div className="scrollBar">{/* Display overview and comments sections */}</div>
            <div className="information">
                <div className="overview_CourseVideo" id="overview-section">
                  <h1 className="text-[30px] font-[600]">{CourseDoc.name}</h1>
                  <p dangerouslySetInnerHTML={{ __html: CourseDoc.content }}>
                  </p>
                </div>

              

              </div>
          </div>

          {isAnHienSubMenu && (
            <>
              <div
                className="background_Black"
                onClick={toggleAnHienSubMenu1}
              ></div>
              <div className="CourseVideo_Right">
                <div className="menu_CourseVideo_Right">
                  <h2 className="text-lg font-semibold py-4">
                    Nội dung khóa học
                  </h2>
                  <div className="dropdownMenu">
                    <Dropdown
                      SectionDoc={sortedSectionDoc}
                      completedLessons={completedLessons}
                      handleSelectLesson={handleLessonSelect}
                      setCompletedLessons={setCompletedLessons}
                      defaultOpen={true} // Thêm prop defaultOpen
                      courseId={courseId}
                    
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sub_menu">
        <div className="course_content">
          <button onClick={toggleAnHienSubMenu}>
            <FontAwesomeIcon icon={isAnHienSubMenu ? faXmark : faBars} />{" "}
            {/* Toggle visibility icon */}
          </button>
        </div>
       
      </div>
    </>
  );
};

export default CourseVideo;
