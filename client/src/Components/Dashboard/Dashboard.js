import "./Dashboard.css"
import Sidebar from "../Sidebar/Sidebar"
import { useContextData } from "../../hooks/useContextData"
import { ChatSVG } from "../../Assets"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"

const Dashboard = () => {
    const { user } = useContextData();

    const CopyUserID = () => {
        navigator.clipboard.writeText(user.uid);
        toast.success("Copied to clipboard");
    }

    return (
        <div className='Dashboard-Main'>
            <div className="Dashboard-welcome flex col">
                <h1>Welcome to <span className="webTitle">XRecon</span></h1>

                <div className="Dashboard-copyUid flex">
                    <input type="text" value={user.uid} readOnly />
                    <div className="Dashboard-copyBtn flex" onClick={CopyUserID}>
                        <MdContentCopy size={25} color="var(--white)" title="Copy User ID" />
                    </div>
                </div>

                <img src={ChatSVG} alt="Welcome SVG" width={350} height={350} />
                <p>XRecon is a realtime chat app, Users can text and interact with other users.</p>
            </div>
        </div>
    )
}

export default Dashboard