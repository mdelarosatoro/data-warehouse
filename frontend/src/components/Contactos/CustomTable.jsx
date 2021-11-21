import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InterestBar from './InterestBar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableComponent = styled.table`
    border: 1px solid rgba(0,0,0,0.10);
    width: 80vw;
    border-spacing: 0;
`;

const Th = styled.th`
    padding: 34px 0 21px 18px;
    user-select: none;
    text-align: left;
    border-bottom: 1px solid rgba(0,0,0,0.10);
    font-weight: 200;
    font-size: 12px;
    cursor: pointer;
`;

const TBody = styled.tbody`

`;

const Td = styled.td`
    padding: 3px;
    margin: 0;
    padding-left: 16px;
    font-size: 11.4px;
`;

const Tr = styled.tr`
    transition: 0.3s ease all;
    height: 50px;
    &:hover{
        background-color: rgba(0,0,0,0.05);
        transition: 0.3s ease all;
    }
`;

const Checkbox = styled.input`
    cursor: pointer;
`;

const InterestCell = styled(Td)`
    display: flex;
    align-items: center;
    height: 50px;
`;

const Percentage = styled.span`
    width: 35px;
    display: block;
`;

const ActionCell = styled(Td)`
    cursor: pointer;
`;

const ChannelCell = styled(Td)`

`;

const Tags = styled.span`
    color: #0683F9;
    background-color: #E6F2FE;
    padding: 6px;
    border-radius: 4px;
    margin-right: 8px;
`;

const ProfileCell = styled(Td)`
    display: flex;
    align-items: center;
    height: 50px;
`;

const ProfilePic = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 9px;
`;

const NameCell = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.span`

`;

const Email = styled.span`
    color: rgba(0, 0, 0, 0.5);
    font-size: 10px;
`;

const EditIconStyled = styled(EditIcon)`
    color: rgba(0, 0, 0, 0.5);
`;

const DeleteIconStyled = styled(DeleteIcon)`
    color: rgba(0, 0, 0, 0.5);
`;


