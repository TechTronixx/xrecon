import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from './Sidebar/Sidebar'

const Content = () => {
    const location = useLocation();
    const ContentRef = useRef();
    const OutletRef = useRef();

    useEffect(() => {
        let devWidth = window.innerWidth;
        if (devWidth < 750 && location.pathname === "/") {
            ContentRef.current.classList.add("Sidebar-Active");
            OutletRef.current.classList.add("Sidebar-Active");
        } else {
            ContentRef.current.classList.remove("Sidebar-Active");
            OutletRef.current.classList.remove("Sidebar-Active");
        }
    }, [location])

    return (
        <div className="Content-main" ref={ContentRef}>
            <Sidebar />
            <div className="Outlet" ref={OutletRef}>
                <Outlet />
            </div>
        </div>
    )
}

export default Content