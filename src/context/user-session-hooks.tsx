import { useContext } from "react";
import { USER_SESSION } from "../constants/env";
import { UserContext } from "./AuthProvider";

interface IUserSession {
    uid: string;
}


function useUserSession() {

    const userContext = useContext(UserContext);


    const getUserSession = () => {

        const hasUserContext = userContext?.user?.uid !== undefined && userContext?.user?.uid !== '';

        let userSession: IUserSession | null = null;

        if (sessionStorage.getItem(USER_SESSION)) {
            const sessionUser = JSON.parse(sessionStorage.getItem(USER_SESSION) || '');
            userSession = hasUserContext ? userContext.user : sessionUser !== '' ? sessionUser : null;
        }

        return userSession;
    }


    return { getUserSession };
}

export default useUserSession;