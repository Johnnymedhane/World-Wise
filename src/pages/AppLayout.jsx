
import Map from "../components/Map"
import Sidebar from "../components/Sidebar"
import styles from './AppLayout.module.css'
import User from "../components/User"
import DarkeModeBtn from "../components/DarkeModeBtn"
function AppLayout() {
    return (
        <div className={styles.app}>
           <DarkeModeBtn />
        <Sidebar />
        <Map />
        <User />
        </div>
    )
}

export default AppLayout
