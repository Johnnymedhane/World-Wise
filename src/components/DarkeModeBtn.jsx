import { useEffect, useState } from "react";
import styles from "./DarkeModeBtn.module.css"
function DarkeModeBtn() {


    const [isFakeDark, setIsFakeDark] = useState(false);

     useEffect(
        function () {
          document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );
    
    return (
        <button
            onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
            className={styles.btnDarkMode}
        >
            {isFakeDark ? "☀️" : "🌙"}
        </button>
    );
}

export default DarkeModeBtn;
