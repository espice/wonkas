import axios from "../../../config/axios";
import { useState, useEffect } from "react";
export default function SearchBar({ setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const search = async (term) => {
    setSearchLoading(true);
    const response = await axios.get("/api/search", {
      query: { term },
    });
    if (response.data.success) {
      setSearchResults(response.data.results);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    if (searchTerm == "") {
      return;
    }

    search(searchTerm);
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
