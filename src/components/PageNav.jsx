import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import { useEffect, useState } from "react"

function PageNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
 

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    
    
      function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Logo />
                <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`} 
                    onClick={toggleMenu}>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>


            <ul  className={`${isMenuOpen ? styles.active : ""}`}>
               
                
                <li>
                    <NavLink to="/Product">Product</NavLink>
                    </li>
                    
                <li>
                    <NavLink to="/Pricing">Pricing</NavLink>
                </li>
             
                <li>
                        <NavLink to="/Login" className={styles.ctaLink}>Logg in </NavLink>
                    </li>

                </ul>

            </nav>
        
        </div>
    )
}

export default PageNav
