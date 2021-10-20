import React, { useState } from 'react'
import styled from 'styled-components';
// import Input from '../Input';


const Container = styled.div`
    background-color: white;
    min-height: 90vh;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10vh;
    padding-bottom: 10vh;
`;

const Form = styled.form`
    margin-top: -40px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    border: 3px solid #1D72C2;
    border-radius: 10px;
    padding: 60px 40px 50px 40px;
    box-shadow: 7px 7px 3px rgba(0,0,0,0.6);
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: #1D72C2;
`;

const Label = styled.label`
    margin-bottom: 6px;
    margin-top: 4px;
`;

const Input = styled.input`
    border: 1px solid #CCCCCC;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    outline: none;
`;

const RequiredInput = styled(Input)`
    ${props => props.value === '' && 'border: 1px solid red;'}
`;

const Select = styled.select`
    border: 1px solid #CCCCCC;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
`;

const PrimaryButton = styled.button`
    padding: 3px;
    background-color: #1D72C2;
    color: white;
    width: 173px;
    height: 42px;
    border-radius: 2px;
    margin-top: 10px;
`;

const ValidationText = styled.span`
    color: red;
    font-size: 10px;
    margin-top: -10px;
`;

const Span = styled.span`
    color: red;
    font-size: 12px;
`;

function CrearUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleNombre = (e) => {
        setNombre(e.target.value);
    }
    const handleApellido = (e) => {
        setApellido(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleProfilePicUrl = (e) => {
        setProfilePicUrl(e.target.value);
    }
    const handleIsAdmin = (e) => {
        setIsAdmin(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    }
    const handleClick = async (e) => {
        e.preventDefault();

        if (password != passwordConfirm) {
            alert('Passwords do not match.')
        } else {
            const payload = {
                name: nombre,
                lastName: apellido,
                email,
                profilePicUrl,
                isAdmin,
                password
            }
            console.log(payload)
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                method: 'POST',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch('http://localhost:3000/register', options);
            if (response.status === 201) {
                const result = await response.json();
                console.log(result)
                alert(`Usuario ${email} creado correctamente`);
                setNombre('');
                setApellido('');
                setEmail('');
                setProfilePicUrl('');
                setIsAdmin('');
                setPassword('');
                setPasswordConfirm('');
            } else {
                alert('No tiene permiso para realizar esta operación.')
            }
        }
    };

    return (
        <Container>
            <Form>
                <Title>Crear Nuevo Usuario</Title>
                
                <Label htmlFor="nombre">Nombre<Span>*</Span></Label>
                <RequiredInput name="nombre" value={nombre} onChange={handleNombre} required></RequiredInput>
                <ValidationText>{!nombre && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="apellido">Apellido<Span>*</Span></Label>
                <RequiredInput name="apellido" value={apellido} onChange={handleApellido} required></RequiredInput>
                <ValidationText>{!apellido && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="email">Email<Span>*</Span></Label>
                <RequiredInput name="email" value={email} onChange={handleEmail} required></RequiredInput>
                <ValidationText>{!email && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="profilePicUrl">Perfil</Label>
                <Input name="profilePicUrl" value={profilePicUrl} onChange={handleProfilePicUrl}></Input>

                <Label htmlFor="rol">Rol</Label>
                <Select value={isAdmin} onChange={handleIsAdmin} name="rol" id="rol">
                    <option></option>
                    <option value={0}>Básico</option>
                    <option value={1}>Admin</option>
                </Select>

                <Label htmlFor="password">Contraseña<Span>*</Span></Label>
                <RequiredInput type="password" name="password" value={password} onChange={handlePassword} required></RequiredInput>
                <ValidationText>{!password ? 'Este campo es obligatorio' : password.length < 6 && 'La contraseña debe tener mínimo 6 caracteres'}</ValidationText>

                <Label htmlFor="password-confirm">Confirmar contraseña<Span>*</Span></Label>
                <RequiredInput type="password" name="password-confirm" value={passwordConfirm} onChange={handlePasswordConfirm} required></RequiredInput>
                <ValidationText>{!passwordConfirm ? 'Este campo es obligatorio' : passwordConfirm !== password && 'Las contraseñas no coinciden'}</ValidationText>

                <PrimaryButton onClick={handleClick}>Crear Usuario</PrimaryButton>
            </Form>
        </Container>
    )
}

export default CrearUsuario
