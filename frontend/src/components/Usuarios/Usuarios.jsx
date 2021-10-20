import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../PrimaryButton';

const ButtonContainer = styled.div`
    margin: 20px auto;
    width: fit-content;
`;

const UserTable = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    box-shadow: 2px 2px 6px black;
    margin: 40px auto;
`;

const Row = styled.div`
    display: flex;
    border: 1px solid black;
    border-top: none;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;

const Cell = styled.p`
    display: block;
    padding: 8px;
`;

const NameCell = styled(Cell)`
    width: 15%;
`;

const LastNameCell = styled(Cell)`
    width: 25%;
`;

const EmailCell = styled(Cell)`
    width: 35%;
`;

const AdminCell = styled(Cell)`
    width: 15%;
`;

const EditInput = styled.input`
    margin-left: 4px;
    margin-right: 4px;
`;

const NameInput = styled(EditInput)`
    width: 15%;
`;

const LastNameInput = styled(EditInput)`
    width: 25%;
`;

const AdminInput = styled.select`
    width: 15%;
`

const TableButtonCell = styled(Cell)`
    width: 5%;
`;

const TitleCell = styled(Cell)`
    font-weight: bold;
    font-size: 20px;
`;

const NameTitleCell = styled(TitleCell)`
    width: 15%;
`;

const LastNameTitleCell = styled(TitleCell)`
    width: 25%;
`;

const EmailTitleCell = styled(TitleCell)`
    width: 35%;
`;

const AdminTitleCell = styled(TitleCell)`
    width: 15%;
`;

const TableButton = styled.button`
    background-color: #1D72C2;
    color: white;
    padding: 2px;
    border-radius: 2px;
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover{
        color: black;
        transition: 0.3s ease all;
    }
`;

function Usuarios() {
    const [userData, setUserData] = useState([]);
    
    const fetchUsers = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }
        const response = await fetch('http://localhost:3000/all-users', options);
        const result = await response.json();
        const userData = result.map((user) => (
            {
                key: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                isEditable: false
            }
        ));
        setUserData(userData);
    }
    //load users on render
    useEffect(() => {
        fetchUsers();
    }, [])

    const handleEditClick = (e) => {
        console.log(e.target)
        const userDataCopy = [...userData]
        console.log(userDataCopy)
        console.log(e.target.getAttribute('id'))
        // const userToEdit = userDataCopy.find((user) => user.key === parseInt(e.target.getAttribute('id')));
        // console.log(userToEdit)
        // userToEdit.isEditable = !userToEdit.isEditable

        // userDataCopy[parseInt(e.target.getAttribute('id'))-1].isEditable = true;
        const userDataCopyFinal = userDataCopy.map((user) => {
            if (user.key === parseInt(e.target.getAttribute('id'))) {
                user.isEditable = true;
                return user
            } else {
                return user;
            }
        })

        setUserData(userDataCopyFinal);
    }

    const handleUserChange = (e) => {

    }

    const handleSaveClick = async (e) => {
        const confirmation = window.confirm('¿Está seguro de realizar el cambio?');
        if (confirmation) {
            const userId = parseInt(e.target.getAttribute('id'));
            console.log(userId);
            const newUserInfo = {
                name: e.target.parentElement.parentElement.children[0].value,
                lastName: e.target.parentElement.parentElement.children[1].value,
                isAdmin: e.target.parentElement.parentElement.children[3].value === '1' ? true : false,
            };
            console.log(newUserInfo)
            
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(newUserInfo)
            }
    
            const response = await fetch(`http://localhost:3000/users/${userId}`, options);
            const result = await response.json();
            alert(result);
            console.log(result);
    
            //change back user.isEditable to false
            const userDataCopy = [...userData];
    
            // userDataCopy[userId-1].isEditable = false;
            const userDataCopyFinal = userDataCopy.map((user) => {
                if (user.key === userId) {
                    user.isEditable = false;
                }
                return user;
            })
    
            setUserData(userDataCopyFinal);
            fetchUsers();
        }
    }

    const handleDeleteClick = async (e) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar este usuario?');
        if (confirmation) {
            const userId = parseInt(e.target.getAttribute('id'));
            const userDataCopy = [...userData];
            userDataCopy.splice(userId-1, 1);

            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                method: 'DELETE',
            }

            const response = await fetch(`http://localhost:3000/users/${userId}`, options);
            const result = await response.json();
            console.log(result);
            setUserData(userDataCopy);
            alert(result);
            fetchUsers();
        }

        
    }

    return (
        <div>
            <ButtonContainer>
                <NavLink to='/crear-usuario'>
                    <PrimaryButton text='Crear Usuario' />
                </NavLink>
            </ ButtonContainer>
            <UserTable>
                <Row>
                    <NameTitleCell>Nombre</NameTitleCell>
                    <LastNameTitleCell>Apellido</LastNameTitleCell>
                    <EmailTitleCell>Email</EmailTitleCell>
                    <AdminTitleCell>Administrador</AdminTitleCell>
                </Row>
                {userData && userData.map((user) => {
                    return (
                    <Row key={user.key} >
                        {!user.isEditable ? <NameCell>{user.name}</NameCell> : <NameInput defaultValue={user.name} onChange={handleUserChange} />}
                        {!user.isEditable ? <LastNameCell>{user.lastName}</LastNameCell> : <LastNameInput defaultValue={user.lastName} />}
                        <EmailCell>{user.email}</EmailCell>
                        {!user.isEditable ? <AdminCell>{user.isAdmin ? 'Administrador' : 'Básico'}</AdminCell> : (
                            <AdminInput defaultValue={user.isAdmin === true ? '1' : '0'}>
                                <option value='1' >Administrador</option>
                                <option value='0' >Básico</option>
                            </AdminInput>
                        )}
                        <TableButtonCell>
                            {!user.isEditable ?
                            <TableButton key={user.key} id={user.key} onClick={handleEditClick} >Edit</TableButton> :
                            <TableButton key={user.key} id={user.key} onClick={handleSaveClick} >Save</TableButton>
                            }
                        </TableButtonCell>
                        <TableButtonCell>
                            <TableButton id={user.key} onClick={handleDeleteClick} >Delete</TableButton>
                        </TableButtonCell>
                    </Row>
                    )
                })}
            </UserTable>
        </div>
    )
}

export default Usuarios
