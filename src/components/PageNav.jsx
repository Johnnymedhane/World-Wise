import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import { useState } from "react"

function PageNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
      function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }
    return (
        <div>
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
