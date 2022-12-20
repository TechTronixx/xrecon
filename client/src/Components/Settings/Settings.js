import "./Settings.css"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContextData } from "../../hooks/useContextData";
import multiavatar from "@multiavatar/multiavatar/esm";

import { MdArrowBackIos } from "react-icons/md";
import { BiUser, BiCheck, BiX } from "react-icons/bi";
import { GoSync } from "react-icons/go";

const Settings = () => {
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isUnameChanged, setIsUnameChanged] = useState(false);
    const [isError, setIsError] = useState(false);

    const { user } = useContextData();
    const navigate = useNavigate();

    const SyncRef = useRef();
    const AvatarRef = useRef();
    const UnameRef = useRef();

    useEffect(() => {
        if (user.avatarImg) {
            AvatarRef.current.innerHTML = user.avatarImg;
        }
    }, [user])

    const GetRandomAvatar = () => {
        const AvatarSVG = multiavatar(Math.round(Math.random() * 10000));
        AvatarRef.current.innerHTML = AvatarSVG;
        setIsAvatarChanged(true);

        SyncRef.current.children[0].classList.add("SyncActive");
        setTimeout(() => {
            SyncRef.current.children[0].classList.remove("SyncActive");
        }, 400);
    }

    const HandleSaveAvatar = (isSave) => {
        if (isSave) {

        } else {
            if (user.avatarImg) {
                AvatarRef.current.innerHTML = user.avatarImg;
            } else {
                const defaultAvatar = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color=#fff height="60" width="60" xmlns="http://www.w3.org/2000/svg" style="color: #fff;"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>';
                AvatarRef.current.innerHTML = defaultAvatar;
            }
        }

        setIsAvatarChanged(false);
    }

    const HandleSaveUname = (isSave) => {
        if (isSave) {

        } else {
            UnameRef.current.value = user.username;
        }

        setIsUnameChanged(false);
    }

    return (
        <div className="Settings-Main">
            <div className="Settings-header flex">
                <div className="Settings-BackBtn flex" onClick={() => navigate("/")}>
                    <MdArrowBackIos size={25} color="var(--grey)" />
                </div>
                <h2>Settings</h2>
            </div>

            <div className="Settings-body">
                <div className="Settings-AvatarHolder flex col">
                    <div className="Settings-Avatar" ref={AvatarRef}>
                        <BiUser size={35} color="var(--white)" />
                    </div>

                    <div className="flex gap-1">
                        <div className="Settings-ChangeAvatar flex gap-1" onClick={GetRandomAvatar} ref={SyncRef}>
                            <GoSync size={25} color="var(--white)" className="sync" />
                            <span>Random Avatar</span>
                        </div>

                        {isAvatarChanged && <div className="flex gap-1">
                            <div className="Settings-Btn save flex" onClick={() => HandleSaveAvatar(true)}>
                                <BiCheck size={25} color="var(--white)" />
                            </div>
                            <div className="Settings-Btn cancel flex" onClick={() => HandleSaveAvatar(false)}>
                                <BiX size={25} color="var(--white)" />
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="Settings-Form flex col">
                    <h4>Update User Information</h4>
                    <div className="Settings-InputGroup">
                        <div className="Settings-Input Edit flex col">
                            <input type="text" placeholder="Username" defaultValue={user.username} ref={UnameRef} onChange={() => setIsUnameChanged(true)} />
                            {isError && <p className="TxtHelper">Some error text</p>}
                        </div>

                        {isUnameChanged && <div className="flex gap-1">
                            <div className="Settings-Btn save flex" onClick={() => HandleSaveUname(true)}>
                                <BiCheck size={25} color="var(--white)" />
                            </div>
                            <div className="Settings-Btn cancel flex" onClick={() => HandleSaveUname(false)}>
                                <BiX size={25} color="var(--white)" />
                            </div>
                        </div>}
                    </div>

                    <div className="Settings-InputGroup">
                        <div className="Settings-Input flex col">
                            <input type="text" placeholder="Email" defaultValue={user.email} readOnly />
                        </div>
                    </div>

                    <div className="Settings-InputGroup">
                        <div className="Settings-Input flex col">
                            <input type="text" placeholder="UserID" defaultValue={user.uid} readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings