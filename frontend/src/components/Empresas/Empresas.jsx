import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import PrimaryButton from '../PrimaryButton';


const ButtonContainer = styled.div`
    margin: 20px auto;
    width: fit-content;
`;

const CompanyTable = styled.div`
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

const TitleCell = styled(Cell)`
    font-weight: bold;
    font-size: 20px;
`;

const NameTitleCell = styled(TitleCell)`
    width: 15%;
`;

const AddressTitleCell = styled(TitleCell)`
    width: 25%;
`;

const EmailTitleCell = styled(TitleCell)`
    width: 25%;
`;

const CityTitleCell = styled(TitleCell)`
    width: 25%;
`;

const NameCell = styled(Cell)`
    width: 15%;
`;

const AddressCell = styled(Cell)`
    width: 25%;
`;

const EmailCell = styled(Cell)`
    width: 25%;
`;

const CityCell = styled(Cell)`
    width: 25%;
`;

const EditInput = styled.input`
    margin-left: 4px;
    margin-right: 4px;
`;

const NameInput = styled(EditInput)`
width: 15%;
`;

const AddressInput = styled(EditInput)`
    width: 25%;
`;

const EmailInput = styled(EditInput)`
    width: 25%;
`;

const TableButtonCell = styled(Cell)`
    width: 5%;
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


const handleCompanyChange = (e) => {}


function Empresas() {
    const [companyData, setCompanyData] = useState([]);

    const fetchCompanies = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }
        const response = await fetch('http://localhost:3000/companies', options);
        const result = await response.json();
        const companyData = result.map((company) => (
            {
                key: company.id,
                name: company.name,
                address: company.address,
                email: company.email,
                city: company.city.name,
                isEditable: false
            }
        ));
        setCompanyData(companyData);
    }
    //load users on render
    useEffect(() => {
        fetchCompanies();
    }, [])

    const handleEditClick = (e) => {
        console.log(e.target)
        const companyDataCopy = [...companyData]
        console.log(companyDataCopy)
        console.log(e.target.getAttribute('id'))
        // const userToEdit = userDataCopy.find((user) => user.key === parseInt(e.target.getAttribute('id')));
        // console.log(userToEdit)
        // userToEdit.isEditable = !userToEdit.isEditable

        // userDataCopy[parseInt(e.target.getAttribute('id'))-1].isEditable = true;
        const companyDataCopyFinal = companyDataCopy.map((company) => {
            if (company.key === parseInt(e.target.getAttribute('id'))) {
                company.isEditable = true;
                return company
            } else {
                return company;
            }
        })

        setCompanyData(companyDataCopyFinal);
    }

    const handleSaveClick = async (e) => {
        const confirmation = window.confirm('¿Está seguro de realizar el cambio?');
        if (confirmation) {
            const companyId = parseInt(e.target.getAttribute('id'));
            console.log(companyId);
            const newCompanyInfo = {
                name: e.target.parentElement.parentElement.children[0].value,
                address: e.target.parentElement.parentElement.children[1].value,
                email: e.target.parentElement.parentElement.children[2].value,
            };
            console.log(newCompanyInfo)
            
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(newCompanyInfo)
            }
    
            const response = await fetch(`http://localhost:3000/companies/${companyId}`, options);
            const result = await response.json();
            alert(result);
            console.log(result);
    
            //change back company.isEditable to false
            const companyDataCopy = [...companyData];
    
            // companyDataCopy[companyId-1].isEditable = false;
            const companyDataCopyFinal = companyDataCopy.map((company) => {
                if (company.key === companyId) {
                    company.isEditable = false;
                }
                return company;
            })
    
            setCompanyData(companyDataCopyFinal);
            fetchCompanies();
        }
    }

    const handleDeleteClick = async (e) => {
        const confirmation = window.confirm('¿Está seguro que desea eliminar esta empresa?');
        if (confirmation) {
            const companyId = parseInt(e.target.getAttribute('id'));
            const companyDataCopy = [...companyData];
            companyDataCopy.splice(companyId-1, 1);

            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                method: 'DELETE',
            }

            const response = await fetch(`http://localhost:3000/companies/${companyId}`, options);
            const result = await response.json();
            console.log(result);
            setCompanyData(companyDataCopy);
            alert(result);
            fetchCompanies();
        }
    }

    return (
        <div>
            <ButtonContainer>
                <NavLink to='/crear-empresa'>
                    <PrimaryButton text='Crear Empresa' />
                </NavLink>
            </ ButtonContainer>

            <CompanyTable>
                <Row>
                    <NameTitleCell>Nombre</NameTitleCell>
                    <AddressTitleCell>Dirección</AddressTitleCell>
                    <EmailTitleCell>Email</EmailTitleCell>
                    <CityTitleCell>Ciudad</CityTitleCell>
                </Row>
                {companyData && companyData.map((company) => {
                    return (
                    <Row key={company.key} >
                        {!company.isEditable ? <NameCell>{company.name}</NameCell> : <NameInput defaultValue={company.name} onChange={handleCompanyChange} />}
                        {!company.isEditable ? <AddressCell>{company.address}</AddressCell> : <AddressInput defaultValue={company.address} />}
                        {!company.isEditable ? <EmailCell>{company.email}</EmailCell> : <EmailInput defaultValue={company.email} />}
                        {<CityCell>{company.city}</CityCell>}
                        <TableButtonCell>
                            {!company.isEditable ?
                            <TableButton key={company.key} id={company.key} onClick={handleEditClick} >Edit</TableButton> :
                            <TableButton key={company.key} id={company.key} onClick={handleSaveClick} >Save</TableButton>
                            }
                        </TableButtonCell>
                        <TableButtonCell>
                            <TableButton id={company.key} onClick={handleDeleteClick} >Delete</TableButton>
                        </TableButtonCell>
                    </Row>
                    )
                })}
            </CompanyTable>
        </div>
    )
}

export default Empresas
