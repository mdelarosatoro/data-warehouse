import React from 'react'
import styled from 'styled-components'

const PButton = styled.button`
    padding: 3px;
    background-color: #1D72C2;
    color: white;
    width: 173px;
    height: 42px;
    border-radius: 2px;
    margin-top: 10px;
`;

function PrimaryButton({text}) {
    return (
        <PButton>
            {text}
        </ PButton>
    )
}

export default PrimaryButton
