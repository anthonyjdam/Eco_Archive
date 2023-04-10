import { createContext } from "react";

const userContext = createContext({
    currentUser: "",
    setCurrentUser: (username) => {}
});

export default userContext;