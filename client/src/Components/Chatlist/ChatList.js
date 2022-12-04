import './Chatlist.css'
import { MdKeyboardArrowDown } from "react-icons/md"

const ChatList = () => {
    return (
        <div className='Chatlist-Main'>
            <div className="Chatlist-avatar">
                <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={55} height={55} />
            </div>

            <div className="Chatlist-info flex col">
                <div className="Chatlist-userinfo">
                    <span>Username</span>
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
