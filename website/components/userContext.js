import React from "react";

const UserContext = React.createContext({
  user: {},
  loading: true,
  setUser: () => {},
  setLoading: () => {},
});

export default UserContext;
