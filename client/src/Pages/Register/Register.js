import "./Register.css";
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdPerson, MdAlternateEmail, MdSearch } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { BiUser } from "react-icons/bi"
import { GoSync } from "react-icons/go"
// import { CircleBg } from "../../Assets/index.js"
import { toast } from 'react-toastify'
import multiavatar from '@multiavatar/multiavatar/esm'

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [error, setError] = useState("");
    const [isAvatarImg, setIsAvatarImg] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const AvatarRef = useRef();
    const RandomBtnRef = useRef();

    const navigate = useNavigate();

    const HandleRegister = (e) => {
        e.preventDefault();
        alert("Registering...")
    }

    const OnChangePass = () => {
        if (passwordRef.current.value !== confPasswordRef.current.value) {
            confPasswordRef.current.parentNode.classList.add("RegError");
            setError("Passwords do not match!");
        } else {
            setError("");
            confPasswordRef.current.parentNode.classList.remove("RegError");
        }
    }

    const HandleAvatarName = (e) => {
        if (e.target.value !== "") {
            GetAvatar(e.target.value);
            setIsAvatarImg(true);
        } else {
            AvatarRef.current.innerHTML = "";
            setIsAvatarImg(false);
        }
    }

    const GetAvatar = (name) => {
        if (name !== "") {
            const AvatarSVG = multiavatar(name);
            AvatarRef.current.innerHTML = AvatarSVG;
            setIsAvatarImg(true);
        } else {
            AvatarRef.current.innerHTML = "";
            setIsAvatarImg(false);
        }
    }

    const GetRandomAvatar = () => {
        RandomBtnRef.current.classList.toggle("RandomBtnActive");
        const AvatarSVG = multiavatar(Math.round(Math.random() * 10000));
        AvatarRef.current.innerHTML = AvatarSVG;
        setIsAvatarImg(true);
    }


    return (
        <div className="Register-main flex col">
            <div className="Register-card">
                <h1>Register to <span className="webTitle"> XRecon</span></h1>
                <form onSubmit={HandleRegister} className="Register-form flex col">
                    <div className="Register-input flex">
                        <input type="text" placeholder="Username" onChange={HandleAvatarName} />
                        <MdPerson size={25} color="var(--text)" />
                    </div>
                    <div className="Register-input flex">
                        <input type="email" placeholder="Email" />
                        <MdAlternateEmail size={25} color="var(--text)" />
                    </div>
                    <div className="Register-input flex">
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            ref={passwordRef}
                            autoComplete="new-password" />
                        <div className="Register-showpass flex" onClick={() => setShowPass(prev => !prev)}>
                            {!showPass ? <BsEyeSlash size={25} color="var(--text)" />
                                : <BsEye size={25} color="var(--text)" />}
                        </div>
                    </div>
                    <div className="Register-input flex">
                        <input
                            type={showConfPass ? "text" : "password"}
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            ref={confPasswordRef}
                            onChange={OnChangePass} />
                        <div className="Register-showpass flex" onClick={() => setShowConfPass(prev => !prev)}>
                            {!showConfPass ? <BsEyeSlash size={25} color="var(--text)" />
                                : <BsEye size={25} color="var(--text)" />}
                        </div>

                    </div>
                    <p className="Register-errorMsg" style={error === "" ? { display: "none" } : { display: "flex" }}>{error}</p>

                    <div className="Register-submit flex">
                        <input type="submit" value="Create New Account" />
                    </div>
                </form>
                <div className="Register-avatar">
                    <div className="Register-setAvatar flex col gap-1">
                        <div className="Register-avatarImg flex">
                            {!isAvatarImg && <BiUser size={60} color="var(--white)" />}
                            <div className="AvatarHolder" ref={AvatarRef}></div>
                            <div className="Register-randAvatar flex" title="Random Avatar" ref={RandomBtnRef} onClick={GetRandomAvatar}>
                                <GoSync size={25} color="var(--white)" />
                            </div>
                        </div>
                        <div className="Register-input flex">
                            <input
                                type="text"
                                placeholder="Avatar Name"
                                onChange={(e) => GetAvatar(e.target.value)} />
                            <MdSearch size={30} color="var(--text)" />
                        </div>
                    </div>
                    <div className="Register-login flex gap-1">
                        <p>Already have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register