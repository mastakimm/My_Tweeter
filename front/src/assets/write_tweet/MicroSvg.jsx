export const MicroSvg = ({cursor, width , fill}) => {
    return (
        <svg style={{ cursor, width, height: "auto" }} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className={`${cursor} dark:stroke-blue-500 stroke-blue-800`}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
        </svg>

    )
}