function CustomTable({ data,
    sortedData,
    handleSort,
    handleMouseEnter,
    handleMouseLeave,
    handleCheckboxChange,
    selectAll,
    selected,
    handleSelectAll,
    handleContactEdit,
    handleContactDelete,
}) {

    const [contactSort, setContactSort] = useState(0);
    const [regionSort, setRegionSort] = useState(0);
    const [companySort, setCompanySort] = useState(0);
    const [positionSort, setPositionSort] = useState(0);
    const [preferredChannelsSort, setPreferredChannelsSort] = useState(0);
    const [interestSort, setInterestSort] = useState(0);
    
    const handleSortClick = (e) => {
        console.log(e.target)
        
        switch (e.target.id) {
            case 'contact':
                setRegionSort(0)
                setCompanySort(0)
                setPositionSort(0)
                setPreferredChannelsSort(0)
                setInterestSort(0)
                console.log('A')
                console.log(contactSort)
                switch (contactSort) {
                    case 0:
                        handleSort(e.target.id, contactSort + 1)
                        setContactSort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, contactSort + 1)
                        setContactSort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, contactSort - 2)
                        setContactSort(0)
                        break;
                    default:
                        break;
                }
                break;
            case 'region':
                setContactSort(0)
                setCompanySort(0)
                setPositionSort(0)
                setPreferredChannelsSort(0)
                setInterestSort(0)
                switch (regionSort) {
                    case 0:
                        handleSort(e.target.id, regionSort + 1)
                        setRegionSort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, regionSort + 1)
                        setRegionSort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, regionSort - 2)
                        setRegionSort(0)
                        break;
                    default:
                        break;
                }
                break;
            case 'company':
                setContactSort(0)
                setRegionSort(0)
                setPositionSort(0)
                setPreferredChannelsSort(0)
                setInterestSort(0)
                switch (companySort) {
                    case 0:
                        handleSort(e.target.id, regionSort + 1)
                        setCompanySort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, companySort + 1)
                        setCompanySort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, companySort - 2)
                        setCompanySort(0)
                        break;
                    default:
                        break;
                }
                break;
                case 'position':
                setContactSort(0)
                setRegionSort(0)
                setCompanySort(0)
                setPreferredChannelsSort(0)
                setInterestSort(0)
                switch (positionSort) {
                    case 0:
                        handleSort(e.target.id, positionSort + 1)
                        setPositionSort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, positionSort + 1)
                        setPositionSort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, positionSort - 2)
                        setPositionSort(0)
                        break;
                    default:
                        break;
                }
                break;
                case 'preferredChannels':
                setContactSort(0)
                setRegionSort(0)
                setCompanySort(0)
                setPositionSort(0)
                setInterestSort(0)
                switch (preferredChannelsSort) {
                    case 0:
                        handleSort(e.target.id, preferredChannelsSort + 1)
                        setPreferredChannelsSort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, preferredChannelsSort + 1)
                        setPreferredChannelsSort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, preferredChannelsSort - 2)
                        setPreferredChannelsSort(0)
                        break;
                    default:
                        break;
                }
                break;
            case 'interest':
                setContactSort(0)
                setRegionSort(0)
                setCompanySort(0)
                setPositionSort(0)
                setPreferredChannelsSort(0)
                switch (interestSort) {
                    case 0:
                        handleSort(e.target.id, interestSort + 1)
                        setInterestSort(1)
                        break;
                    case 1:
                        handleSort(e.target.id, interestSort + 1)
                        setInterestSort(2)
                        break;
                    case 2:
                        handleSort(e.target.id, interestSort - 2)
                        setInterestSort(0)
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

    }


    return (
        <TableComponent>
            <thead>
                <tr>
                    <Th><Checkbox type="checkbox" onClick={handleSelectAll} /></Th>
                    <Th onClick={handleSortClick} id='contact'>Contacto {contactSort === 1 ? '↑' : contactSort === 2 ? '↓' : ''}</Th>
                    <Th onClick={handleSortClick} id='region'>País/Región {regionSort === 1 ? '↑' : regionSort === 2 ? '↓' : ''}</Th>
                    <Th onClick={handleSortClick} id='company'>Compañía {companySort === 1 ? '↑' : companySort === 2 ? '↓' : ''}</Th>
                    <Th onClick={handleSortClick} id='position'>Cargo {positionSort === 1 ? '↑' : positionSort === 2 ? '↓' : ''}</Th>
                    <Th id='preferredChannels'>Canal Preferido {preferredChannelsSort === 1 ? '↑' : preferredChannelsSort === 2 ? '↓' : ''}</Th>
                    <Th onClick={handleSortClick} id='interest'>Interés {interestSort === 1 ? '↑' : interestSort === 2 ? '↓' : ''}</Th>
                    <Th>Acciones</Th>
                </tr>
            </thead>
            <TBody>
                {sortedData.map(contact => (
                    <Tr id={contact.key}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <Td><Checkbox onChange={handleCheckboxChange} type="checkbox" id={contact.key} {...(selectAll ? {checked: true} : {})} /></Td>
                        <ProfileCell>
                            <ProfilePic src={contact.profilePic ? contact.profilePic : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                            <NameCell>
                                <Name>{contact.contact}</Name><Email>{contact.email}</Email>
                            </NameCell>
                        </ProfileCell>
                        <Td>{contact.region}</Td>
                        <Td>{contact.company}</Td>
                        <Td>{contact.position}</Td>
                        <ChannelCell>{contact.preferredChannels.map(channel => <Tags>{channel} </Tags>)}</ChannelCell>
                        <InterestCell>
                            <Percentage>{contact.interest * 100} %</Percentage>
                            <InterestBar interest={contact.interest} />
                        </InterestCell>
                        <ActionCell>{contact.isHovered ? 
                        <>
                            <EditIconStyled id={`${contact.key}`} onClick={handleContactEdit} />
                            <DeleteIconStyled id={`${contact.key}`} onClick={handleContactDelete} />
                        </> : '...'}</ActionCell>
                    </Tr>
                ))}
            </TBody>
        </TableComponent>
    )
}

export default CustomTable
