import "./Register.css";
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdPerson, MdAlternateEmail } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"
// import { CircleBg } from "../../Assets/index.js"
import { toast } from 'react-toastify'

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [error, setError] = useState(true);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const navigate = useNavigate();

    const HandleRegister = (e) => {
        e.preventDefault();
        alert("Registering...")
    }

    const OnChangePass = () => {
        if (passwordRef.current.value !== confPasswordRef.current.value) {
            toast.error("Passwords do not match!")
            passwordRef.current.parentNode.classList.add("error");
            confPasswordRef.current.parentNode.classList.add("error");
            // console.log(passwordRef.current.parentNode.style)
        } else {
            setError(false);
            passwordRef.current.parentNode.classList.remove("error");
            confPasswordRef.current.parentNode.classList.remove("error");
        }
    }


    return (
        <div className="Register-main flex col">
            {/* <img className="Register-bgImg" src={CircleBg} alt="Circle Blobs" /> */}
            <h1>Register to <span className="webTitle">XRecon</span></h1>

            <form onSubmit={HandleRegister} className="Register-form flex col">
                <div className="Register-input flex">
                    <input type="text" placeholder="Username" />
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
                        autoComplete="new-password"
                        onChange={OnChangePass} />
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

                <div className="Register-submit flex">
                    <input type="submit" value="Create New Account" />
                </div>
            </form>
            <div className="Register-login flex gap-1">
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Register