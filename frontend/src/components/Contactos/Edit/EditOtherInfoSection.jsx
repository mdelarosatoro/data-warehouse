import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from '@mui/material/Slider';

const Container = styled.div`
    padding-top: 100px;
`;

const Label = styled.label`
    margin-bottom: 6px;
    margin-top: 4px;
`;
const Select = styled.select`
    border: 1px solid #CCCCCC;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    width: 170px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const GroupContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 35px;

`;

const Input = styled.input`
    padding: 6px;
    border: 1px solid rgba(0,0,0,0.25);
    width: 170px;
`;

const SliderInputContainer = styled(InputContainer)`
    width: 220px;
    margin-right: 35px;
`;

const AddChannelButton = styled.button`
    width: 143px;
    height: 34px;
    border: 1px solid rgba(0,0,0,0.25);
    border-radius: 1.5px;
    color: rgba(0,0,0,0.25);
    align-self: flex-end;
    margin-top: 28px;
    cursor: pointer;
`;

const LowerGroupContainer = styled(GroupContainer)`
    width: 70%;
    margin-top: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: space-between;
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 100px;
    bottom: 80px;
`;

const CancelButton = styled.button`
    background-color: white;
    border: none;
    color: rgba(0,0,0,0.25);
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
    transition: 0.3s ease all;
    cursor: pointer;
    &:hover{
        color: black;
        transition: 0.3s ease all;
    }
`;

const SaveButton = styled.button`
    background-color: rgba(0,0,0,0.25);
    border: none;
    font-size: 16px;
    padding: 12px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s ease all;
    &:hover{
        background-color: #1D72C2;
        transition: 0.3s ease all;
    }
`;

const ChannelCountContainer = styled.div`
    display: flex;
`;

const ChannelInputContainer = styled(InputContainer)`
    margin-right: 26px;
`;

