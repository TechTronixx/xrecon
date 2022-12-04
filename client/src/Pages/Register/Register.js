import "./Register.css";
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdPerson, MdAlternateEmail } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { BiUser } from "react-icons/bi"
import { GoSync } from "react-icons/go"
// import { CircleBg } from "../../Assets/index.js"
import { toast } from 'react-toastify'
import multiavatar from '@multiavatar/multiavatar/esm'
// import axios from 'axios';

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [error, setError] = useState("");
    const [isAvatarImg, setIsAvatarImg] = useState(false);
    const [defaultName, setDefaultName] = useState("");

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const AvatarRef = useRef();
    const avatarInputRef = useRef();
    const RandomBtnRef = useRef();
    const FormRef = useRef();

    const navigate = useNavigate();

    const HandleRegister = (e) => {
        e.preventDefault();
        try {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const avatar = AvatarRef?.current?.value || "";

            // const result = axios.post('/users/register', { name, email, password, avatar });
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    const OnBlurPass = () => {
        if (passwordRef.current.value !== "") {
            passwordRef.current.value.length <= 4 && setError("Password Should be atleast 4 characters.")
        }
    }

    const OnChangePassConf = () => {
        if (passwordRef.current.value !== confPasswordRef.current.value) {
            confPasswordRef.current.parentNode.classList.add("RegError");
            setError("Passwords do not match!");
        } else {
            setError("");
            confPasswordRef.current.parentNode.classList.remove("RegError");
        }
    }

    const HandleAvatarName = (e) => {
        if (window.innerWidth <= 750) {
            FormRef.current.style.marginTop = "2em";
        }

        avatarInputRef.current.style.visibility = "visible";
        setDefaultName(e.target.value);
        GetAvatar(e.target.value);
        setIsAvatarImg(true);

        if (e.target.value === "") {
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

                <div className="Register-avatar flex">
                    <div className="Register-setAvatar flex col">
                        <div className="Register-avatarImg flex">
                            {!isAvatarImg && <BiUser size={60} color="var(--white)" />}
                            <div className="AvatarHolder" ref={AvatarRef}></div>
                            <div className="Register-randAvatar flex" title="Random Avatar" ref={RandomBtnRef} onClick={GetRandomAvatar}>
                                <GoSync size={25} color="var(--white)" />
                            </div>
                        </div>
                        <div className="Register-input flex" ref={avatarInputRef}>
                            <input
                                type="text"
                                placeholder="Avatar Name"
                                defaultValue={defaultName}
                                onChange={(e) => GetAvatar(e.target.value)} />
                        </div>
                    </div>
                </div>

                <form onSubmit={HandleRegister} ref={FormRef} className="Register-form flex col">
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
                            onBlur={OnBlurPass}
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
                            onChange={OnChangePassConf} />
                        <div className="Register-showpass flex" onClick={() => setShowConfPass(prev => !prev)}>
                            {!showConfPass ? <BsEyeSlash size={25} color="var(--text)" />
                                : <BsEye size={25} color="var(--text)" />}
                        </div>

                    </div>
                    <p className="Register-errorMsg" style={error === "" ? { display: "none" } : { display: "flex" }}>{error}</p>

                    <input type="submit" className="Register-submit flex" value="Create New Account" />
                </form>
                <div className="Register-login flex gap-1">
                    <p>Already have an account?</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register