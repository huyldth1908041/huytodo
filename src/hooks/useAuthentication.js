import {useHistory} from "react-router-dom";
import {addItemToLocalStorage, getLocalStorageObject, removeItemFromLocalStorage} from "../util";
import {useMemo, useState} from "react";
import todoService from "../service/todoService";
import {PROFILE_STORAGE_KEY} from "../constants";

const useAuthentication = () => {
  const history = useHistory();
  const getUser = () => {
    return getLocalStorageObject(PROFILE_STORAGE_KEY);
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    console.log(user);
    addItemToLocalStorage(PROFILE_STORAGE_KEY, user);
    setUser(user);
  };

  const logout = () => {
    removeItemFromLocalStorage(PROFILE_STORAGE_KEY);
    history.push('/login');
  };

  //call api then save
  const login = async (username, password) => {
    const {data: {accessToken, refreshToken, account}} = await todoService.login({username, password});
    saveUser({...account, accessToken, refreshToken});
  };
  //khai bao ham register o duoi nay
  const register = async (username, password) => {
    await todoService.register({username,password});
    await login(username, password)
    
  }
  const isLoggedIn = useMemo(() => !!user, [user]);

  return {
    setUser: saveUser,
    user,
    logout,
    login,
    isLoggedIn,
    register,
  };
}

export default useAuthentication