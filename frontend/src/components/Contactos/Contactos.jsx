import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomTable from './CustomTable'
import MainDataSection from './MainDataSection';
import OtherInfoSection from './OtherInfoSection';
import EditMainDataSection from './Edit/EditMainDataSection';
import EditOtherInfoSection from './Edit/EditOtherInfoSection';

const PageContainer = styled.div`
    padding: 20px;
    position: relative;
`;

const TopContainer = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: fit-content;
`;

const SearchBox = styled.input`
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 8px;
    width: 35vw;
    margin-right: 10px;
    transition: 0.4s ease all;
    &:hover{
        border: 1px solid black;
        transition: 0.4s ease all;
    }
`;

// const SearchBoxArrow = styled(ArrowDropDownIcon)`
//     position: absolute;
//     right: 40px;
//     cursor: pointer;
//     transition: 0.3s ease all;
//     &:hover{
//         color: #1D72C2;
//         transition: 0.3s ease all;
//     }
// `;

const MaginfyingGlass = styled(SearchIcon)`
    color: #1D72C2;
    border: 1px solid lightgray;
    border-radius: 3px;
    transform: scale(1.5);
    padding: 4px;
    cursor: pointer;
    transition: 0.3s ease all;
    &:hover{
        color: white;
        background-color: #1D72C2;
        transition: 0.3s ease all;
    }
`;

const SideButtonsContainer = styled.div`
    display: flex;
`;

const UploadButton = styled(FileUploadIcon)`
    color: #1D72C2;
    border: 1px solid #1D72C2;
    padding: 6px;
    margin-right: 10px;
    cursor: pointer;
    &:hover{
        color: white;
        background-color: #1D72C2;
        transition: 0.3s ease all;
    }
`;

const ButtonTwo = styled.button`
    background-color: #1D72C2;
    color: white;
    padding: 4px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 2px;
    cursor: pointer;
    transition: 0.3s ease all;
    border: 1px solid #1D72C2;
    &:hover{
        color: #1D72C2;
        background-color: white;
        transition: 0.3s ease all;
    }
`;

const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SelectedCount = styled.span`
    color: #0683F9;
    background-color: #E6F2FE;
    padding: 6px;
    border-radius: 4px;
    margin-right: 8px;
    width: fit-content;
    font-size: 12px;
    margin-bottom: 5px;
    align-self: flex-start;
    margin-left: 124px;
`;

const CreateContactOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TopCreateContactBlock = styled.div`
    width: 90vw;
    height: 140px;
    background-color: #1D72C2;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const CreateContactTitle = styled.h2`
    color: white;
    margin-left: 30px;
    margin-top: 26px;
`;

const CreateContactExitButton = styled.h2`
    color: white;
    margin-right: 30px;
    margin-top: 26px;
    cursor: pointer;
`;

const BottomCreateContactBlock = styled.div`
    width: 90vw;
    height: 577px;
    background-color: white;
