import PencilLine from '@components/common/icon/PencilLine';
import styled from "styled-components";
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
export default function VideoWrapperComponent(
    {children, video_name , duration}
) {
  return (
    <div className="w-full m-auto flex mt-[20px] overflow-auto">
                    <div className="w-[20%]">
                        <VideoWrapper>
                            {children}
                        </VideoWrapper>
                    </div>
                    <div className="w-[80%] pl-4">
                        <div className="">
                            <h3 className="font-medium text-[#17163A] ">Tên video {video_name}</h3>
                            <h3 className="">Độ dài video: {duration}</h3>
                        </div>
                        <div className="flex items-center">
                            <PencilLine
                                width="18px"
                                height="18px"
                                stroke="#1D2026" className="cursor-pointer hover:stroke-[#1a9550]"
                            />
                            <label className="text-indigo-700 cursor-pointer pl-1">
                                Chỉnh sửa nội dung
                            </label>
                        </div>
                    </div>
                </div>
  )
}
