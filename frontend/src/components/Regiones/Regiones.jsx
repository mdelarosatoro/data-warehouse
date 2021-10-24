import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px 200px 20px 20px;
`;

const Button = styled.button`
    background-color: #1D72C2;
    color: white;
    padding: 4px;
    border-radius: 2px;
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover{
        color: black;
        transition: 0.3s ease all;
    }
`;

const CompleteRegionContainer = styled.div`
    margin: 20px 200px;
    border: 1px solid gray;
    padding: 20px;
`;

const RegionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
`;

const CompleteCountryContainer = styled.div`

`;

const CountryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 60px;
`;

const CountryInsideContainer = styled.div`
    display: flex;
`;

const CountryButtonContainer = styled.div`
    margin-left: 30px;
    display: flex;
`;

const CountryButton = styled(Button)`
    margin-left: 20px;
`;

const CityContainer = styled.div`
    display: flex;
    margin: 0 0 0 120px;
    margin-top: 10px;
`;

const CityButtonContainer = styled.div`
    display: flex;
    margin-left: 20px;
`;

const CityButton = styled(Button)`
    margin-left: 10px;
`;

function Regiones() {
    const [regionData, setRegionData] = useState([]);

    const fetchRegions = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }

        const response = await fetch('http://localhost:3000/regions', options);
        const result = await response.json();
        const regionData = result.map(region => (
            {
                key: region.id,
                name: region.name,
                countries: region.countries
            }
        ));
        setRegionData(regionData);
        console.log(regionData)
    }

    useEffect(() => {
        fetchRegions();
    }, [])

    const handleCreateRegion = async (e) => {
        console.log(e.target)
        const newRegionName = prompt('Indique el nombre de la región a agregar.');
        if (newRegionName) {
            const capitalizedRegion = newRegionName.charAt(0).toUpperCase() + newRegionName.slice(1);
            const payload = { name: capitalizedRegion };
    
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch('http://localhost:3000/regions', options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleCreateCountry = async (e) => {
        console.log(e.target)
        const regionId = e.target.getAttribute('id');
        console.log(regionId);
        
        const newCountryName = prompt('Indique el nombre del país a agregar.');
        if (newCountryName) {
            const capitalizedCountry = newCountryName.charAt(0).toUpperCase() + newCountryName.slice(1);
            const payload = { name: capitalizedCountry, regionId };
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch('http://localhost:3000/countries', options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleCreateCity = async (e) => {
        console.log(e.target)
        const countryId = e.target.getAttribute('id');
        console.log(countryId);
        
        const newCityName = prompt('Indique el nombre de la ciudad a agregar.');
        if (newCityName) {
            const capitalizedCity = newCityName.charAt(0).toUpperCase() + newCityName.slice(1);
            const payload = { name: capitalizedCity, countryId };
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch('http://localhost:3000/cities', options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleEditCountry = async (e) => {
        console.log(e.target)
        const countryId = e.target.getAttribute('id');
        console.log(countryId);
        
        const newCountryName = prompt('Indique el nombre del país nuevo.');
        if (newCountryName) {
            const capitalizedCountry = newCountryName.charAt(0).toUpperCase() + newCountryName.slice(1);
            const payload = { name: capitalizedCountry, countryId };
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch(`http://localhost:3000/countries/${countryId}`, options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleDeleteCountry = async (e) => {
        console.log(e.target)
        const countryId = e.target.getAttribute('id');
        console.log(countryId);
        
        const confirmation = window.confirm('¿Está seguro que desea eliminar este país?');
        if (confirmation) {
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'DELETE',
            }
    
            const response = await fetch(`http://localhost:3000/countries/${countryId}`, options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleEditCity = async (e) => {
        console.log(e.target)
        const cityId = e.target.getAttribute('id');
        console.log(cityId);
        
        const newCityName = prompt('Indique el nombre del país nuevo.');
        if (newCityName) {
            const capitalizedCity = newCityName.charAt(0).toUpperCase() + newCityName.slice(1);
            const payload = { name: capitalizedCity, cityId };
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(payload)
            }
    
            const response = await fetch(`http://localhost:3000/cities/${cityId}`, options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    const handleDeleteCity = async (e) => {
        console.log(e.target)
        const cityId = e.target.getAttribute('id');
        console.log(cityId);
        
        const confirmation = window.confirm('¿Está seguro que desea eliminar esta ciudad?');
        if (confirmation) {
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'DELETE',
            }
    
            const response = await fetch(`http://localhost:3000/cities/${cityId}`, options);
            const result = await response.json();
    
            console.log(result)
            fetchRegions();
        }
    }

    return (
        <div>
            <ButtonContainer>
                <Button onClick={handleCreateRegion}>Add Region</Button>
            </ButtonContainer>
            {regionData.map(region => (
                <CompleteRegionContainer>
                    <RegionContainer>
                        <h2 key={region.key}>{region.name}</h2>
                        <Button id={region.key} onClick={handleCreateCountry}>Add Country</Button>
                    </RegionContainer>
                    {region.countries.length > 0 && region.countries.map(country => {
                        return (
                            <CompleteCountryContainer>
                                <CountryContainer>
                                    <CountryInsideContainer>
                                        <h3>{country.name}</h3>
                                        <CountryButtonContainer>
                                            <CountryButton id={country.id} onClick={handleEditCountry}>Edit</CountryButton>
                                            <CountryButton id={country.id} onClick={handleDeleteCountry}>Delete</CountryButton>
                                        </CountryButtonContainer>
                                    </CountryInsideContainer>
                                    <Button id={country.id} onClick={handleCreateCity}>Add City</Button>
                                </CountryContainer>
                                {country.cities.length > 0 && country.cities.map(city => {
                                    return (
                                        <CityContainer>
                                            <h4>{city.name}</h4>
                                            <CityButtonContainer>
                                                <CityButton id={city.id} onClick={handleEditCity}>Edit</CityButton>
                                                <CityButton id={city.id} onClick={handleDeleteCity}>Delete</CityButton>
                                            </CityButtonContainer>
                                        </CityContainer>
                                    )
                                })}
                            </CompleteCountryContainer>
                        )
                    })}
                </CompleteRegionContainer>
            ))}
        </div>
    )
}

export default Regiones
