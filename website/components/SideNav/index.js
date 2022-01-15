import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useRef, useContext } from "react";
import useOnClickOutside from "../Popup";
import { useRouter } from "next/router";
import UserContext from "../userContext";

import MenuIcon from "../../public/icons/menu.svg";
import HomeIcon from "../../public/icons/home.svg";
import ChatIcon from "../../public/icons/chat.svg";
import PayIcon from "../../public/icons/pay.svg";
import ProfileIcon from "../../public/icons/profile.svg";
import CartIcon from "../../public/icons/cart.svg";
import Link from "next/link";

const SidebarLink = ({ linkId, text }) => {
  const sidebarLinkData = {
    oompahome: {
      route: "/oompaloompa",
      icon: <HomeIcon className={styles["sidebar__icon"]} />,
    },
    oompachat: {
      route: "/oompaloompa/chat",
      icon: <ChatIcon className={styles["sidebar__icon"]} />,
    },
    oompapaycheck: {
      route: "/oompaloompa/paycheck",
      icon: <PayIcon className={styles["sidebar__icon"]} />,
    },
    oompaprofile: {
      route: "/oompaloompa/profile",
      icon: <ProfileIcon className={styles["sidebar__icon"]} />,
    },
    managerhome: {
      route: "/manager",
      icon: <HomeIcon className={styles["sidebar__icon"]} />,
    },
    manageritems: {
      route: "/manager/items",
      icon: <CartIcon className={styles["sidebar__icon"]} />,
    },
    managerpayments: {
      route: "/manager/payments",
      icon: <PayIcon className={styles["sidebar__icon"]} />,
    },
    managerprofile: {
      route: "/manager/profile",
      icon: <ProfileIcon className={styles["sidebar__icon"]} />,
    },
  };
  const router = useRouter();
  let isLinkActive = false;

  if (router.pathname.includes(sidebarLinkData[linkId]["route"])) {
    isLinkActive = true;
  }
  return (
    <Link href={sidebarLinkData[linkId]["route"]}>
      <a
        className={cx({
          sidebar__link: true,
          "sidebar__link--active": isLinkActive,
        })}
      >
        {sidebarLinkData[linkId]["icon"]}
        <span>{text}</span>
      </a>
    </Link>
  );
};

const Sidebar = (props) => {
  const { className, hiddenOnDesktop = false, ...otherProps } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false); // useContext or useState depending on the sidebar being hidden by default or not
  const node = useRef();
  useOnClickOutside(node, () => setSidebarOpen(false));

  const { user } = useContext(UserContext);

  const NavLinksMain = () => {
    const NavLinksRoleMiddleware = () => {
      return user.isManager ? (
        <>
          <SidebarLink linkId="managerhome" text="Home" />
          <SidebarLink linkId="manageritems" text="Items" />
          <SidebarLink linkId="managerpayments" text="Payments" />
          <SidebarLink linkId="managerprofile" text="Profile" />
        </>
      ) : (
        <>
          <SidebarLink linkId="oompahome" text="Home" />
          <SidebarLink linkId="oompachat" text="Chat" />
          <SidebarLink linkId="oompapaycheck" text="Paycheck" />
          <SidebarLink linkId="oompaprofile" text="Profile" />
        </>
      );
    };
    return (
      <>
        <div className={styles.sidebar__section}>
            <div className={styles["sidebar__logo-container"]}>
              <h1 className={styles.sidebar__heading}>Wonka's</h1>
            </div>
        </div>
        <div className={styles["sidebar__section"]}></div>
        <div
          className={cx(
            styles["sidebar__section"],
            styles["sidebar__section--nav"]
          )}
        >
          <NavLinksRoleMiddleware />
        </div>
      </>
    );
  };

  if (!hiddenOnDesktop) {
    return (
      <section className={cx(styles["sidebar-container"])}>
        <nav
          className={cx(
            styles.sidebar,
            styles["sidebar--mobile-hidden"],
            className,
            {
              [styles["sidebar--mobile-hidden--open"]]: sidebarOpen,
            }
          )}
          ref={node}
        >
          <NavLinksMain />
        </nav>
        <nav className={styles["sidebar-mobile"]}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon className={styles["menu-icon"]} />
          </button>
        </nav>
      </section>
    );
  } else {
    return (
      <nav
        className={cx(styles.sidebar, className, {
          [styles["sidebar--desktop-hidden"]]: true,
          [styles["sidebar--desktop-hidden--open"]]: sidebarOpen,
        })}
        ref={node}
      >
        <NavLinksMain />
      </nav>
    );
  }
};

export default Sidebar;
