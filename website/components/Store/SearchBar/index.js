import { useState, useEffect } from "react";
import styles from "./index.module.scss";
export default function SearchBar({ productList, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  const search = async (term) => {};

  useEffect(() => {
    if (searchTerm == "") {
      return;
    }

    search(searchTerm);
  }, [searchTerm]);

  return (
    <div className={styles.searchbar}>
      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchbar__input}
      />
    </div>
  );
}
