import React, { useEffect, useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const history = useHistory();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
            }
            const response = await fetch('http://localhost:3000/user-data', options);
            console.log(response.status)
            if (response.status === 401) {
                history.push('/login')
            }
            const result = await response.json();
            const { email, name, lastName } = result;
            const userDataObj = {
                email,
                name,
                lastName
            }
            setUserData(userDataObj);
        }

        fetchUserData();
    },[history]);


    return (
        <UserContext.Provider value={[userData, setUserData]} history={history}>
            {props.children}
        </UserContext.Provider>
    );
}