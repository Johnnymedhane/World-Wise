import { useEffect, useState } from "react";
import styles from "./DarkeModeBtn.module.css"
function DarkeModeBtn() {
    function handleClick() {
        setIsFakeDark((isFakeDark) => !isFakeDark);
    }


    const [isFakeDark, setIsFakeDark] = useState(false);

    useEffect(() => {
        if (isFakeDark) {
            document.documentElement.classList.add("fake-dark-mode");
        } else {
            document.documentElement.classList.remove("fake-dark-mode");
        }
        
    }, [isFakeDark]);

    return (
        <button
            onClick={handleClick}
            className={styles.btnDarkMode}>
            {isFakeDark ? "☀️" : "🌙"}
        </button>
    );
}

export default DarkeModeBtn;
