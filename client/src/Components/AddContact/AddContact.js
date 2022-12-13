import "./AddContact.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContextData } from "../../hooks/useContextData";

import { BiUser, BiUserPlus } from "react-icons/bi";
import { MdSearch, MdArrowBackIos } from "react-icons/md"

const AddContact = () => {
    const [userResult, setUserResult] = useState(null);
    const SearchInputRef = useRef();
    const UserAvatarRef = useRef();
    const { user, setForceUpdate } = useContextData();
    const navigate = useNavigate();

    useEffect(() => {
        if (userResult) {
            UserAvatarRef.current.innerHTML = userResult.avatarImg;
        }
    }, [userResult])

    const FindUser = async () => {
        const userID = SearchInputRef.current.value;
        if (userID === user.uid) {
            toast.error("Invalid User ID");
            SearchInputRef.current.value = "";
            return;
        }

        try {
            const result = await axios.post("/findUser", { userID })
            setUserResult(result.data.user);
            // console.log(result)
        }
        catch (err) {
            console.log(err)
            toast.error("User not found");
        }
    }

    const AddUser = async () => {
        try {
            const result = await axios.post("/addContact", { userID: user.uid, contactID: userResult._id })
            if (result.data.status) {
                // let data = FetchContacts(user.uid);
                // setContactData(data);
                toast.success("User Added to Chat 👍");
            }

        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.message || "Something went wrong");
        }

        setForceUpdate(prev => prev + 1);
    }

    return (
        <div className="AddContact-Main">
            <div className="AddContact-Header flex">
                <div className="ChatBox-BackBtn flex" onClick={() => navigate("/")}>
                    <MdArrowBackIos size={25} color="var(--grey)" />
                </div>
                <h2>Add a new Contact</h2>
            </div>

            <div className="AddContact-Body">
                <div className="AddContact-Input flex">
                    <input type="text" placeholder="Paste or Enter the User ID" ref={SearchInputRef} />
                    <div className="AddContact-SearchBtn flex" onClick={FindUser}>
                        <MdSearch size={30} color="var(--white)" />
                    </div>
                </div>

                {userResult ? <div className="AddContact-SearchResult flex">
                    <div className="AddContact-UserInfo flex">
                        <div className="AddContact-UserAvatar flex" ref={UserAvatarRef}>
                            <BiUser size={40} color="var(--white)" />
                        </div>
                        <div className="AddContact-UserName flex col">
                            <span>{userResult.username}</span>
                            <p>{userResult._id}</p>
                        </div>

                        <div className="AddContact-AddBtn flex" onClick={AddUser}>
                            <BiUserPlus size={30} color="var(--white)" />
                            <p>Add</p>
                        </div>
                    </div>
                </div>
                    :
                    <div className="AddContact-SearchResult flex">
                        Ask your friend to share their User ID with you.
                    </div>}
            </div>
        </div>
    )
}

export default AddContact