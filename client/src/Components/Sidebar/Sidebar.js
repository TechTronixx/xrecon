import "./Sidebar.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import { RiChatNewLine } from "react-icons/ri"
import ChatList from "../Chatlist/ChatList"
import { useContextData } from "../../hooks/useContextData";

const Sidebar = () => {
    const { user, setUser, setToken } = useContextData();
    const AvatarRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            AvatarRef.current.innerHTML = user.avatarImg;
        }
    }, [user])

    const Logout = () => {
        localStorage.removeItem("xrecon-user-token");
        setUser({});
        setToken("");
        navigate("/login");
    }

    return (
        <div className='Sidebar-Main'>
            <div className="Sidebar-header flex">
                <h1 className="webTitle">XRecon</h1>

                <div className="flex gap-1">
                    <RiChatNewLine size={30} color="var(--grey)" className="Sidebar-newChat" />

                    <div className="Sidebar-avatar" ref={AvatarRef} onClick={Logout}>
                        <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={40} height={40} />
                    </div>
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