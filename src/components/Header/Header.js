import { NavLink } from "react-router-dom";
import styles from "./Header.module.css"
import { FaCommentDots } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <FaCommentDots/>
        </div>
      <Navigation />
    </header>
  );
};

export default Header;

// ______________________________________________________

const items = [
  { name: "Home", to: "/" },
  { name: "New Comment", to: "/new-comment" },
];

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {items.map((item) => {
        return (
          <li>
            <NavLink end to={item.to} className={(navData)=>navData.isActive ? "activeLink" : "link"}>{item.name}</NavLink>
          </li>
        );
      })}
    </nav>
  );
};
