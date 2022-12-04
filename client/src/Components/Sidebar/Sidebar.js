import "./Sidebar.css";
import { MdSearch } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import ChatList from "../Chatlist/ChatList"

const Sidebar = () => {
    return (
        <div className='Sidebar-Main'>
            <div className="Sidebar-header flex">
                <h1 className="webTitle">XRecon</h1>

                <div className="Sidebar-avatar">
                    <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={40} height={40} />
                </div>
            </div>

            <div className="Sidebar-search flex">
                <div className="Sidebar-input flex">
                    <MdSearch size={25} color="var(--grey)" />
                    <input type="text" placeholder="Search or start new chat" />
                </div>

                <FiFilter size={25} color="var(--grey)" title="Filter Unread" />
            </div>

            <div className="Sidebar-chatList">
                <ChatList />
                <ChatList />
                <ChatList />
                <ChatList />
            </div>
        </div>
    )
}

export default Sidebar