import "./Login.css";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatSVG } from "../../Assets/index.js"
import { MdAlternateEmail } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { FiLogIn } from "react-icons/fi"
// import { useContextData } from "../../hooks/useContextData"

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    // const { setUser } = useContextData();

    const HandleSubmit = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password)
        // setUser({ email, password });
    }

    return (
        <div className="Login-main">
            <div className="Login-sideart flex col">
                <h1 className="webTitle">XRecon</h1>
                <img src={ChatSVG} width={400} height={400} alt="Messaging" />
            </div>
            <div className="Login-form flex col">
                <form className="flex col">
                    <h2>Login to <span className="webTitle">XRecon</span></h2>

                    <div className="Login-input flex">
                        <input type="text" placeholder="Email" ref={emailRef} />
                        <MdAlternateEmail size={25} color="var(--text)" />
                    </div>
                    <div className="Login-input flex">
                        <input type="password" placeholder="Password" ref={passwordRef} />
                        <div className="Login-showpass flex" onClick={() => setShowPass(prev => !prev)}>
                            {!showPass ? <BsEyeSlash size={25} color="var(--text)" />
                                : <BsEye size={25} color="var(--text)" />}
                        </div>
                    </div>

                    <div className="Login-submit flex" onClick={HandleSubmit}>
                        <FiLogIn size={25} color="var(--text)" />
                        <input type="button" value="Login" />
                    </div>
                </form>

                <div className="Login-register flex gap-1">
                    <p>Don't have an account?</p>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login