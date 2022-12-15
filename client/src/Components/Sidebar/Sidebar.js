import "./Sidebar.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ChatList from "../Chatlist/ChatList"
import { useContextData } from "../../hooks/useContextData";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import { XreconText } from "../../Assets";
import { MdSearch } from "react-icons/md"
import { FiUserPlus, FiLogOut } from "react-icons/fi"
import { BiUser } from "react-icons/bi"

export default function Sidebar() {
    const [contacts, setContacts] = useState([]);
    const AvatarRef = useRef();
    const SidbarRef = useRef();

    const { user, setUser, setToken, socket, forceUpdate } = useContextData();
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

    useEffect(() => {
        if (user) {
            socket.current = io(axios.defaults.baseURL, { transports: ['websocket', 'polling', 'flashsocket'] });
            socket.current.emit("addUser", user.uid);

            AvatarRef.current.innerHTML = user.avatarImg;
        }
    }, [user, socket])

    const openChat = (obj) => {
        navigate(`/chat/${obj.username}`, { state: { data: obj } });
    }

    const HandleChatSearch = (e) => {
        let searchValue = e.target.value.toLowerCase();
        searchValue.length !== 0 ? setContacts(prev => prev.filter((obj) => {
            return obj.username.toLowerCase().includes(searchValue);
        })) : FetchContacts(user.uid);
    }

    const Logout = () => {
        setUser({});
        setToken("");
        localStorage.clear();
        navigate("/login");
    }

    const CopyUserID = () => {
        navigator.clipboard.writeText(user.uid);
        toast.success("Copied to clipboard", { position: "top-right" });
    }

    return (
        <div className='Sidebar-Main flex col' ref={SidbarRef}>
            <div className="Sidebar-header flex col">
                <div className="Sidebar-Title flex">
                    <Link to="/" className="flex">
                        <img src={XreconText} alt="Xrecon Logo" width="auto" height={40} />
                        {/* <h1 className="webTitle" style={{ fontSize: "30px" }}>Recon</h1> */}
                    </Link>

                    <div className="Sidebar-AddUser flex" onClick={() => { navigate("/addContact") }}>
                        <FiUserPlus size={30} color="inherit" className="Sidebar-newChat" />
                    </div>
                </div>

                <div className="Sidebar-search flex">
                    <div className="Sidebar-input flex">
                        <MdSearch size={30} color="var(--grey)" />
                        <input type="text" placeholder="Search Chat" onChange={HandleChatSearch} />
                    </div>

                    {/* <FiFilter size={30} color="var(--grey)" title="Filter Unread" /> */}
                </div>
            </div>

            <div className="Sidebar-ChatlistContainer">
                <div className="Sidebar-chatList">
                    {contacts?.length !== 0 ? contacts?.map((obj) => {
                        return <div className="Sidebar-ChatItem" key={obj.id} onClick={() => { openChat(obj) }}>
                            <ChatList data={obj} />
                        </div>
                    })
                        : <p>No Contacts found.</p>}
                </div>
            </div>

            <div className="Sidebar-Nav">
                <div className="flex gap-1">
                    <div className="Sidebar-avatar flex" ref={AvatarRef}>
                        <BiUser size={80} color="var{--white}" />
                    </div>

                    <div className="Sidebar-UserInfo">
                        <h3>{user?.username}</h3>
                        <p onClick={CopyUserID}>{user?.uid}</p>
                    </div>
                </div>

                <div className="Sidebar-Logout flex" onClick={Logout} title="Logout">
                    <FiLogOut size={25} color="var(--white)" />
                </div>
            </div>
        </div>
    )
}