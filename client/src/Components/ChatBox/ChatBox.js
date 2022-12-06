import "./ChatBox.css";
import { useParams } from "react-router-dom"
import { MdSearch } from "react-icons/md"
import { SlOptionsVertical } from "react-icons/sl"

const ChatBox = () => {
    const { uid } = useParams();

    return (
        <div className="ChatBox-main">
            <div className="ChatBox-header">
                <div className="ChatBox-userInfo flex gap-1">
                    <div className="ChatBox-avatar">
                        <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={50} height={50} />
                    </div>
                    <div className="ChatBox-info">
                        <h2>Username: {uid}</h2>
                        <p>online</p>
                    </div>
                </div>

                <div className="ChatBox-options flex gap-1">
                    <MdSearch size={25} color="var(--grey)" />
                    <SlOptionsVertical size={25} color="var(--grey)" />
                </div>
            </div>
        </div>
    )
}

export default ChatBox