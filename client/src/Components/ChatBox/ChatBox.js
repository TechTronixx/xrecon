import "./ChatBox.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useContextData } from "../../hooks/useContextData";
import axios from "axios";
import moment from "moment";

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
    const { user, socket } = useContextData();
    const location = useLocation();

    const ChatbodyRef = useRef();
    const MsgInputRef = useRef();
    const ContactAvatarRef = useRef();
    const navigate = useNavigate();

    let isMobile = window.innerWidth <= 750 ? true : false;
    let devHeight = window.innerHeight;

    useEffect(() => {
        if (location.state) {
            setContactInfo(location.state.data);
            ContactAvatarRef.current.innerHTML = location.state.data.avatarImg;
        }

        const GetChats = async () => {
            const result = await axios.post("/chat/getChat", {
                from: user.uid,
                to: location.state.data.id
            });
            console.log(result);
            result.data.status && setInitialChat(true);

            if (result.data.GetChats) {
                const messages = result.data?.GetChats?.messages;
                messages && messages.forEach(msg => {
                    const time = moment(msg.createdAt).format('LT');

                    if (msg.sender === user.uid) {
                        ChatbodyRef.current.innerHTML += `
                            <div class="ChatBox-MsgBlob selfMsg">
                                <div class="blob flex">
                                    <p>${msg.text}</p>
                                    <span>${time}</span>
                                </div>
                            </div>`;
                    } else {
                        ChatbodyRef.current.innerHTML += `
                            <div class="ChatBox-MsgBlob extMsg">
                                <div class="blob flex">
                                    <p>${msg.text}</p>
                                    <span>${time}</span>
                                </div>
                            </div>`;
                    }
                });
            }

        }

        if (!initialChat) {
            GetChats();
        }
    }, [location.state, user.uid, initialChat])

    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            const time = moment().format('LT');

            ChatbodyRef.current.innerHTML += `
                <div class="ChatBox-MsgBlob extMsg">
                    <div class="blob flex">
                        <p>${data.text}</p>
                        <span>${time}</span>
                    </div>
                </div>`;
        })
    }, [socket])

    useEffect(() => {
        if (contactInfo.id !== location.state.data.id) {
            setInitialChat(false);
            ChatbodyRef.current.innerHTML = "";
        }
    }, [location.state.data.id, contactInfo.id]);



    const HandleSendChat = async (e) => {
        e.preventDefault();
        let msg = MsgInputRef.current.value;
        if (msg === "") return;
        let time = moment().format('LT');

        ChatbodyRef.current.innerHTML += `
            <div class="ChatBox-MsgBlob selfMsg">
                <div class="blob flex">
                    <p>${msg}</p>
                    <span>${time}</span>
                </div>
            </div>`;

        // ChatbodyRef.current.innerHTML += `
        //     <div class="ChatBox-MsgBlob extMsg">
        //         <div class="blob flex">
        //             <p>${msg}</p>
        //             <span>12:00</span>
        //         </div>
        //     </div>`;

        MsgInputRef.current.value = "";

        try {
            const result = await axios.post("/chat/sendChat", {
                msg,
                from: user.uid,
                to: contactInfo.id
            });
            console.log("Msg Sent: ", result);

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
        <div className="ChatBox-main" style={{ height: `${devHeight}px` }}>
            {/* <div className="ChatBox-main"> */}

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
            <div
                className="ChatBox-body"
                style={initialChat ? { display: "flex" } : { display: "none" }}
                ref={ChatbodyRef}
                onClick={() => setToggleEmoji(false)}>
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
                        <input type="text" placeholder="Type a message" ref={MsgInputRef} onFocus={() => setToggleEmoji(false)} />
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