import React, { useState } from 'react';

export default function PencilLine(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <svg
            className=""
            width=""
            height=""
            {...props}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                style={{ stroke: isHovered ? 'green' : '#1D2026' }}
            >
                <path
                    d="M7.5 16.8749H3.75C3.58424 16.8749 3.42527 16.8091 3.30806 16.6918C3.19085 16.5746 3.125 16.4157 3.125 16.2499V12.7588C3.125 12.6767 3.14117 12.5954 3.17258 12.5196C3.20398 12.4438 3.25002 12.3749 3.30806 12.3168L12.6831 2.94185C12.8003 2.82464 12.9592 2.75879 13.125 2.75879C13.2908 2.75879 13.4497 2.82464 13.5669 2.94185L17.0581 6.43296C17.1753 6.55017 17.2411 6.70915 17.2411 6.87491C17.2411 7.04067 17.1753 7.19964 17.0581 7.31685L7.5 16.8749Z"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.625 5L15 9.375"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.8753 16.8748H7.50027L3.16504 12.5396"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}
