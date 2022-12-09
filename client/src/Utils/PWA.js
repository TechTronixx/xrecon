import { toast } from 'react-toastify';
import { MdDevices } from "react-icons/md";

const PWA = () => {
    let deferredPrompt;

    //Install PWA triggered by Toast
    const InstallPWA = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("PWA Install: ", outcome)
            deferredPrompt = null;
        } else {
            alert("Prompt Failed");
        }
    }

    const Msg = ({ closeToast, toastProps }) => (
        <div className="PWAContainer flex">
            Install PWA App
            <button className='PWABtn flex' onClick={InstallPWA}>
                <MdDevices color='inherit' size={25} />
                <span>Install</span>
            </button>
        </div>
    );

    //Before Install Prompt: Show Toast
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        toast(<Msg />, {
            position: "top-right",
            autoClose: 8000,
        })
    });

    //Show Toast after Install
    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        console.log("PWA was installed");
        toast.success("PWA installed 👍", {
            position: "top-right",
            autoClose: 5000,
        });
    });
}

export default PWA