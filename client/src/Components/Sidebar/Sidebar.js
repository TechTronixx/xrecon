import "./Sidebar.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MdSearch } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import { RiChatNewLine } from "react-icons/ri"
import ChatList from "../Chatlist/ChatList"
import { useContextData } from "../../hooks/useContextData";

const Sidebar = () => {
    const { user, setUser, setToken } = useContextData();
    const AvatarRef = useRef();
    const SidbarRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        if (user) {
            AvatarRef.current.innerHTML = user.avatarImg;
        }
    }, [])

    const Logout = () => {
        localStorage.removeItem("xrecon-user-token");
        setUser({});
        setToken("");
        navigate("/login");
    }

    const openChat = (uid) => {
        navigate(`/chat/${uid}`);
    }

    return (
        <div className='Sidebar-Main' ref={SidbarRef}>
            <div className="Sidebar-header flex">
                <Link to="/">
                    <h1 className="webTitle">XRecon</h1>
                </Link>

                <div className="flex gap-1">
                    <RiChatNewLine size={30} color="var(--grey)" className="Sidebar-newChat" />

                    <div className="Sidebar-avatar" ref={AvatarRef} onClick={Logout}>
                        <img src="https://api.multiavatar.com/luffy.png" alt="Avatar" width={40} height={40} />
                    </div>
                </div>
            </div>

            <div className="Sidebar-search flex">
                <div className="Sidebar-input flex">
                    <MdSearch size={30} color="var(--grey)" />
                    <input type="text" placeholder="Search or start new chat" />
                </div>

                <FiFilter size={30} color="var(--grey)" title="Filter Unread" />
            </div>

            <div className="Sidebar-chatList">
                {tempArr.map((item) => {
                    return <div className="Sidebar-ChatItem" key={item} onClick={() => { openChat(item) }}>
                        <ChatList uid={item} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Sidebar