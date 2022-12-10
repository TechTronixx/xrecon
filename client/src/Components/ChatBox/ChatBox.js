import "./ChatBox.css";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useContextData } from "../../hooks/useContextData";
import axios from "axios"

import { MdSearch, MdArrowBackIos } from "react-icons/md"
import { BiSend, BiUser } from "react-icons/bi"
import { FaSmileWink } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

const ChatBox = () => {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const { user } = useContextData();
    const location = useLocation();

    const ChatbodyRef = useRef();
    const MsgInputRef = useRef();
    const ContactAvatarRef = useRef();
    const navigate = useNavigate();

    let isMobile = window.innerWidth <= 750 ? true : false;

    useEffect(() => {
        if (location.state) {
            setContactInfo(location.state.data);
            ContactAvatarRef.current.innerHTML = location.state.data.avatarImg;
        }
    }, [location])

    const HandleSendChat = async (e) => {
        e.preventDefault();
        let msg = MsgInputRef.current.value;
        if (msg === "") return;

        ChatbodyRef.current.innerHTML += `
            <div class="ChatBox-MsgBlob selfMsg">
                <div class="blob flex">
                    <p>${msg}</p>
                    <span>12:00</span>
                </div>
            </div>`;

        ChatbodyRef.current.innerHTML += `
            <div class="ChatBox-MsgBlob extMsg">
                <div class="blob flex">
                    <p>${msg}</p>
                    <span>12:00</span>
                </div>
            </div>`;

        MsgInputRef.current.value = "";

        await axios.post("http://localhost:5000/api/chat/sendChat", {
            msg,
            from: user.uid,
            to: contactInfo.id
        });
        // console.log(result);
    }

    const AddEmoji = (EmojiClickData) => {
        MsgInputRef.current.value += EmojiClickData.emoji;
    }

    return (
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
                        <h2>{contactInfo.username}</h2>
                        <p>online</p>
                    </div>
                </div>

                <div className="ChatBox-options flex gap-1">
                    <MdSearch size={isMobile ? 30 : 25} color="var(--grey)" />
                    <SlOptionsVertical size={isMobile ? 30 : 20} color="var(--grey)" />
                </div>
            </div>

            <div className="ChatBox-body" ref={ChatbodyRef}></div>

            <div className="ChatBox-footer">
                {toggleEmoji &&
                    <div className="ChatBox-emojiPicker">
                        <EmojiPicker
                            width="100%"
                            height="350px"
                            emojiStyle={EmojiStyle.NATIVE}
                            previewConfig={{ showPreview: false }}
                            skinTonesDisabled
                            onEmojiClick={AddEmoji} />
                    </div>
                }
                <form onSubmit={HandleSendChat} className="ChatBox-typer flex">
                    <FaSmileWink size={isMobile ? 40 : 30} color="var(--grey)" onClick={() => setToggleEmoji(prev => !prev)} />
                    <div className="ChatBox-input flex">
                        <input type="text" placeholder="Type a message" ref={MsgInputRef} onFocus={() => setToggleEmoji(false)} />
                    </div>
                    <button type="submit" className="flex">
                        <BiSend size={35} color="var(--primary)" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox