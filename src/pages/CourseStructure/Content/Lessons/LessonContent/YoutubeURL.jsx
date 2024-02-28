import { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import Input from "@components/Input/Input"

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
export default function YoutubeURL({callback, youtubeURL}) {
    const [youtubeLink, setYoutubeLink] = useState(youtubeURL ?? "");
    const [invalidLink, setInvalidLink] = useState(false);
    const extractVideoId = (link) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = link.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const checkYouTubeVideoExistence = async (videoId) => {
        const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to check video existence');
            }

            const data = await response.json();
            youtubeURL.videoURL = youtubeLink;
            callback(youtubeURL)
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
    return (
        <div className="p-5">
            <Input
                type={"text"}
                placeholder={"Nhập link video Youtube vào đây"}
                className={"w-full border-2 border-gray-200 py-3 px-4 focus:border-indigo-500 focus:bg-gray-100 focus:outline-none"}
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
    )
}
