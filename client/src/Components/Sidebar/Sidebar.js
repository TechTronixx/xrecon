import "./Sidebar.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ChatList from "../Chatlist/ChatList"
import { useContextData } from "../../hooks/useContextData";
import axios from "axios";
import { io } from "socket.io-client";

import { XreconText } from "../../Assets";
import { MdSearch } from "react-icons/md"
import { FiFilter } from "react-icons/fi"
import { RiChatNewLine } from "react-icons/ri"
import { BiUser } from "react-icons/bi"

export default function Sidebar() {
    const { user, setUser, setToken, socket } = useContextData();
    const AvatarRef = useRef();
    const SidbarRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // const HOST = "http://localhost:5000/";
            const HOST = "https://xrecon.onrender.com/";
            socket.current = io(HOST);
            socket.current.emit("addUser", user.uid);

            AvatarRef.current.innerHTML = user.avatarImg;
        }
    }, [user, socket])

    const Logout = () => {
        setUser({});
        setToken("");
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className='Sidebar-Main' ref={SidbarRef}>
            <div className="Sidebar-header flex">
                <Link to="/" className="flex">
                    <img src={XreconText} alt="Xrecon Logo" width="auto" height={40} />
                    {/* <h1 className="webTitle" style={{ fontSize: "30px" }}>Recon</h1> */}
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

            <ContactContainer />
        </div>
    )
}

export function ContactContainer() {
    const { user, forceUpdate } = useContextData();
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    const FetchContacts = async (uid) => {
        try {
            const result = await axios.post("/getContacts", { userID: uid })
            if (result.data.status) {
                setContacts(result.data.ContactData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user?.uid) {
            FetchContacts(user.uid);
        }
    }, [user, forceUpdate])

    const openChat = (obj) => {
        navigate(`/chat/${obj.username}`, { state: { data: obj } });
    }

    const HandleChatSearch = (e) => {
        let searchValue = e.target.value.toLowerCase();
        searchValue.length !== 0 ? setContacts(prev => prev.filter((obj) => {
            return obj.username.toLowerCase().includes(searchValue);
        })) : FetchContacts(user.uid);
    }

    return (
        <>
            <div className="Sidebar-search flex">
                <div className="Sidebar-input flex">
                    <MdSearch size={30} color="var(--grey)" />
                    <input type="text" placeholder="Search Chat" onChange={HandleChatSearch} />
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
        </>
    )
}