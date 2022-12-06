import "./Login.css";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatSVG } from "../../Assets/index.js"
import { MdAlternateEmail } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { FiLogIn, FiLoader } from "react-icons/fi"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContextData } from "../../hooks/useContextData"

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const SubmitRef = useRef();

    const { setUser, setToken } = useContextData();
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // console.log(email, password)
        // setUser({ email, password });

        try {
            const result = await axios.post('/login', { email, password });
            // console.log(result);

            if (result.data.status) {
                let user = result.data.user;
                let token = result.data.token;

                setUser(user);
                setToken(token);

                localStorage.setItem('xrecon-user-token', JSON.stringify({ user, token }));
                navigate("/");
            } else {
                toast.error(result.data.error || "Something went wrong");
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data.error || "Something went wrong");
        }
    }

    return (
        <div className="Login-main">
            <div className="Login-sideart flex col">
                <h1 className="webTitle">XRecon</h1>
                <img src={ChatSVG} width={400} height={400} alt="Messaging" />
            </div>
            <div className="Login-form flex col">
                <form onSubmit={HandleSubmit} className="flex col">
                    <h2>Login to <span className="webTitle">XRecon</span></h2>

                    <div className="Login-input flex">
                        <input type="email" placeholder="Email" ref={emailRef} required />
                        <MdAlternateEmail size={25} color="var(--black)" />
                    </div>
                    <div className="Login-input flex">
                        <input type={showPass ? "text" : "password"} placeholder="Password" ref={passwordRef} required />
                        <div className="Login-showpass flex" onClick={() => setShowPass(prev => !prev)}>
                            {!showPass ? <BsEyeSlash size={25} color="var(--black)" />
                                : <BsEye size={25} color="var(--black)" />}
                        </div>
                    </div>

                    <div className="Login-submit flex" onClick={() => SubmitRef.current.click()}>
                        {!loading ? <FiLogIn size={25} color="var(--white)" />
                            : <FiLoader size={25} color="var(--white)" />}
                        <input type="submit" ref={SubmitRef} value="Login" />
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