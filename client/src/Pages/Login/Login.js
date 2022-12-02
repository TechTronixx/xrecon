import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChatSVG } from "../../Assets/index.js"
import { MdAlternateEmail } from "react-icons/md"
import { BsShieldLock } from "react-icons/bs"
import { FiLogIn } from "react-icons/fi"
import { useContextData } from "../../hooks/useContextData"

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser } = useContextData();

    const OnSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setUser({ email, password });
    }

    return (
        <div className="Login-main">
            <div className="Login-sideart flex col">
                <h1 className="webTitle">WhatsWeb</h1>
                <img src={ChatSVG} width={400} height={400} alt="Messaging" priority={true} />
            </div>
            <div className="Login-form flex col">
                <form onSubmit={OnSubmit} className="flex col">
                    <h2>Login to <span className="webTitle">WhatsWeb</span></h2>

                    <div className="Login-input flex">
                        <input type="text" placeholder="Email" ref={emailRef} />
                        <MdAlternateEmail size={25} color="var(--text)" />
                    </div>
                    <div className="Login-input flex">
                        <input type="password" placeholder="Password" ref={passwordRef} />
                        <BsShieldLock size={25} color="var(--text)" />
                    </div>

                    <div className="Login-submit flex">
                        <FiLogIn size={25} color="var(--text-alt)" />
                        <input type="submit" value="Login" />
                    </div>
                </form>

                <div className="Login-signup flex gap-1">
                    <p>Don't have an account?</p>
                    <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login