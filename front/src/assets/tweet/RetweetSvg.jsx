import React from 'react'

export const RetweetSvg = ({width, fill, hover, stroke}) => {
    return (
        <svg className={"stroke-2"} style={{width, height: "auto"}} height="21" viewBox="0 0 21 21" width="21"
             xmlns="http://www.w3.org/2000/svg">
            <g className={stroke} fill={fill} fillRule="evenodd" stroke="" strokeLinecap="round" strokeLinejoin="round"
               transform="translate(1 4)">
                <path d="m12.5 9.5 3 3 3-3"/>
                <path d="m8.5.5h3c2.209139 0 4 1.790861 4 4v8"/>
                <path d="m6.5 3.5-3-3-3 3"/>
                <path d="m10.5 12.5h-3c-2.209139 0-4-1.790861-4-4v-8"/>
            </g>
        </svg>
    )
}
