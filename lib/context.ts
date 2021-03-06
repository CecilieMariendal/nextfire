import {createContext} from "react";
import {UserType} from '../@types/user.type'

type UserContextType = {
    user: null|UserType,
    username: null|string,
}


export const UserContext = createContext<UserContextType>({
    user: null,
    username: null
});