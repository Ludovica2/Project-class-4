const ChatIsWriting = ({ name }) => {
    return (
        <div className='flex justify-start items-center p-4 gap-2 mt-4'>
            <p className='text-sm opacity-70'>{name} sta scrivendo</p>
            <svg className="cmpw7 cdqku cbm9w" viewBox="0 0 15 3" width="15" height="3">
                <circle cx="1.5" cy="1.5" r="1.5">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>
                </circle>
                <circle cx="7.5" cy="1.5" r="1.5">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>
                </circle>
                <circle cx="13.5" cy="1.5" r="1.5">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>
                </circle>
            </svg>
        </div>
    )
}

export default ChatIsWriting