function EditOtherInfoSection({
    closeEditContact,
    handleSaveEditContact,
    regionList,
    countryList,
    cityList,
    region,
    setRegion,
    country,
    setCountry,
    city,
    setCity,
    address,
    setAddress,
    sliderValue,
    setSliderValue,
    contactChannelsList,
    contactChannelsToEdit,
    contactChannel1,
    setContactChannel1,
    contactChannel2,
    setContactChannel2,
    contactChannel3,
    setContactChannel3,
    userAccount1,
    userAccount2,
    userAccount3,
    setUserAccount1,
    setUserAccount2,
    setUserAccount3,
    preferred1,
    preferred2,
    preferred3,
    setPreferred1,
    setPreferred2,
    setPreferred3,
}) {

    const [channelCount, setChannelCount] = useState(1);

    const handleRegion = (e) => {
        setRegion(e.target.value);
    }
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleSliderValue = (e) => {
        setSliderValue(e.target.value);
    }
    const handleContactChannel1 = (e) => {
        setContactChannel1(e.target.value);
    }
    const handleContactChannel2 = (e) => {
        setContactChannel2(e.target.value);
    }
    const handleContactChannel3 = (e) => {
        setContactChannel3(e.target.value);
    }
    const handleUserAccount1 = (e) => {
        setUserAccount1(e.target.value);
    }
    const handleUserAccount2 = (e) => {
        setUserAccount2(e.target.value);
    }
    const handleUserAccount3 = (e) => {
        setUserAccount3(e.target.value);
    }
    const handlePreferred1 = (e) => {
        setPreferred1(e.target.value);
    }
    const handlePreferred2 = (e) => {
        setPreferred2(e.target.value);
    }
    const handlePreferred3 = (e) => {
        setPreferred3(e.target.value);
    }
    const handleAddChannel = (e) => {
        if (channelCount === 1) {
            setChannelCount(2)
        } else if (channelCount === 2) {
            setChannelCount(3)
        }
    }
    useEffect(() => {
        if (contactChannelsToEdit.length === 1) {
            setChannelCount(1)
        } else if (contactChannelsToEdit.length === 2) {
            setChannelCount(2)
        } else if (contactChannelsToEdit.length === 3) {
            setChannelCount(3)
        }
    },[contactChannelsToEdit])

    return (
        <Container>
            <GroupContainer>
                <InputContainer>
                    <Label htmlFor="region">Región</Label>
                    <Select value={region} onChange={handleRegion} name="region" id="region">
                        <option></option>
                        {regionList.map((region) => {
                            return (
                                <option value={region.key}>{region.name}</option>
                            )
                        })}
                    </Select>
                </InputContainer>
                
                <InputContainer>
                    <Label htmlFor="country">País</Label>
                    <Select value={country} onChange={handleCountry} name="country" id="country">
                        <option></option>
                        {countryList && countryList.map((country) => {
                            return (
                                <option value={country.key}>{country.name}</option>
                            );
                        })}
                    </Select>
                </InputContainer>
                
                <InputContainer>
                    <Label htmlFor="city">Ciudad</Label>
                    <Select value={city} onChange={handleCity} name="city" id="city">
                        <option></option>
                        {cityList && cityList.map((city) => {
                            return (
                                <option value={city.key}>{city.name}</option>
                            );
                        })}
                    </Select>
                </InputContainer>
                <InputContainer>
                    <Label htmlFor="address">Dirección</Label>
                    <Input value={address} onChange={handleAddress} placeholder='Ingrese una dirección' />
                </InputContainer>
                <SliderInputContainer>
                    <Label>Interés</Label>
                    <Slider
                    size='small'
                    defaultValue={0}
                    min={0}
                    max={100}
                    step={25}
                    marks
                    valueLabelDisplay='auto'
                    onChange={handleSliderValue}
                    value={sliderValue}
                    />
                </SliderInputContainer>
            </GroupContainer>
            <LowerGroupContainer>
                <ChannelCountContainer>
                    <ChannelInputContainer>
                        <Label htmlFor="contact-channel">Canal de Contacto</Label>
                        <Select value={contactChannel1} onChange={handleContactChannel1} name="contact-channel" id="contact-channel">
                            <option></option>
                            {contactChannelsList.map((channel) => {
                                return (
                                    <option value={channel.key}>{channel.name}</option>
                                )
                            })}
                        </Select>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Cuenta de Usuario</Label>
                        <Input value={userAccount1} onChange={handleUserAccount1} placeholder='@ejemplo'></Input>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Preferencia</Label>
                        <Select value={preferred1} onChange={handlePreferred1}>
                            <option></option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </Select>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <AddChannelButton onClick={handleAddChannel}>+ Agregar Canal</AddChannelButton>
                    </ChannelInputContainer>
                </ChannelCountContainer>
                {channelCount >= 2 && (
                <ChannelCountContainer>
                    <ChannelInputContainer>
                    <Label htmlFor="contact-channel">Canal de Contacto</Label>
                    <Select value={contactChannel2} onChange={handleContactChannel2} name="contact-channel" id="contact-channel">
                        <option></option>
                        {contactChannelsList.map((channel) => {
                            return (
                                <option value={channel.key}>{channel.name}</option>
                            )
                        })}
                    </Select>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Cuenta de Usuario</Label>
                        <Input value={userAccount2} onChange={handleUserAccount2} placeholder='@ejemplo'></Input>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Preferencia</Label>
                        <Select value={preferred2} onChange={handlePreferred2}>
                            <option></option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </Select>
                    </ChannelInputContainer>
                </ChannelCountContainer>
                )}
                {channelCount === 3 && (
                <ChannelCountContainer>
                    <ChannelInputContainer>
                    <Label htmlFor="contact-channel">Canal de Contacto</Label>
                    <Select value={contactChannel3} onChange={handleContactChannel3} name="contact-channel" id="contact-channel">
                        <option></option>
                        {contactChannelsList.map((channel) => {
                            return (
                                <option value={channel.key}>{channel.name}</option>
                            )
                        })}
                    </Select>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Cuenta de Usuario</Label>
                        <Input value={userAccount3} onChange={handleUserAccount3} placeholder='@ejemplo'></Input>
                    </ChannelInputContainer>
                    <ChannelInputContainer>
                        <Label>Preferencia</Label>
                        <Select value={preferred3} onChange={handlePreferred3}>
                            <option></option>
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </Select>
                    </ChannelInputContainer>
                </ChannelCountContainer>
                )}
            </LowerGroupContainer>
            <ButtonsContainer>
                    <CancelButton onClick={closeEditContact}>Cancelar</CancelButton>
                    <SaveButton onClick={handleSaveEditContact}>Guardar Contacto</SaveButton>
            </ButtonsContainer>
        </Container>
    )
}

export default EditOtherInfoSection
