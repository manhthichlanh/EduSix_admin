import { useState, useEffect } from 'react';
import Delete from '@components/common/icon/Delete';
import Close from '@components/common/icon/Close';
import PlusB from '@components/common/icon/PlusB';
import ToastMessage from "../../../../../utils/alert";
import { ServerApi } from "../../../../../utils/http";
export default function Quizzes({ lesson_id }) {
  const options = [
    { id: 0, name: 'Trắc nghiệm 1 đáp án', iconStyle: 'w-4 h-4 rounded-full border-2 border-gray-400' },
    { id: 1, name: 'Nhiều đáp án', iconStyle: 'w-4 h-4 rounded-sm border-2 border-gray-400' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isOpen, setIsOpen] = useState([]);

  const handleToggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };
  useEffect(() => {
    // Khởi tạo mảng selectedOptions và mảng questions với các giá trị mặc định
    setSelectedOptions(Array.from({ length: 2 }, () => options[0]));
    setQuestions([{ id: 0, text: '', selectedAnswer: null, selectedCheckboxes: [], answers: ['', ''] }]);
    setIsOpen(Array.from({ length: 2 }, () => false));
  }, []);

  const handleOptionSelect = (questionIndex, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
    // Đóng dropdown sau khi lựa chọn xong
    setIsOpen([...isOpen].fill(false));
  };
  

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = [...newQuestions[questionIndex].answers, ''];
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value, checked) => {
    const newQuestions = [...questions];
    if (selectedOptions[questionIndex].id === 0) {
      newQuestions[questionIndex].selectedAnswer = answerIndex;
    } else if (selectedOptions[questionIndex].id === 1) {
      let newSelectedCheckboxes = [...newQuestions[questionIndex].selectedCheckboxes];
      if (checked) {
        newSelectedCheckboxes.push(answerIndex);
      } else {
        newSelectedCheckboxes = newSelectedCheckboxes.filter(item => item !== answerIndex);
      }
      newQuestions[questionIndex].selectedCheckboxes = newSelectedCheckboxes;
    }
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    if (questions[questionIndex].answers.length <= 2) {
      ToastMessage(
        "Không thể xóa vì câu hỏi bắt buộc có từ 2 đáp án trở lên"
      ).warn();
      return;
    }
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter((answer, i) => i !== answerIndex);
    if (selectedOptions[questionIndex].id === 0 && questions[questionIndex].selectedAnswer !== null && questions[questionIndex].selectedAnswer >= answerIndex) {
      newQuestions[questionIndex].selectedAnswer = Math.max(questions[questionIndex].selectedAnswer - 1, 0);
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questionCount,
      text: '',
      selectedAnswer: null,
      selectedCheckboxes: [],
      answers: ['', ''],
    };
    setQuestionCount(questionCount + 1);
    setQuestions([...questions, newQuestion]);
    setSelectedOptions([...selectedOptions, options[0]]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    if (questions.length === 1) {
      // Hiển thị cảnh báo hoặc thực hiện hành động phù hợp
      ToastMessage(
        "Không thể xóa, vì bắt buộc tối đa 1 câu hỏi"
      ).warn();
      return;
    }
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(questionIndex, 1);
    setSelectedOptions(newSelectedOptions);

    const newIsOpen = [...isOpen];
    newIsOpen.splice(questionIndex, 1);
    setIsOpen(newIsOpen);
  };


  const handleQuestionSubmit = async () => {
    try {
        const response = await ServerApi.post('/quizz/create', {
            lesson_id,
            question: questions[0].text,
            progress: 0,
            status: 'active',
            answers: questions[0].answers.map((answer, index) => ({
                answer,
                isCorrect: index === questions[0].selectedAnswer,
                explain: '',
            })),
        });

        console.log(response.data);
        ToastMessage("Câu hỏi và đáp án đã được thêm thành công.").success();
    } catch (error) {
        console.error(error);
        ToastMessage("Có lỗi xảy ra khi thêm câu hỏi và đáp án.").error();
    }
};

  return (
    <div className="">
      <div className="border-gray-200 border-2 p-4 m-4">
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="border-gray-200 border-2 p-4 m-4">
            <h2>Câu hỏi {questionIndex + 1}</h2>
            <div className="flex justify-between items-center">
              <div className="relative mt-2 w-[300px]">
                <button
                  type="button"
                  className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  onClick={() => handleToggleDropdown(questionIndex)}
                  aria-haspopup="listbox"
                  aria-expanded={isOpen[questionIndex]}
                  aria-labelledby="listbox-label"
                >
                  <span className="flex items-center">
                    <div className={selectedOptions[questionIndex].iconStyle}></div>
                    <span className="ml-2 block truncate">{selectedOptions[questionIndex].name}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {isOpen[questionIndex] && (
                  <ul
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    tabIndex="-1"
                    role="listbox"
                    aria-labelledby="listbox-label"
                  >
                    {options.map((option) => (
                      <li
                        key={option.id}
                        className={`text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 ${selectedOptions[questionIndex].id === option.id ? 'bg-indigo-100' : ''}`}
                        id={`listbox-option-${option.id}`}
                        role="option"
                        onClick={() => handleOptionSelect(questionIndex, option)}
                      >
                        <span className="flex items-center">
                          <div className={option.iconStyle}></div>
                          <span className={`font-normal ml-3 block truncate ${selectedOptions[questionIndex].id === option.id ? 'font-semibold' : ''}`}>
                            {option.name}
                          </span>
                        </span>
                        {selectedOptions[questionIndex].id === option.id && (
                          <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Delete width="20" height="20" className='cursor-pointer' onClick={() => handleDeleteQuestion(questionIndex)} />
            </div>
            <div className="border-t w-full my-4"></div>
            <input
              type="text"
              className="w-full p-3 border-b-2 border-gray-200 bg-gray-50 focus:border-b-2 focus:outline-none focus:border-indigo-500"
              placeholder="Nhập câu hỏi vào đây"
              value={question.text}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[questionIndex].text = e.target.value;
                setQuestions(newQuestions);
              }}
            />
            {selectedOptions[questionIndex].id === 0 && (
              <>
                {question.answers.map((answer, answerIndex) => (
                  <div className="flex w-full items-center justify-between p-3 mt-4" key={answerIndex}>
                    <input
                      type="radio"
                      className="w-5 h-5 rounded-full border-2 border-gray-400"
                      checked={question.selectedAnswer === answerIndex}
                      onChange={() => handleAnswerChange(questionIndex, answerIndex, answer)}
                    />
                    <input
                      type="text"
                      value={answer}
                      placeholder={`Tùy chọn ${answerIndex + 1}`}
                      className="py-2 w-full mx-3 focus:border-b-2 focus:border-indigo-500 focus:outline-none"
                      onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                    />
                    <Close width="20" height="20" onClick={() => handleRemoveAnswer(questionIndex, answerIndex)} />
                  </div>
                ))}
                <PlusB width="30" height="30" className="mt-4 cursor-pointer" onClick={() => handleAddAnswer(questionIndex)} />
              </>
            )}
            {selectedOptions[questionIndex].id === 1 && (
              <>
                {question.answers.map((answer, answerIndex) => (
                  <div className="flex w-full items-center justify-between p-3 mt-4" key={answerIndex}>
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-full border-2 border-gray-400"
                      checked={question.selectedCheckboxes.includes(answerIndex)}
                      onChange={() => handleAnswerChange(questionIndex, answerIndex, answer, !question.selectedCheckboxes.includes(answerIndex))}
                    />
                    <input
                      type="text"
                      value={answer}
                      placeholder={`Tùy chọn ${answerIndex + 1}`}
                      className="py-2 w-full mx-3 focus:border-b-2 focus:border-indigo-500 focus:outline-none"
                      onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value, true)}
                    />
                    <Close width="20" height="20" onClick={() => handleRemoveAnswer(questionIndex, answerIndex)} />
                  </div>
                ))}
                <PlusB width="30" height="30" className="mt-4 cursor-pointer" onClick={() => handleAddAnswer(questionIndex)} />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="px-3 py-2 m-4 w-[125px] bg-[#5C59E8] rounded-sm text-white font-medium cursor-pointer" onClick={handleAddQuestion}>
        Thêm câu hỏi
      </div>
      <button onClick={handleQuestionSubmit}>Gửi câu hỏi</button>
    </div>
  );
}