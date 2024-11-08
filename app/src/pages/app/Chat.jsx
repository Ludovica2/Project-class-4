import { useEffect } from "react"

const Chat = () => {
    useEffect(() => {
        document.title = "Chat - Found!";
}, []);
return (
    <>
        <h1>Chat</h1>
        <p>hello world</p>
    </>
)
}

export default Chat