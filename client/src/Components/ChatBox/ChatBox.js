import "./ChatBox.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useContextData } from "../../hooks/useContextData";
import ChatBlob from "./ChatBlob";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import moment from "moment";

import { MdSearch, MdArrowBackIos } from "react-icons/md"
import { BiSend, BiUser } from "react-icons/bi"
import { FaSmileWink } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { Xrecon } from "../../Assets";

const ChatBox = () => {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const [initialChat, setInitialChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const { user, socket } = useContextData();
    const location = useLocation();

    const MsgInputRef = useRef();
    const ContactAvatarRef = useRef();
    const ChatBodyRef = useRef();
    const navigate = useNavigate();

    let isMobile = window.innerWidth <= 750 ? true : false;
    // let devHeight = window.innerHeight;

    useEffect(() => {
        if (location.state) {
            setContactInfo(location.state.data);
            ContactAvatarRef.current.innerHTML = location.state.data.avatarImg;
        }

        const GetChats = async () => {
            setMessages([]);
            const result = await axios.post("/api/chat/getChat", {
                from: user.uid,
                to: location.state.data.id
            });
            result.data.status && setInitialChat(true);

            if (result.data.GetChats) {
                const msgList = result.data?.GetChats?.messages;
                setMessages(msgList);
            }

        }

        if (!initialChat) {
            GetChats();
        }
    }, [location.state, user.uid, initialChat])

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            setMessages([...messages, data]);
        })

        ChatBodyRef.current.scrollTop = ChatBodyRef.current.scrollHeight;
    }, [socket, messages])

    useEffect(() => {
        if (contactInfo.id !== location.state.data.id) {
            setInitialChat(false);
            setMessages([]);
        }
    }, [location.state.data.id, contactInfo.id]);

    const HandleSendChat = async (e) => {
        e.preventDefault();
        let msg = MsgInputRef.current.value;
        if (msg === "") return;
        let time = new Date().toISOString();

        setMessages([...messages, { text: msg, sender: user.uid, createdAt: time }]);
        MsgInputRef.current.value = "";

        try {
            await axios.post("/api/chat/sendChat", {
                msg,
                from: user.uid,
                to: contactInfo.id
            });

            socket.current.emit("sendMessage", {
                to: contactInfo.id,
                from: user.uid,
                text: msg
            });
        } catch (err) {
            console.log(err);
        }
    }

    const AddEmoji = (EmojiClickData) => {
        MsgInputRef.current.value += EmojiClickData.emoji;
    }

    return (
        // <div className="ChatBox-main" style={{ height: `${devHeight}px` }}>
        <div className="ChatBox-main">
            <div className="ChatBox-header">
                <div className="ChatBox-BackBtn flex" onClick={() => navigate("/")}>
                    <MdArrowBackIos size={isMobile ? 30 : 20} color="var(--grey)" />
                </div>

                <div className="ChatBox-userInfo">
                    <div className="ChatBox-avatar flex" ref={ContactAvatarRef}>
                        <BiUser size={35} color="var(--white)" />
                    </div>
                    <div className="ChatBox-info">
                        <span>{contactInfo.username}</span>
                        <p>online</p>
                    </div>
                </div>

                <div className="ChatBox-options flex gap-1">
                    <MdSearch size={isMobile ? 30 : 25} color="var(--grey)" />
                    <SlOptionsVertical size={isMobile ? 30 : 20} color="var(--grey)" />
                </div>
            </div>

            <div className="ChatBox-Loader flex" style={!initialChat ? { display: "flex" } : { display: "none" }}>
                <img src={Xrecon} alt="loader" width={50} height={50} />
            </div>
            <div className="ChatBox-bodyContainer" style={initialChat ? { display: "flex" } : { display: "none" }} onClick={() => setToggleEmoji(false)}>
                <div className="ChatBox-body" ref={ChatBodyRef}>
                    {messages.map((msg) => {
                        return <ChatBlob key={uuidv4()} msg={msg} />
                    })}
                </div>
            </div>

            <div className="ChatBox-footer">
                {toggleEmoji &&
                    <div className="ChatBox-emojiPicker">
                        <EmojiPicker
                            width="100%"
                            height="350px"
                            emojiStyle={EmojiStyle.NATIVE}
                            previewConfig={{ showPreview: false }}
                            autoFocusSearch={false}
                            lazyLoadEmojis={true}
                            skinTonesDisabled
                            onEmojiClick={AddEmoji} />
                    </div>
                }
                <form onSubmit={HandleSendChat} className="ChatBox-typer flex">
                    <FaSmileWink size={isMobile ? 40 : 30} color="var(--grey)" onClick={() => setToggleEmoji(prev => !prev)} />
                    <div className="ChatBox-input flex">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Type a message"
                            ref={MsgInputRef}
                            onFocus={() => setToggleEmoji(false)} />
                    </div>
                    <button type="submit" className="flex" onFocus={() => setToggleEmoji(false)} >
                        <BiSend size={35} color="var(--primary)" />
                    </button>
                </form>
            </div>
        </div >
    )
}

export default ChatBox