import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import InputDescription from "../../components/Input/InputDescription";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import Button from "../../components/Button/Button";
import TableLesson from "../../components/Table/Course/TableLesson";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./AddLesson.scss";
import classNames from "classnames";
import axios from "axios";
// classNames
export default function Home() {
  const [showUpload, SetShowUpload] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [enabled, setEnabled] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [singleCorrect, setSingleCorrect] = useState(true);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  // const [courseId, setCourseId] = useState(1); // Giá trị khởi tạo ban đầu

  // const [initialAnswerCount, setInitialAnswerCount] = useState(2);
  const [formValue, setFormValue] = useState(() => ({
    course_id: 1,
    courseName: "",
    sectionName: "",
    lessonName: "",
    description: "",
    video: "",
    quizData: [
     
    ],
  }));


  const addQuestion = () => {
    //Đây chỉ để check nhận dữ liệu không áp dụng dữ liệu chính 
    // const updatedFormValue = {
    //   ...formValue,
    //   quizData: [
    //     ...formValue.quizData,
    //     {
    //       question: "",
    //       answerType: "radio", // Đặt kiểu đáp án mặc định cho câu hỏi mới
    //       answers: [
    //         { text: "", isCorrect: true },
    //         { text: "", isCorrect: false },
    //         { text: "", isCorrect: false },
    //         { text: "", isCorrect: false },
    //         { text: "", isCorrect: false },
    //         { text: "", isCorrect: false },
    //       ],
    //     },

    //   ],
    // };
    // setFormValue(updatedFormValue);
    // Xử lý dữ liệu chính ở đây
    const areAllQuestionsFilled = quizData.every(
      (question) => question.question.trim() !== ""
    );
    const areAllAnswersFilled = quizData.every((question) =>
      question.answers.every((answer) => answer.text.trim() !== "")
    );

    if (areAllQuestionsFilled && areAllAnswersFilled) {
      const newQuestion = {
        question: "",
        answerType: "radio",
        answers: [
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      };

      setQuizData([...quizData, newQuestion]);
      setEnabled([...enabled, false]);
      // setCourseId(courseId + 1); // Tăng courseId lên 1
    } else {
      alert(
        "Vui lòng điền câu hỏi và đáp án cho tất cả các câu hỏi trước khi thêm câu hỏi mới."
      );
    }

  };


  const updateQuestion = (index, field, value) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[index][field] = value;
    setQuizData(updatedQuizData);
  };

  const updateAnswer = (questionIndex, answerIndex, text) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[questionIndex].answers[answerIndex].text = text;

    // Đảm bảo đáp án đầu tiên luôn được chọn nếu đáp án không phải kiểu "checkbox"
    if (answerIndex === 0 && updatedQuizData[questionIndex].answerType !== "checkbox") {
      updatedQuizData[questionIndex].answers[answerIndex].isCorrect = true;
    }

    setQuizData(updatedQuizData);
  };


  const setCorrectAnswer = (questionIndex, answerIndex) => {
    const updatedQuizData = [...quizData];
    const currentAnswerType = updatedQuizData[questionIndex].answerType;

    if (currentAnswerType === "radio") {
      updatedQuizData[questionIndex].answers = updatedQuizData[questionIndex].answers.map((answer, index) => ({
        text: answer.text,
        isCorrect: index === answerIndex,
      }));
    } else {
      updatedQuizData[questionIndex].answers[answerIndex].isCorrect = !updatedQuizData[questionIndex].answers[answerIndex].isCorrect;
    }

    // Cập nhật quizData và trường isCorrect
    setQuizData(updatedQuizData);
  };



  const toggleAnswerType = (questionIndex) => {
    const updatedQuizData = [...quizData];
    const currentAnswerType = updatedQuizData[questionIndex].answerType;

    updatedQuizData[questionIndex].answerType =
      currentAnswerType === "radio" ? "checkbox" : "radio";

    if (updatedQuizData[questionIndex].answerType === "radio") {
      updatedQuizData[questionIndex].answers = updatedQuizData[questionIndex].answers.map((answer, index) => ({
        text: answer.text,
        isCorrect: index === 0, // Đáp án đầu tiên tự động được đánh dấu là true
      }));
    }

    // Cập nhật quizData và trường isCorrect
    setQuizData(updatedQuizData);
  };




  const deleteQuestion = (questionIndex) => {
    const updatedQuizData = [...quizData];
    updatedQuizData.splice(questionIndex, 1);
    const updatedEnabled = [...enabled];
    updatedEnabled.splice(questionIndex, 1);
    setQuizData(updatedQuizData);
    setEnabled(updatedEnabled);
  };

  const openDeleteConfirmationModal = (questionIndex) => {
    setSelectedQuestionIndex(questionIndex);
  };
  const closeDeleteConfirmationModal = () => {
    setSelectedQuestionIndex(null);
  };

  const addAnswer = (questionIndex) => {
    const currentQuestion = quizData[questionIndex];
    const allAnswersFilled = currentQuestion.answers.every(
      (answer) => answer.text.trim() !== ""
    );

    if (allAnswersFilled && currentQuestion.answers.length < 6) {
      const updatedQuizData = [...quizData];
      const newAnswer = { text: "", isCorrect: false };
      updatedQuizData[questionIndex].answers.push(newAnswer);
      setQuizData(updatedQuizData);
    } else {
      alert(
        `Có đáp án chưa có nội dung ở câu hỏi số ${questionIndex + 1}. Vui lòng nhập nội dung cho tất cả các đáp án trước khi thêm đáp án mới.`
      );
    }
  };


  const deleteAnswer = (questionIndex, answerIndex) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[questionIndex].answers.splice(answerIndex, 1);
    setQuizData(updatedQuizData);
  };


  const [formErrors, setFormErrors] = useState({
    courseName: false,
    sectionName: false,
    lessonName: false,
    description: false,
    quizData: quizData.map((question) => ({
      question: false,
      answers: question.answers.map(() => false),
    })),
  });


  const toggleSingleCorrect = () => {
    setSingleCorrect(!singleCorrect);
  };
  // const deleteQuestion = (questionIndex) => {
  //   const updatedQuizData = quizData.filter((_, index) => index !== questionIndex);
  //   setQuizData(updatedQuizData);
  // };

  const saveAnswers = () => {
    // Gửi dữ liệu đáp án đi hoặc thực hiện xử lý lưu tại đây
    console.log("Dữ liệu đáp án đã được lưu.");
  };

  const handleClickToUploadBg = () => {
    // Đặt showUpload về giá trị false để ẩn giao diện tải lên
    SetShowUpload(false);
  };
  const handleClickToUploadBtn = () => {
    // Đặt showUpload về giá trị true để hiển thị giao diện tải lên
    SetShowUpload(true);
  };

  const toggleVideoOpen = () => {
    setIsVideoOpen(!isVideoOpen);
    setIsQuizOpen(false); // Đóng phần quiz khi mở phần video
  };

  const toggleQuizOpen = () => {
    setIsQuizOpen(!isQuizOpen);
    setIsVideoOpen(false); // Đóng phần video khi mở phần quiz
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setIsVideoOpen(false); // Tắt phần video
    setIsQuizOpen(false); // Tắt phần quiz
    if (selectedValue === "video") {
      toggleVideoOpen();
    } else if (selectedValue === "quiz") {
      toggleQuizOpen();
    }
  };
  const handleChangeURL = (e) => {
    const newValue = e.target.value;
    if (newValue) setUrlInputValue(newValue);
  };

  function handleFileChange(event) {
    const fileInput = event.target;
    const videoPreview = document.getElementById("video-preview");

    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      if (selectedFile.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(selectedFile);
        video.controls = true;
        videoPreview.innerHTML = "";
        videoPreview.appendChild(video);
        setFormValue({ ...formValue, video: selectedFile });
      } else {
        videoPreview.innerHTML = "Tệp không hợp lệ. Chỉ chấp nhận tệp video.";
        setFormValue({ ...formValue, video: null });
      }
    } else {
      videoPreview.innerHTML = "";
      setFormValue({ ...formValue, video: null });
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();

  const questionsWithMissingAnswers = [];
  const isVideoSelected = isVideoOpen;
  const isQuizSelected = isQuizOpen;

  const isFormValid =
    formValue.lessonName.trim() !== '' &&
    formValue.description.trim() !== '' &&
    quizData.every((question, questionIndex) => {
      const hasAtLeastTwoAnswers = question.answers.length >= 2;
      const answersWithMissingText = question.answers.some(
        (answer) => answer.text.trim() === '' && !answer.isCorrect
      );

      if (!hasAtLeastTwoAnswers || answersWithMissingText) {
        questionsWithMissingAnswers.push(questionIndex + 1);
      }

      return (
        question.question.trim() !== '' &&
        hasAtLeastTwoAnswers &&
        !answersWithMissingText
      );
    });

  // Check if either video or quiz is selected
  if (!(isVideoSelected || isQuizSelected)) {
    alert("Vui lòng chọn ít nhất một dạng bài học (video hoặc quiz).");
  } else if (isFormValid) {

      // Tạo một đối tượng dữ liệu để gửi lên máy chủ, bao gồm course_id
      const dataToSave = {
        course_id: formValue.course_id,
        courseName: formValue.courseName,
        sectionName: formValue.sectionName,
        lessonName: formValue.lessonName,
        description: formValue.description,
        video: formValue.video,
        quizData: quizData,
      };

      // Gửi yêu cầu POST đến máy chủ (thay đổi URL của máy chủ và endpoint tương ứng)
      axios
        .post("http://localhost:3000/lessons", dataToSave)
        .then((response) => {
          // Xử lý phản hồi từ máy chủ (thông báo hoặc điều hướng sau khi lưu)
          console.log("Dữ liệu đã được lưu:", response.data);
        })
        .catch((error) => {
          // Xử lý lỗi (hiển thị thông báo lỗi hoặc thực hiện các biện pháp cần thiết)
          console.error("Lỗi khi lưu dữ liệu:", error);
        });
      // Cập nhật id cho bài học tiếp theo
      // setFormValue((prevFormValue) => ({
      //   ...prevFormValue,
      //   course_id: prevFormValue.course_id + 1,
      // }));
    } else {
      if (questionsWithMissingAnswers.length > 0) {
        alert(
          `Câu hỏi ${questionsWithMissingAnswers.length > 1 ? 'thứ' : 'số'
          } ${questionsWithMissingAnswers.join(', ')} đang thiếu đáp án (ít nhất 2 đáp án) hoặc chưa nhập nội dung đáp án. Vui lòng kiểm tra lại.`
        );
      } else {
        alert(
          "Vui lòng điền đầy đủ thông tin cho tất cả các trường."
        );
      }
    }
  };



  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  return (
    <>
      <div className="items-end justify-between px-6 xl:flex lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 sm:grid sm:grid-cols-1">
        {/* Breadcrumbs */}
        <div className="mt-6">
          <div className="pb-2 text-2xl font-medium">Thêm bài học</div>
          <div className="flex items-center gap-2 whitespace-nowrap Link">
            <a href="/" className="text-indigo-500 text">
              Trang chủ
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/cate-course" className="text-indigo-500">
              Danh mục
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/add-course" className="text-indigo-500">
              Thêm khóa học
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <a href="/add-section" className="text-indigo-500">
              Thêm phần học
            </a>
            <FontAwesomeIcon icon={faAngleRight} className="" />
            <p className="">Thêm bài học</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 whitespace-nowrap xl:mt-0 lg:mt-4 md:mt-4 md:justify-end sm:mb-0 sm:mt-4 sm:justify-end">
          <Button
            text={"Hủy"}
            Class={
              "flex font-medium items-center text-black hover:bg-slate-200 transition ease-in-out py-2 px-4 border-2 rounded-lg"
            }
            Icon={function Icon() {
              return (
                <svg
                  className="pr-2 "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              );
            }}
            onClick={() => console.log("You are my dream")}
          />
          <Button
            text={"Lưu"}
            Class={
              "flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg  "
            }
            Icon={function Icon() {
              return (
                <svg
                  className="pr-2 "
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15V7.47072C17.5 6.80768 17.2366 6.17179 16.7678 5.70295L14.297 3.23223C13.8282 2.76339 13.1923 2.5 12.5293 2.5H5ZM12.5293 4.16667H12.5V5.83333C12.5 6.75381 11.7538 7.5 10.8333 7.5H7.5C6.57953 7.5 5.83333 6.75381 5.83333 5.83333V4.16667H5C4.53976 4.16667 4.16667 4.53976 4.16667 5V15C4.16667 15.4602 4.53976 15.8333 5 15.8333H5.83333V10.8333C5.83333 9.91286 6.57953 9.16667 7.5 9.16667H12.5C13.4205 9.16667 14.1667 9.91286 14.1667 10.8333V15.8333H15C15.4602 15.8333 15.8333 15.4602 15.8333 15V7.47072C15.8333 7.24971 15.7455 7.03774 15.5893 6.88146L13.1185 4.41074C12.9623 4.25446 12.7503 4.16667 12.5293 4.16667ZM12.5 15.8333V10.8333H7.5V15.8333H12.5ZM7.5 4.16667H10.8333V5.83333H7.5V4.16667Z"
                    fill="white"
                  />
                </svg>
              );
            }}
            onClick={handleSubmit}
          />
        </div>
      </div>
      {/* <form action="" onSubmit={handleSubmit}> */}
      <div className="px-6 py-4 m-6 bg-white border-2 rounded-lg ">
        <p htmlFor="" className="text-xl font-medium text-left">
          Chi tiết
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            label="Tên khóa học"
            placeholder="Nhập tên khóa học"
            disabled={true}
          ></Input>
          <Input
            type="text"
            className={
              "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
            }
            label="Tên phần học"
            placeholder="Nhập tên phần học"
            disabled={true}
          ></Input>
        </div>
      </div>

      <div className="px-6 py-4 m-6 bg-white border-2 rounded-lg ">
        <p htmlFor="" className="text-xl font-medium text-left">
          Thêm bài học
        </p>
        <Input
          type="text"
          className={
            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
          }
          label="Tên bài học"
          placeholder="Nhập tên bài học"
          disabled={false}
          onChange={(e) => {
            const value = e.target.value;
            setFormValue({ ...formValue, lessonName: value });
            setFormErrors({ ...formErrors, lessonName: value.trim() === '' });

          }}
        ></Input>
        <InputDescription
          type={"text"}
          label={"Mô tả"}
          placeholder={"Nhập mô tả"}
          className={
            "mt-2 px-4 py-2 w-full bg-neutral-100 rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
          }
          rows={"10"}
          cols={"30"}
          onChange={(e) => {
            const value = e.target.value;
            setFormValue({ ...formValue, description: value });
            setFormErrors({ ...formErrors, description: value.trim() === '' });

          }}
        ></InputDescription>
      </div>
      <div className="h-full px-6 py-4 m-6 bg-white border-2 rounded-lg">
        <p htmlFor="" className="text-xl font-medium text-left">
          Dạng bài học
        </p>
        <select
          name=""
          id=""
          onChange={handleSelectChange}
          className={
            "mt-2 px-4 py-2 w-full bg-neutral-100 mb-5 clear-both rounded-lg border-2 focus:border-indigo-500 focus:outline-none"
          }
        >
          <option value="">Chọn 1 mục</option>
          <option value="video">Video</option>
          <option value="quiz">Quiz</option>
        </select>

        {isVideoOpen && (
          <div className="p-6 my-2 bg-gray-100 border-2 border-dashed rounded-lg">
            <p className="mb-4 text-gray-500">
              Kéo thả video vào đây hoặc bấm thêm video
            </p>
            <Input
              type="file"
              className={classNames(
                "w-full border-2 rounded-lg ease-in-out",
                "text-sm text-slate-500",
                "file:mx-2 file:my-3 file:px-4 file:py-2 file:rounded-md file:border-none file:bg-blue-500 file:text-white file:hover:bg-blue-700"
              )}
              accept="video/*"
              onChange={handleFileChange}
            ></Input>
            <div className="px-4 py-5">
              <div id="video-preview" className=""></div>
            </div>
          </div>
        )}
        {isQuizOpen && (
          <div className="Quiz">
            <h1>QUẢN LÝ CÂU HỎI VÀ ĐÁP ÁN</h1>
            {quizData.map((question, questionIndex) => (
              <div key={questionIndex} className="Quiz_Questions">
                <Input
                  type="text"
                  className="Question mt-2 px-4 py-2 w-full bg-neutral-100 clear-both rounded-3xl border-2 focus:border-indigo-500 focus:outline-none"
                  label={`Câu hỏi ${questionIndex + 1}:`}
                  placeholder="Nhập câu hỏi"
                  value={question.question}
                  onChange={(e) => {
                    updateQuestion(questionIndex, "question", e.target.value);
                    const updatedFormValue = {
                      ...formValue,
                      quizData: {
                        ...formValue.quizData,
                        question: e.target.value,
                      },
                    };
                    setFormValue(updatedFormValue);
                    setFormErrors({
                      ...formErrors,
                      quizData: formErrors.quizData.map((item, idx) => {
                        if (idx === questionIndex) {
                          return e.target.value.trim() === "" ? true : false;
                        }
                        return item;
                      }),
                    });
                  }}
                />
                {/* {formErrors.quizData[questionIndex] && (
  <div className="text-red-500 clear-both">
    Vui lòng điền nội dung câu hỏi này.
  </div>
)} */}

                {question.question.trim() === "" && (
                  <div className="text-red-500 clear-both text-xs">
                    Vui lòng điền nội dung câu hỏi này.
                  </div>
                )}
                {question.answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className={`Answer ${answer.text.trim() === "" ? "unfilled-answer" : ""
                      }`}
                  >
                    <div className="Answer_Item">
                      {question.answerType === "checkbox" ? (
                        <div className="Checkbox_Answer">
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={answer.isCorrect}
                            onChange={() =>
                              setCorrectAnswer(questionIndex, answerIndex)

                            }
                          />
                        </div>
                      ) : (
                        <div className="Radio_Answer">
                          <input
                            type="radio"
                            name={`correct-answer-${questionIndex}`}
                            checked={answer.isCorrect}
                            className="radio"
                            onChange={() =>
                              setCorrectAnswer(questionIndex, answerIndex)

                            }
                          />

                        </div>
                      )}

                      <Input
                        type="text"
                        className="Input_Answer"
                        placeholder={`Đáp án ${answerIndex + 1}`}
                        value={answer.text}
                        onChange={(e) => {
                          updateAnswer(questionIndex, answerIndex, e.target.value);
                          setFormErrors({
                            ...formErrors,
                            quizData: formErrors.quizData.map((item, idx) => {
                              if (idx === questionIndex) {
                                return {
                                  ...item,
                                  answers: item.answers.map((ans, ansIdx) => {
                                    if (ansIdx === answerIndex) {
                                      return e.target.value.trim() === "" ? true : false;
                                    }
                                    return ans;
                                  }),
                                };
                              }
                              return item;
                            }),
                          });
                          // const updatedFormValue = { ...formValue };
                          // updatedFormValue.quizData[questionIndex].answers[answerIndex].text = e.target.value;
                          // setFormValue(updatedFormValue);
                        }}
                      />
                      {answer.text.trim() === "" && (
                        <div className="text-red-500 clear-both ml-5 mt-5 mb-[-1.2rem] text-xs">
                          Vui lòng điền nội dung cho đáp án này.
                        </div>
                      )}

                      {answerIndex > -1 && ( // Giới hạn số lượng tối đa là 6
                        <div className="Delete_Answer">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() =>
                              deleteAnswer(questionIndex, answerIndex)
                            }
                            className="px-3 py-3 text-white text-xs bg-red-500 rounded-full"
                          />
                        </div>

                      )}
                    </div>


                  </div>
                ))}

                {question.answers.length < 6 && ( // Giới hạn số lượng tối thiểu là 2
                  <div className="Add_Answer">
                    <Button
                      text="Thêm đáp án"
                      onClick={() => addAnswer(questionIndex)}
                      Class="px-2 py-1 bg-green-500 text-white rounded-md mt-3"
                    />
                  </div>
                )}

                <div
                  className="Icon_Delete"
                  onClick={() => openDeleteConfirmationModal(questionIndex)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>

                <div className="Switch_Selection">
                  <Switch
                    onClick={() => toggleAnswerType(questionIndex)}
                    checked={enabled[questionIndex]}
                    onChange={() => {
                      const updatedEnabled = [...enabled];
                      updatedEnabled[questionIndex] = !enabled[questionIndex];
                      setEnabled(updatedEnabled);
                    }}
                    className={`${enabled[questionIndex] ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Chuyển sang nhiều đáp án</span>
                    <span
                      className={`${enabled[questionIndex]
                        ? "translate-x-6"
                        : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                  <i>Chuyển sang lựa chọn nhiều đáp án</i>
                </div>
              </div>
            ))}

            <div className="Button_Quiz">
              <Button
                text="Thêm câu hỏi"
                Class={
                  "flex font-medium items-center float-left bg-indigo-100 hover:bg-indigo-700 hover:text-white  transition ease-in-out text-indigo-500 py-2 px-4 rounded-lg  "
                }
                onClick={addQuestion}
              />
              {/* <Button
                  text="Lưu lại đáp án"
                  Class={
                    "flex font-medium items-center float-right bg-indigo-100 hover:bg-indigo-700 hover:text-white  transition ease-in-out text-indigo-500 py-2 px-4 rounded-lg  "
                  }
                  onClick={saveAnswers}
                /> */}
            </div>
          </div>
        )}
      </div>

      {selectedQuestionIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center Delete_Question">
          <div className="p-5 bg-white rounded-md shadow-lg Delete_Question_Box modal">
            <p className="mb-4">
              Bạn có chắc muốn xóa câu hỏi {selectedQuestionIndex + 1} này?
            </p>
            <div className="flex justify-center">
              <Button
                text="Xóa"
                onClick={() => {
                  deleteQuestion(selectedQuestionIndex);
                  closeDeleteConfirmationModal();
                }}
                Class="mr-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              />

              <Button
                text="Hủy"
                onClick={closeDeleteConfirmationModal}
                Class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
              />
            </div>
          </div>
        </div>
      )}
      {/* </form> */}

      <div className="px-6 pb-6">
        <TableLesson></TableLesson>
      </div>
    </>
  );
}
