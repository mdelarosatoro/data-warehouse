import React, { useContext } from 'react';
import { UserContext } from '../Usuarios/UserContext';

function Home() {
    const [userData] = useContext(UserContext);

    return (
        <div>
            <h1>Welcome, {userData?.name} {userData?.lastName}</h1>
        </div>
    )
}

export default Home
