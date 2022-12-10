import "./Sidebar.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ChatList from "../Chatlist/ChatList"
import { useContextData } from "../../hooks/useContextData";
import axios from "axios"

import { Xrecon } from "../../Assets";
import { MdSearch } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import { RiChatNewLine } from "react-icons/ri"
import { BiUser } from "react-icons/bi"

const Sidebar = () => {
    const { user, setUser, setToken } = useContextData();
    const [contacts, setContacts] = useState([]);
    const AvatarRef = useRef();
    const SidbarRef = useRef();
    const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        const fetchContacts = async () => {
            const result = await axios.post("/getContacts", { userID: user.uid })
            setContacts(result.data.ContactData);
        }
        fetchContacts();
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

    const openChat = (obj) => {
        navigate(`/chat/${obj.username}`, { state: { data: obj } });
    }

    return (
        <div className='Sidebar-Main' ref={SidbarRef}>
            <div className="Sidebar-header flex">
                <Link to="/" className="flex">
                    <img src={Xrecon} alt="Xrecon Logo" width={35} height={35} />
                    <h1 className="webTitle">Recon</h1>
                </Link>

                <div className="flex gap-1">
                    <div className="flex" onClick={() => { navigate("/addContact") }}>
                        <RiChatNewLine size={30} color="var(--grey)" className="Sidebar-newChat" />
                    </div>

                    <div className="Sidebar-avatar flex" ref={AvatarRef} onClick={Logout}>
                        <BiUser size={30} color="var{--white}" />
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
                {contacts?.length !== 0 ? contacts?.map((obj) => {
                    return <div className="Sidebar-ChatItem" key={obj.id} onClick={() => { openChat(obj) }}>
                        <ChatList data={obj} />
                    </div>
                })
                    : <p>No Contacts found.</p>}
            </div>
        </div>
    )
}

export default Sidebar