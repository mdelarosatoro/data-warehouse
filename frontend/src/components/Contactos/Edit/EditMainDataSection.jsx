import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 80vw;
    height: 130px;
    position: absolute;
    background-color: white;
    border: 3px solid #0683F9;
    border-radius: 6.5px;
    top: 77px;
    left: 44px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FieldName = styled.span`
    margin-bottom: 10px;
`;

const InputField = styled.input`
    width: 190px;
    padding: 8px;
    border: 1px solid rgba(0,0,0,0.25)
`;

const NameInput = styled(InputField)`

`

const LastNameInput = styled(InputField)`

`

const PositionInput = styled(InputField)`

`

const EmailInput = styled(InputField)`

`

const CompanyInput = styled.select`
    width: 190px;
    padding: 8px;
`

function EditMainDataSection({
    name,
    setName,
    lastName,
    setLastName,
    position,
    setPosition,
    email,
    setEmail,
    company,
    setCompany,
    companyArray,
}) {

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    }

    return (
        <Container>
            <FieldContainer>
                <FieldName>Nombre</FieldName>
                <NameInput value={name} onChange={handleNameChange} ></NameInput>
            </FieldContainer>
            <FieldContainer>
                <FieldName>Apellido</FieldName>
                <LastNameInput value={lastName} onChange={handleLastNameChange}></LastNameInput>
            </FieldContainer>
            <FieldContainer>
                <FieldName>Cargo</FieldName>
                <PositionInput value={position} onChange={handlePositionChange}></PositionInput>
            </FieldContainer>
            <FieldContainer>
                <FieldName>Email</FieldName>
                <EmailInput value={email} onChange={handleEmailChange}></EmailInput>
            </FieldContainer>
            <FieldContainer>
                <FieldName>Compañía</FieldName>
                <CompanyInput value={company} onChange={handleCompanyChange}>
                    <option></option>
                    {companyArray.map(company => (
                        <option key={company.key} value={company.key} >{company.name}</option>
                    ))}
                </CompanyInput>
            </FieldContainer>
        </Container>
    )
}

export default EditMainDataSection
