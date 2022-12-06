import './Chatlist.css';
import { useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md"
import multiavatar from '@multiavatar/multiavatar/esm'

const ChatList = ({ uid }) => {
    const AvatarRef = useRef();

    useEffect(() => {
        const AvatarSVG = multiavatar(Math.round(Math.random() * 10000));
        AvatarRef.current.innerHTML = AvatarSVG;
    }, [])

    return (
        <div className='Chatlist-Main'>
            <div className="Chatlist-avatar" ref={AvatarRef}>
                <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={55} height={55} />
            </div>

            <div className="Chatlist-info flex col">
                <div className="Chatlist-userinfo">
                    <span>Username: {uid}</span>
                    <p>11/11/2022</p>
                </div>
                <div className="Chatlist-prevMsg">
                    <span>He Said Yo bro!</span>
                    <MdKeyboardArrowDown size={30} color="var(--grey)" />
                </div>
            </div>
        </div>
    )
}

export default ChatList;
