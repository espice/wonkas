import styles from "./index.module.scss";
import { useState } from "react";

export default function SideNav() {
  const [isOpen, setOpen] = useState(false);

  return <>{isOpen ? <div></div> : "not"}</>;
}
