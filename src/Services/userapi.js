import axios from 'axios';
const usersUrl = 'http://localhost:9001/user';

export const adminLogin = async (user) => {
    return await axios.post(`${usersUrl}/login/`, user)
}

export const addTasklist = async (tasklist) => {
    return await axios.post(`${usersUrl}/tasklistAdd/`, tasklist)
}

export const ghUserData = async (userid) => {
    return await axios.post(`${usersUrl}/ghUserList/`,userid);
}

export const getsingleUsers = async (userID) => {
    return await axios.get(`${usersUrl}/userdata/${userID}`);
}

export const addUsers = async (user) => {
    return await axios.post(`${usersUrl}/addUser`, user);
}

export const editUsers = async (userID, user) => {
    return await axios.put(`${usersUrl}/editUser/${userID}`, user)
}