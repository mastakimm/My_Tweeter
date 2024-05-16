function Arrow({ className, onClick }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={ className } onClick={onClick}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M6 12H18M6 12L11 7M6 12L11 17" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"></path>
            </g>
        </svg>
    )
}

export default Arrow