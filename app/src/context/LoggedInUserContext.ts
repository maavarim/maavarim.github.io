import React from "react";
import User from "../types/User";

const LoggedInUserContext = React.createContext<User | null>(null);

export default LoggedInUserContext;
