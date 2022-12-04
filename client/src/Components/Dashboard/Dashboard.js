import "./Dashboard.css"
import Sidebar from "../Sidebar/Sidebar"
import { ChatSVG } from "../../Assets"

const Dashboard = () => {
    return (
        <div className='Dashboard-Main'>
            <Sidebar />

            <div className="Dashboard-welcome flex col">
                <h1>Welcome to <span className="webTitle">XRecon</span></h1>
                <img src={ChatSVG} alt="Welcome SVG" width={350} height={350} />
                <p>XRecon is a realtime chat app, Users can text and interact with other users.</p>
            </div>
        </div>
    )
}

export default Dashboard