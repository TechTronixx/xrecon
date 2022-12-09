import "./Dashboard.css"
import Sidebar from "../Sidebar/Sidebar"
import { useContextData } from "../../hooks/useContextData"
import { ChatSVG, Xrecon } from "../../Assets"
import { MdContentCopy } from "react-icons/md"
import { toast } from "react-toastify"

const Dashboard = () => {
    const { user } = useContextData();

    const CopyUserID = () => {
        navigator.clipboard.writeText(user.uid);
        toast.success("Copied to clipboard", { position: "top-right" });
    }

    return (
        <div className='Dashboard-Main'>
            <div className="Dashboard-welcome flex col">
                <h1 className="flex">Welcome to
                    <img src={Xrecon} className="Dashboard-XImg" alt="Xrecon Logo" width={52} height={52} />
                    <span className="webTitle">Recon</span>
                </h1>

                <img src={ChatSVG} alt="Welcome SVG" width={350} height={350} />

                <div className="Dashboard-copyUid flex col">
                    <span>Copy and share your User Id :</span>
                    <div className="flex">
                        <input type="text" value={user.uid} readOnly />
                        <div className="Dashboard-copyBtn flex" onClick={CopyUserID}>
                            <MdContentCopy size={25} color="var(--white)" title="Copy User ID" />
                        </div>
                    </div>
                </div>

                <p>XRecon is a realtime chat app, Users can text and interact with other users.</p>
            </div>
        </div>
    )
}

export default Dashboard