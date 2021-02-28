import { createContext } from "react";

type UserContextType = {
    user: null|{
        portrait?: string,
    },
    username: null|string,
}


export const UserContext = createContext<UserContextType>({
    user: null,
    username: null
});