`;


function Contactos() {
    const [contactData, setContactData] = useState([]);
    const [contactTableData, setContactTableData] = useState([]);
    const [sortedContactTableData, setSortedContactTableData] = useState([]);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openCreateOverlay, setOpenCreateOverlay] = useState(false);
    const [openEditOverlay, setOpenEditOverlay] = useState(false);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');

    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    
    const [sliderValue, setSliderValue] = useState(0);
    
    const [contactChannel1, setContactChannel1] = useState('');
    const [contactChannel2, setContactChannel2] = useState('');
    const [contactChannel3, setContactChannel3] = useState('');
    const [userAccount1, setUserAccount1] = useState('');
    const [userAccount2, setUserAccount2] = useState('');
    const [userAccount3, setUserAccount3] = useState('');
    const [preferred1, setPreferred1] = useState('');
    const [preferred2, setPreferred2] = useState('');
    const [preferred3, setPreferred3] = useState('');
    
    const [contactChannelsList, setContactChannelsList] = useState([]);
    const [companyArray, setCompanyArray] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const [currentContactEditId, setCurrentContactEditId] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [lastNameEdit, setLastNameEdit] = useState('');
    const [positionEdit, setPositionEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [companyEdit, setCompanyEdit] = useState('');

    const [cityEdit, setCityEdit] = useState('');
    const [regionEdit, setRegionEdit] = useState('');
    const [countryEdit, setCountryEdit] = useState('');
    const [addressEdit, setAddressEdit] = useState('');
    
    const [sliderValueEdit, setSliderValueEdit] = useState(0);
    
    const [contactChannelsToEdit, setContactChannelsToEdit] = useState([]);
    const [contactChannelsToEdit1, setContactChannelsToEdit1] = useState('');
    const [contactChannelsToEdit2, setContactChannelsToEdit2] = useState('');
    const [contactChannelsToEdit3, setContactChannelsToEdit3] = useState('');

    const [contactChannel1Edit, setContactChannel1Edit] = useState('');
    const [contactChannel2Edit, setContactChannel2Edit] = useState('');
    const [contactChannel3Edit, setContactChannel3Edit] = useState('');
    const [userAccount1Edit, setUserAccount1Edit] = useState('');
    const [userAccount2Edit, setUserAccount2Edit] = useState('');
    const [userAccount3Edit, setUserAccount3Edit] = useState('');
    const [preferred1Edit, setPreferred1Edit] = useState('');
    const [preferred2Edit, setPreferred2Edit] = useState('');
    const [preferred3Edit, setPreferred3Edit] = useState('');

    const [editedContact, setEditedContact] = useState('');
    
    const fetchContacts = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'GET'
        }
        const response = await fetch('http://localhost:3000/contacts', options);
        const result = await response.json();
        const companyData = result.map((contact) => (
            {
                key: contact.id,
                name: contact.name,
                lastName: contact.lastName,
                position: contact.position,
                email: contact.email,
                address: contact.address,
                interest: contact.interest,
                company: contact.company,
                city: contact.city,
                contactChannels: contact.contactChannels,
                profilePic: contact.profile_pic,
                isEditable: false,
                isHovered: false
            }
        ));

        const tableData = companyData.map((contact) => (
            {
                key: contact.key,
                contact: `${contact.name} ${contact.lastName}`,
                profilePic: contact.profilePic,
                email: contact.email,
                region: contact.city.name,
                company: contact.company.name,
                position: contact.position,
                preferredChannels: contact.contactChannels.filter(channel => channel.contactHasChannels.preferred === true).map(channel => channel.name),
                interest: contact.interest,
                isHovered: false
            }
        ))
        setContactTableData(tableData)
        console.log(companyData);
        setContactData(companyData);
        setSortedContactTableData(tableData)
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    const handleSort = (id, sortType) => {
        console.log(id);
        console.log(sortType);
        let sortedDataSet;
        let dataSetCopy = [...contactTableData];

        switch (id) {
            case 'contact':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData)
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.contact.localeCompare(b.contact))
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.contact.localeCompare(b.contact)).reverse()
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            case 'region':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData);
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.region.localeCompare(b.region))
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.region.localeCompare(b.region)).reverse();
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            case 'company':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData);
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.company.localeCompare(b.company))
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.company.localeCompare(b.company)).reverse()
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            case 'position':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData);
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.position.localeCompare(b.position))
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.position.localeCompare(b.position)).reverse()
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            case 'preferredChannels':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData);
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.preferredChannels.localeCompare(b.preferredChannels))
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.preferredChannels.localeCompare(b.preferredChannels)).reverse()
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            case 'interest':
                switch (sortType) {
                    case 0:
                        setSortedContactTableData(contactTableData);
                        break;
                    case 1:
                        sortedDataSet = dataSetCopy.sort((a, b) => a.interest - b.interest)
                        setSortedContactTableData(sortedDataSet);
                        break;
                    case 2:
                        sortedDataSet = dataSetCopy.sort((a, b) => b.interest - a.interest)
                        setSortedContactTableData(sortedDataSet);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSearch = async (e) => {
        if (query.length > 0) {
            e.preventDefault();
    
            const payload = { query: query }
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
            }
            console.log(options)
    
            const response = await fetch('http://localhost:3000/contact-search', options);
            const result = await response.json();
    
            if (result.length > 0) {
                const companyData = result.map((contact) => (
                    {
                        key: contact.id,
                        name: contact.name,
                        lastName: contact.lastName,
                        position: contact.position,
                        email: contact.email,
                        address: contact.address,
                        interest: contact.interest,
                        company: contact.company,
                        city: contact.city,
                        contactChannels: contact.contactChannels,
                        profilePic: contact.profile_pic,
                        isEditable: false,
                        isHovered: false
                    }
                ));
        
                const tableData = companyData.map((contact) => (
                    {
                        key: contact.key,
                        contact: `${contact.name} ${contact.lastName}`,
                        profilePic: contact.profilePic,
                        email: contact.email,
                        region: contact.city.name,
                        company: contact.company.name,
                        position: contact.position,
                        preferredChannels: contact.contactChannels.filter(channel => channel.contactHasChannels.preferred === true).map(channel => channel.name),
                        interest: contact.interest,
                        isHovered: false
                    }
                ))
                setContactTableData(tableData)
                setSortedContactTableData(tableData)
            }
            console.log(result)
        } else {
            fetchContacts();
        }
    }

    const handleMouseEnter = (e) => {
        let target;
        if (e.target.tagName === 'TD') {
            target = e.target.parentElement;
            const id = target.getAttribute('id');
            const mappedData = sortedContactTableData.map((contact) => {
            if (contact.key === parseInt(id)) {
                contact.isHovered = true;
                return contact;
            } else {
                return contact;
            }
        });
        setSortedContactTableData(mappedData)
        } else if (e.target.tagName === 'TR') {
            target = e.target;
            const id = target.getAttribute('id');
            const mappedData = sortedContactTableData.map((contact) => {
            if (contact.key === parseInt(id)) {
                contact.isHovered = true;
                return contact;
            } else {
                return contact;
            }
        });
        setSortedContactTableData(mappedData)
        }

        

    }

    const handleMouseLeave = (e) => {
        let target;
        if (e.target.tagName === 'TD') {
            target = e.target.parentElement;
            const mappedData = sortedContactTableData.map((contact) => {
                if (contact.key === parseInt(target.getAttribute('id'))) {
                    contact.isHovered = false;
                    return contact;
                } else {
                    return contact;
                }
            });
            setSortedContactTableData(mappedData)
        } else if (e.target.tagName === 'TR') {
            target = e.target;
            const mappedData = sortedContactTableData.map((contact) => {
                if (contact.key === parseInt(target.getAttribute('id'))) {
                    contact.isHovered = false;
                    return contact;
                } else {
                    return contact;
                }
            });
            setSortedContactTableData(mappedData)
        }
    }

    const handleCheckboxChange = (e) => {
        const checkboxId = e.target.getAttribute('id')
        let selectedCopy = [...selected];
        console.log(e.target.checked)
        if (e.target.checked === true) {
            console.log('A')
            selectedCopy.push(checkboxId)
        } else if (e.target.checked === false) {
            console.log('B')
            selectedCopy = selectedCopy.filter(id => id !== checkboxId)
        }
        selectedCopy = selectedCopy.sort((a,b) => a-b)
        setSelected(selectedCopy)
        console.log(selectedCopy);
    }

    const handleSelectAll = (e) => {
        setSelectAll(!selectAll);
        let selectedArr = []
        if (selectAll === false) {
            contactTableData.forEach((contact) => {
                selectedArr.push(contact.key);
            });
        }
        setSelected(selectedArr);
    }

    const handleCreateContact = (e) => {
        setOpenCreateOverlay(true);
    }

    const closeCreateContact = () => {
        setOpenCreateOverlay(false);
    }

    const fetchCompanies = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET',
        }

        const response = await fetch('http://localhost:3000/companies', options);
        const result = await response.json();
        console.log(result);

        const companyData = result.map(company => (
            {
                key: company.id,
                name: company.name
            }
        ))

        console.log(companyData)
        setCompanyArray(companyData);
    }

    useEffect(() => {
        fetchCompanies();
    },[])

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

    const fetchContactChannels = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }

        const response = await fetch(`http://localhost:3000/contact-channels`, options);
        const result = await response.json();
        const mappedArray = result.map(channel => ({
            key: channel.id,
            name: channel.name
        }))
        console.log(result)
        setContactChannelsList(mappedArray);
    }

    useEffect(() => {
        fetchContactChannels();
    }, [])

    const handleSaveNewContact = async (e) => {
        e.preventDefault();

        const contactChannelPayload = []
        let auxObj;
        if (contactChannel1 !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel1),
                contactInfo: userAccount1,
                preferred: preferred1 ? true : false
            }
            contactChannelPayload.push(auxObj);
        }
        if (contactChannel2 !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel2),
                contactInfo: userAccount2,
                preferred: preferred2 ? true : false
            }
            contactChannelPayload.push(auxObj);
        }
        if (contactChannel3 !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel3),
                contactInfo: userAccount3,
                preferred: preferred3 ? true : false
            }
            contactChannelPayload.push(auxObj);
        }

        console.log(contactChannelPayload)

        const payload = {
            name: name,
            lastName: lastName,
            position: position,
            email: email,
            companyId: parseInt(company),
            locationInfo: {
                cityId: parseInt(city),
                address: address,
            },
            interest: sliderValue/100,
            contactChannels: contactChannelPayload
        }

        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }

        console.log(payload)

        const response = await fetch('http://localhost:3000/contacts', options);
        const result = await response.json();

        alert(result);
        fetchContacts();
    }

    const handleContactEdit = async (e) => {
        console.log(e.currentTarget)
        const contactId = parseInt(e.currentTarget.getAttribute('id'))

        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            method: 'GET'
        }

        //fetch contact information by id
        const response = await fetch(`http://localhost:3000/contacts/${contactId}`, options);
        const result = await response.json();
        const contactToEdit = result[0];
        console.log(result)
        setEditedContact(contactToEdit);

        setNameEdit(contactToEdit.name);
        setLastNameEdit(contactToEdit.lastName);
        setPositionEdit(contactToEdit.position);
        setEmailEdit(contactToEdit.email);
        setCompanyEdit(contactToEdit.company.id);
        
        //fetch region and country by the city id
        //first we fetch the country id with the city id
        const cityDBresponse = await fetch(`http://localhost:3000/cities/${contactToEdit.city.id}`, options);
        const cityDB = await cityDBresponse.json();
        console.log(contactToEdit.city.id)
        console.log(cityDB)
        const countryId = cityDB[0].country_id;

        //now we fetch the region id with the country id
        const countryDBresponse = await fetch(`http://localhost:3000/countries/${countryId}`, options);
        const countryDB = await countryDBresponse.json();
        const regionId = countryDB[0].region_id;

        setRegionEdit(regionId);
        setCountryEdit(countryId);
        setCityEdit(contactToEdit.city.id);
        setAddressEdit(contactToEdit.address);
        setSliderValueEdit(contactToEdit.interest*100)
        
        const contactChannelsFromDB = contactToEdit.contactChannels;
        setContactChannelsToEdit(contactChannelsFromDB);
        if (contactChannelsFromDB.length === 1) {
            setContactChannel1Edit(contactChannelsFromDB[0].id)
            setUserAccount1Edit(contactChannelsFromDB[0].contactHasChannels.contactInfo)
            setPreferred1Edit(contactChannelsFromDB[0].contactHasChannels.preferred)
        }
        if (contactChannelsFromDB.length === 2) {
            setContactChannel1Edit(contactChannelsFromDB[0].id)
            setUserAccount1Edit(contactChannelsFromDB[0].contactHasChannels.contactInfo)
            setPreferred1Edit(contactChannelsFromDB[0].contactHasChannels.preferred)
            setContactChannel2Edit(contactChannelsFromDB[1].id)
            setUserAccount2Edit(contactChannelsFromDB[1].contactHasChannels.contactInfo)
            setPreferred2Edit(contactChannelsFromDB[1].contactHasChannels.preferred)
        }
        if (contactChannelsFromDB.length === 3) {
            setContactChannel1Edit(contactChannelsFromDB[0].id)
            setUserAccount1Edit(contactChannelsFromDB[0].contactHasChannels.contactInfo)
            setPreferred1Edit(contactChannelsFromDB[0].contactHasChannels.preferred)
            setContactChannel2Edit(contactChannelsFromDB[1].id)
            setUserAccount2Edit(contactChannelsFromDB[1].contactHasChannels.contactInfo)
            setPreferred2Edit(contactChannelsFromDB[1].contactHasChannels.preferred)
            setContactChannel3Edit(contactChannelsFromDB[2].id)
            setUserAccount3Edit(contactChannelsFromDB[2].contactHasChannels.contactInfo)
            setPreferred3Edit(contactChannelsFromDB[2].contactHasChannels.preferred)
        }

        setCurrentContactEditId(parseInt(e.target.getAttribute('id')));

        setOpenEditOverlay(true);
    }

    useEffect(() => {

        
    },[editedContact])

    const closeEditContact = () => {
        setOpenEditOverlay(false);
    }

    const fetchCountryListEdit = async () => {
        const regionId = regionEdit;

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
        fetchCountryListEdit();
    }, [regionEdit])

    const fetchCityListEdit = async () => {
        const countryId = countryEdit;
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
        setCityList(cityData);
    }

    useEffect(() => {
        fetchCityListEdit();
    }, [countryEdit])

    const handleSaveEditContact = async (e) => {

        const contactChannelPayload = []
        let auxObj;
        if (contactChannel1Edit !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel1Edit),
                contactInfo: userAccount1Edit,
                preferred: preferred1Edit ? true : false
            }
            contactChannelPayload.push(auxObj);
        }
        if (contactChannel2Edit !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel2Edit),
                contactInfo: userAccount2Edit,
                preferred: preferred2Edit ? true : false
            }
            contactChannelPayload.push(auxObj);
        }
        if (contactChannel3Edit !== '') {
            auxObj = {
                contactChannelId: parseInt(contactChannel3Edit),
                contactInfo: userAccount3Edit,
                preferred: preferred3Edit ? true : false
            }
            contactChannelPayload.push(auxObj);
        }

        const payload = {
            name: nameEdit,
            lastName: lastNameEdit,
            position: positionEdit,
            email: emailEdit,
            companyId: parseInt(companyEdit),
            locationInfo: {
                cityId: parseInt(cityEdit),
                address: addressEdit,
            },
            interest: sliderValueEdit/100,
            contactChannels: contactChannelPayload
        }

        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(payload)
        }

        console.log(payload)

        const response = await fetch(`http://localhost:3000/contacts/${currentContactEditId}`, options);
        const result = await response.json();

        alert(result);

        fetchContacts();
    }

    const handleContactDelete = async (e) => {
        console.log(e.currentTarget)
        const contactId = parseInt(e.currentTarget.getAttribute('id'))
        console.log(contactId)

        const confirmDelete = window.confirm('¿Esta seguro que desea borrar este contacto?');
        if (confirmDelete === true) {
            const options = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                method: 'DELETE'
            }

            const response = await fetch(`http://localhost:3000/contacts/${contactId}`, options);
            const result = await response.json();
            alert(result);
            fetchContacts();
        }
    }

    return (
        <PageContainer>
            {openCreateOverlay &&
            (<CreateContactOverlay>
                <TopCreateContactBlock>
                    <CreateContactTitle>Nuevo Contacto</CreateContactTitle>
                    <CreateContactExitButton onClick={closeCreateContact}>X</CreateContactExitButton>
                    <MainDataSection
                        name={name}
                        setName={setName}
                        lastName={lastName}
                        setLastName={setLastName}
                        position={position}
                        setPosition={setPosition}
                        email={email}
                        setEmail={setEmail}
                        fetchCompanies={fetchCompanies}
                        company={company}
                        setCompany={setCompany}
                        companyArray={companyArray}/>
                </TopCreateContactBlock>
                <BottomCreateContactBlock>
                    <OtherInfoSection
                        closeCreateContact={closeCreateContact}
                        handleSaveNewContact={handleSaveNewContact}
                        regionList={regionList}
                        countryList={countryList}
                        cityList={cityList}
                        region={region}
                        setRegion={setRegion}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        address={address}
                        setAddress={setAddress}
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                        contactChannelsList={contactChannelsList}
                        contactChannel1={contactChannel1}
                        setContactChannel1={setContactChannel1}
                        contactChannel2={contactChannel2}
                        setContactChannel2={setContactChannel2}
                        contactChannel3={contactChannel3}
                        setContactChannel3={setContactChannel3}
                        userAccount1={userAccount1}
                        userAccount2={userAccount2}
                        userAccount3={userAccount3}
                        setUserAccount1={setUserAccount1}
                        setUserAccount2={setUserAccount2}
                        setUserAccount3={setUserAccount3}
                        preferred1={preferred1}
                        preferred2={preferred2}
                        preferred3={preferred3}
                        setPreferred1={setPreferred1}
                        setPreferred2={setPreferred2}
                        setPreferred3={setPreferred3}
                    />
                
            
                </BottomCreateContactBlock>
            </CreateContactOverlay>)}
            {openEditOverlay &&
            (<CreateContactOverlay>
                <TopCreateContactBlock>
                    <CreateContactTitle>Editar Contacto</CreateContactTitle>
                    <CreateContactExitButton onClick={closeEditContact}>X</CreateContactExitButton>
                    <EditMainDataSection
                        name={nameEdit}
                        setName={setNameEdit}
                        lastName={lastNameEdit}
                        setLastName={setLastNameEdit}
                        position={positionEdit}
                        setPosition={setPositionEdit}
                        email={emailEdit}
                        setEmail={setEmailEdit}
                        fetchCompanies={fetchCompanies}
                        company={companyEdit}
                        setCompany={setCompanyEdit}
                        companyArray={companyArray}/>
                </TopCreateContactBlock>
                <BottomCreateContactBlock>
                    <EditOtherInfoSection
                        closeEditContact={closeEditContact}
                        handleSaveEditContact={handleSaveEditContact}
                        regionList={regionList}
                        countryList={countryList}
                        cityList={cityList}
                        region={regionEdit}
                        setRegion={setRegionEdit}
                        country={countryEdit}
                        setCountry={setCountryEdit}
                        city={cityEdit}
                        setCity={setCityEdit}
                        address={addressEdit}
                        setAddress={setAddressEdit}
                        sliderValue={sliderValueEdit}
                        setSliderValue={setSliderValueEdit}
                        contactChannelsList={contactChannelsList}
                        contactChannelsToEdit={contactChannelsToEdit}
                        contactChannel1={contactChannel1Edit}
                        setContactChannel1={setContactChannel1Edit}
                        contactChannel2={contactChannel2Edit}
                        setContactChannel2={setContactChannel2Edit}
                        contactChannel3={contactChannel3Edit}
                        setContactChannel3={setContactChannel3Edit}
                        userAccount1={userAccount1Edit}
                        userAccount2={userAccount2Edit}
                        userAccount3={userAccount3Edit}
                        setUserAccount1={setUserAccount1Edit}
                        setUserAccount2={setUserAccount2Edit}
                        setUserAccount3={setUserAccount3Edit}
                        preferred1={preferred1Edit}
                        preferred2={preferred2Edit}
                        preferred3={preferred3Edit}
                        setPreferred1={setPreferred1Edit}
                        setPreferred2={setPreferred2Edit}
                        setPreferred3={setPreferred3Edit}
                    />
                </BottomCreateContactBlock>
            </CreateContactOverlay>)}

            <h1>Contactos</h1>
            <TopContainer>

                <SearchContainer value={query} onChange={handleQueryChange} >
                    <SearchBox></SearchBox>
                    <MaginfyingGlass onClick={handleSearch} />
                </SearchContainer>

                <SideButtonsContainer>
                    <ButtonTwo onClick={handleCreateContact} >Agregar Contactos</ButtonTwo>
                </SideButtonsContainer>

            </TopContainer>

            <ContactContainer>
                {selected.length > 0 && <SelectedCount>Selected Contacts: {selected.length}</SelectedCount>}
                <CustomTable
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                data={contactTableData}
                sortedData={sortedContactTableData}
                handleSort={handleSort}
                handleCheckboxChange={handleCheckboxChange}
                selected={selected}
                selectAll={selectAll}
                setSelectAll={setSelectAll}
                handleSelectAll={handleSelectAll}
                handleContactEdit={handleContactEdit}
                handleContactDelete={handleContactDelete}
                />
            </ContactContainer>
        </PageContainer>
    )
}

export default Contactos
