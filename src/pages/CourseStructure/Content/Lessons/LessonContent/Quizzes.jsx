import React from 'react'
import Delete from '@components/common/icon/Delete'
import Close from '@components/common/icon/Close'
import PlusB from '@components/common/icon/PlusB'
import { useState, useEffect } from "react";

export default function Quizzes({ lesson_id }) {
  const options = [
    { id: 0, name: 'Trắc nghiệm', iconStyle: 'w-4 h-4 rounded-full border-2 border-gray-400' },
    { id: 1, name: 'Nhiều đáp án', iconStyle: 'w-4 h-4 rounded-sm border-2 border-gray-400' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(options[0]);
  }, []); 

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="border-gray-200 border-2 p-4 m-4">
        <div className="flex justify-between items-center">
          <div className="relative mt-2 w-[300px]">
            <button
              type="button"
              className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              onClick={handleToggleDropdown}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-labelledby="listbox-label"
            >
              <span className="flex items-center">
                <div className={selectedOption ? selectedOption.iconStyle : ''}></div>
                <span className="ml-2 block truncate">{selectedOption ? selectedOption.name : 'Select an option'}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <ul
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabIndex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
              >
                {options.map((option) => (
                  <li
                    key={option.id}
                    className={`text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 ${selectedOption && selectedOption.id === option.id ? 'bg-indigo-100' : ''}`}
                    id={`listbox-option-${option.id}`}
                    role="option"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span className="flex items-center">
                      <div className={option.iconStyle}></div>
                      <span className={`font-normal ml-3 block truncate ${selectedOption && selectedOption.id === option.id ? 'font-semibold' : ''}`}>
                        {option.name}
                      </span>
                    </span>
                    {selectedOption && selectedOption.id === option.id && (
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
          <Delete
            width="20"
            height="20"
            className='cursor-pointer'
          />
        </div>
        <div className="border-t w-full my-4"></div>
        <input
          type="text"
          className="w-full p-3 border-b-2 border-gray-200 bg-gray-50 focus:border-b-2 focus:outline-none focus:border-indigo-500"
          placeholder="Nhập câu hỏi vào đây"
        />
        <div className="flex w-full items-center justify-between p-3 mt-4">
          <div className="flex w-full items-center">
            <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
            <input
              type="text"
              placeholder='Tùy chọn 1'
              className='py-2 w-full mx-3 focus:border-b-2 focus:border-indigo-500 focus:outline-none '
            />
          </div>
          <Close width="20" height="20" />
        </div>
        <div className="flex w-full items-center justify-between p-3 ">
          <div className="flex w-full items-center">
            <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
            <input
              type="text"
              placeholder='Tùy chọn 2'
              className='py-2 w-full mx-3 focus:border-b-2 focus:border-indigo-500 focus:outline-none '
            />
          </div>
          <Close width="20" height="20" />
        </div>
        <PlusB
          width="30"
          height="30"
          className="mt-4 cursor-pointer"
        />


      </div>
      <div className="px-3 py-2 m-4 w-[125px] bg-[#5C59E8] rounded-sm text-white font-medium cursor-pointer">Thêm câu hỏi</div>

    </div>
  )
}
