import React, { useState, useRef } from "react";
import Menu from '../../../components/common/icon/Menu'
import Plus from '../../../components/common/icon/Plus'
import Trash from '../../../components/common/icon/Trash'
import Pencil from '../../../components/common/icon/Pencil'
import Youtube from '../../../components/common/icon/Youtube'
import Quizz from '../../../components/common/icon/Quizz'
import File from '../../../components/common/icon/File'
import PencilLine from '../../../components/common/icon/PencilLine'
import Delete from '../../../components/common/icon/Delete'
import Close from '../../../components/common/icon/Close'
import Input from '../../../components/Input/Input'
import Button from '../../../components/Button/Button'
import styled from "styled-components";
import ReactPlayer from "react-player";
import { ServerApi } from "../../../utils/http";
import { useQuery } from "react-query";
export default function Content() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [invalidLink, setInvalidLink] = useState(false);
  
  const videoRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      // Load the video file into the video element for preview
      const fileURL = URL.createObjectURL(file);
      videoRef.current.src = fileURL;
    }
  };

  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const checkYouTubeVideoExistence = async (videoId) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to check video existence');
      }
  
      const data = await response.json();
  
      // Kiểm tra nếu có kết quả và có items trong danh sách
      return data.items && data.items.length > 0;
    } catch (error) {
      console.error('Error checking YouTube video existence:', error);
      return false;
    }
  };

  const handleYoutubeLinkChange = async (event) => {
    const link = event.target.value;
    setYoutubeLink(link);
  
    // Kiểm tra nếu liên kết từ YouTube
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      setInvalidLink(false);
      // Trích xuất ID video từ liên kết
      const videoId = extractVideoId(link);
      // Kiểm tra tính hợp lệ của video
      const isVideoValid = await checkYouTubeVideoExistence(videoId);
      if (!isVideoValid) {
        setInvalidLink(true);
      }
    } else {
      setInvalidLink(true);
    }
  };
  
  // Hàm trích xuất ID video từ liên kết YouTube
  const extractVideoId = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

 
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



  //Course_id test
  const course_id = 1;
  //Course_id test

  //Sections
  const [isShowAddNewSection, setIsShowAddNewSection] = useState(false);
  const getSectionDocs = async () => {
    return (await ServerApi.get("admin-query/getAllLessonQuizzVideo/" + course_id))?.data?.SectionDoc || [];
  }

  const { data: sections, isFetching, isLoading, error, isError, refetch: triggerRefetchSections } = useQuery('getCourseContentById-' + course_id, getSectionDocs)
  //Đây là phần học đã được tạo
  const SectionComponent = ({ currentSectionData, index }) => {
    const { name } = currentSectionData;
    return (
      <div className="px-6 bg-white">
        <div className="flex py-6 bg-white w-full justify-between items-center">
          <div className="flex gap-2 w-full mr-4 items-center">
            <Menu width="24" height="24" />
            <div className="text-[#1D2026] font-medium whitespace-nowrap ">Phần {index + 1}:</div>
            <Input
              type={"text"}
              disabled={true}
              placeholder={name}
              className={
                "w-full  py-2  focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
              }
            />
          </div>
          <div className="flex gap-2">
            <Plus width="24" height="24" />
            <PencilLine width="24" height="24" />
            <Delete width="24" height="24" />
          </div>
        </div>
      </div>
    )
  }
  //Đây là phần học đã được tạo

  //Component Box để thêm 1 phần học
  const NewSectionComponent = () => {
    const [sectionData, setSectionData] = useState({
      course_id: course_id,
      name: '',
      status: '1',
    });
    const handleAddSection = async (event) => {
      event.preventDefault();
      try {
        const response = await ServerApi.post('section', sectionData);
        triggerRefetchSections()
        return setIsShowAddNewSection(false)
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className="px-6 bg-white">
        <div className="flex py-7 bg-white w-full justify-between items-center">
          <div className="flex gap-2 w-full mr-4 items-center">
            {/* <Menu width="24" height="24" /> */}
            <div className="text-[#1D2026] whitespace-nowrap text-base font-medium	">Phần học mới:</div>
            <Input
              type={"text"}
              placeholder={"Tên phần học"}
              value={sectionData.name}
              onChange={(event) => setSectionData({ ...sectionData, name: event.target.value })}
              className={
                "w-full p-2 focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
              }
            />
          </div>
          <div className="flex gap-2">
            <Plus width="24" height="24" className="cursor-pointer" onClick={(e) => handleAddSection(e)} />
            <Close width="24" height="24" className="cursor-pointer" onClick={
              () => {
                setIsShowAddNewSection(false);
              }
            }></Close>
            {/* <PencilLine width="24" height="24" />
            <Delete width="24" height="24" /> */}
          </div>
        </div>
      </div>
    )
  }
  //Component Box để thêm 1 phần học

  //Đây là nút thêm mới phần học
  const AddNewSectionComponent = () => {
    return (
      <Button
        Class="my-6 flex font-medium items-center bg-indigo-500 hover:bg-indigo-700 transition ease-in-out text-white py-2 px-4 rounded-lg"
        text="Thêm phần"
        onClick={() => {
          setIsShowAddNewSection(true);
        }
        }
      />
    )
  }
  //Đây là nút thêm mới phần học

  //Sections

  return (
    <>
      <div className="mx-6">
        {
          sections && sections?.length > 0 && sections.map((item, index) => (
            <SectionComponent
              currentSectionData={item}
              index={index}
              key={index}
            />
          ))
        }
        {
          AddNewSectionComponent()
        }
        {
          isShowAddNewSection && <NewSectionComponent />
        }
         <div className="mx-6 p-6 bg-white">
      <div className="flex py-6 bg-white w-full justify-between items-center">
        <div className="flex gap-2 w-full mr-4 items-center">
          <Menu width="24" height="24" />
          <div className="text-[#1D2026] font-medium whitespace-nowrap ">Phần 01:</div>
          <Input
            type={"text"}
            placeholder={"Tên phần học"}
            className={
              "w-full  py-2  focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
            }
          />
        </div>
        <div className="flex gap-2">
          <Plus width="24" height="24" />
          <PencilLine width="24" height="24" />
          <Delete width="24" height="24" />
        </div>
      </div>

      {/* Thêm bài học */}
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
              "w-full py-1 focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
            }
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center border-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
            <div className="font-medium text-[#17163A] whitespace-nowrap">Nội dung</div>
            <svg
              className="pl-2 "
              fill="#17163A"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1s1-0.447 1-1v-18c0-0.553-0.447-1-1-1z" />
              <path d="M22 11c0-0.553-0.447-1-1-1h-18c-0.553 0-1 0.447-1 1s0.447 1 1 1h18c0.553 0 1-0.447 1-1z" />
            </svg>
          </div>
          <PencilLine
            width="20"
            height="20"
          />
          <Delete
            width="20"
            height="20"
          />
        </div>
      </div>
      {/* Chọn nội dung */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 w-full items-center mr-4">
            <Menu
              width="20"
              height="20"
            />
            <Input
              type={"text"}
              placeholder={"Tên bài học"}
              className={
                "w-full py-1 focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
              }
            />
          </div>
          <div className="flex gap-2 items-center relative">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A] whitespace-nowrap">Nội dung</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="py-[20px] flex flex-col items-center border-2 border-gray-200">
          <div className="pb-6">Chọn loại nội dung</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <File
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Upload File</div>
            </div>
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <Youtube
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Youtube</div>
            </div>
            <div className="flex flex-col items-center w-[100px] border-2 border-gray-200 py-[10px] px-3">
              <Quizz
                width="36" height="36"
              />
              <div className="pt-2 text-[14px]">Quizz</div>
            </div>
          </div>

        </div>
      </div>
      {/* Chọn file */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 w-full items-center mr-4">
            <Menu
              width="20"
              height="20"
            />
            <Input
              type={"text"}
              placeholder={"Tên bài học"}
              className={
                "w-full py-1 focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A] whitespace-nowrap">Thêm video</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="p-5 border-2 border-gray-200">
          <div className="flex w-full">
            <div className="w-full border-2 border-gray-200 py-3 px-4 text-[#8C94A3]">
              {selectedFile ? selectedFile.name : 'Chưa có tệp nào được chọn'}
            </div>
            <label htmlFor="fileInput" className="w-1/4 bg-[#E9EAF0] px-[72px] py-3 font-medium cursor-pointer">
              Upload File
            </label>
            <input
              type="file"
              id="fileInput"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          {/* Conditionally render the video element */}
          {selectedFile && (
            <div className="bg-[#000] max-w-[600px] m-auto mt-[20px]">

              <VideoWrapper>
                <div>
                  <ReactPlayer
                    url={URL.createObjectURL(selectedFile)}
                    width="100%"
                    height="100%"
                    controls={true}

                  />
                </div>
              </VideoWrapper>
            </div>
          )}
          <div className="py-4">
            <span className="font-medium">Lưu ý:</span> Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.
          </div>
        </div>

      </div>
      {/* Chọn link youtube */}
      <div className="mb-6">
        <div className="flex px-4 pt-3 bg-white w-full justify-between items-center border-t-2 border-l-2 border-r-2 border-gray-200">
          <div className="flex gap-2 w-full items-center mr-4">
            <Menu
              width="20"
              height="20"
            />
            <Input
              type={"text"}
              placeholder={"Tên bài học"}
              className={
                "w-full py-1 focus:border-b-gray-400 focus:border-b-2 focus:outline-none"
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center border-t-2 border-l-2 border-r-2 border-gray-200 transition ease-in-out text-gray-500 py-2 px-4 ">
              <div className="font-medium pr-2 text-[#17163A] whitespace-nowrap">Thêm video Youtube</div>
              <Close
                width="20"
                height="20"
              />
            </div>
            <PencilLine
              width="20"
              height="20"
            />
            <Delete
              width="20"
              height="20"
            />
          </div>
        </div>
        <div className="p-5 border-2 border-gray-200">
          <Input
            type={"text"}
            placeholder={"Nhập link video Youtube vào đây"}
            className={"w-full border-2 border-gray-200 py-3 px-4 focus:border-gray-400 focus:outline-none"}
            onChange={handleYoutubeLinkChange}
          />
          {invalidLink ? (
            <div className="py-4 text-red-500">Liên kết không hợp lệ</div>
          ) : youtubeLink && (
            <div className="bg-[#000] max-w-[600px] m-auto mt-[20px] overflow-auto">
              <VideoWrapper>
                <div>
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={youtubeLink}
                    controls={true}
                  />
                </div>
              </VideoWrapper>
            </div>
          )}
          <div className="py-4"> <span className='font-medium'>Lưu ý:</span>Tất cả các tệp phải có kích thước tối thiểu là 720p và nhỏ hơn 4,0 GB.</div>
        </div>
      </div>
    </div>
</div>

    </>


  )
}