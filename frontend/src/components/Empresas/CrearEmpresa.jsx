import React, { useEffect, useState } from 'react'
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

function CrearEmpresa() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [regionList, setRegionList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const fetchRegionList = async () => {
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
        console.log(regionData)
        setRegionList(regionData);
    }

    useEffect(() => {
        fetchRegionList();
    },[])

    const fetchCountryList = async () => {
        const regionId = region;

        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }

        const response = await fetch(`http://localhost:3000/countries/${regionId}`, options);
        const result = await response.json();
        const countryData = result.map(country => (
            {
                key: country.id,
                name: country.name,
                cities: country.cities
            }
        ))

        setCountryList(countryData);
        setCityList([])
    }

    useEffect(() => {
        fetchCountryList();
    }, [region])

    const fetchCityList = async () => {
        const countryId = country;
        console.log(countryId)
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }

        const response = await fetch(`http://localhost:3000/cities/${countryId}`, options);
        const result = await response.json();
        const cityData = result.map(city => (
            {
                key: city.id,
                name: city.name,
            }
        ))
        console.log(cityData)
        setCityList(cityData);
    }

    useEffect(() => {
        fetchCityList();
    }, [country])

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleTelephone = (e) => {
        setTelephone(e.target.value);
    }
    const handleRegion = (e) => {
        setRegion(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            address,
            email,
            telephone,
            cityId: city,
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

        const response = await fetch('http://localhost:3000/companies', options);
        if (response.status === 201) {
            const result = await response.json();
            console.log(result)
            alert(`Empresa ${name} creada correctamente`);
            setName('');
            setAddress('');
            setEmail('');
            setTelephone('');
            setRegion('');
            setCountry('');
            setCity('');
        } else {
            alert('No tiene permiso para realizar esta operación.')
        }
    };

    return (
        <Container>
            <Form>
                <Title>Crear Nueva Empresa</Title>
                
                <Label htmlFor="name">Nombre<Span>*</Span></Label>
                <RequiredInput name="name" value={name} onChange={handleName} required></RequiredInput>
                <ValidationText>{!name && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="address">Dirección<Span>*</Span></Label>
                <RequiredInput name="address" value={address} onChange={handleAddress} required></RequiredInput>
                <ValidationText>{!address && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="email">Email<Span>*</Span></Label>
                <RequiredInput name="email" value={email} onChange={handleEmail} required></RequiredInput>
                <ValidationText>{!email && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="telephone">Teléfono<Span>*</Span></Label>
                <RequiredInput name="telephone" value={telephone} onChange={handleTelephone} required></RequiredInput>
                <ValidationText>{!telephone && 'Este campo es obligatorio'}</ValidationText>

                <Label htmlFor="region">Región</Label>
                <Select value={region} onChange={handleRegion} name="region" id="region">
                    <option></option>
                    {regionList.map((region) => {
                        return (
                            <option value={region.key}>{region.name}</option>
                        )
                    })}
                </Select>

                <Label htmlFor="country">País</Label>
                <Select value={country} onChange={handleCountry} name="country" id="country">
                    <option></option>
                    {countryList && countryList.map((country) => {
                        return (
                            <option value={country.key}>{country.name}</option>
                        );
                    })}
                </Select>

                <Label htmlFor="city">Ciudad</Label>
                <Select value={city} onChange={handleCity} name="city" id="city">
                    <option></option>
                    {cityList && cityList.map((city) => {
                        return (
                            <option value={city.key}>{city.name}</option>
                        );
                    })}
                </Select>

                <PrimaryButton onClick={handleClick}>Crear Empresa</PrimaryButton>
            </Form>
        </Container>
    )
}

export default CrearEmpresa
