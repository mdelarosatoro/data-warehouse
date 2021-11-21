import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
    background: #DDDDDD;
    width: 109px;
    height: 8px;
    border-radius: 4px;
    margin-left: 15px;
    position: relative
`;

const BlueBar = styled.div`
    background: #1CC1F5;
    width: 25%;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 0;
`;

const YellowBar = styled.div`
    background: #FFC700;
    width: 50%;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 0;
`;

const OrangeBar = styled.div`
    background: #FF6F00;
    width: 75%;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 0;
`;

const RedBar = styled.div`
    background: #DE0028;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 0;
`;

function InterestBar({ interest }) {
    return (
        <Bar>
            {(() => {
                switch (interest) {
                    case 0.25:
                        return <BlueBar />
                    case 0.5:
                        return <YellowBar />
                    case 0.75:
                        return <OrangeBar />
                    case 1:
                        return <RedBar />
                    default:
                        break;
                }
            })()}
        </Bar>
    )
}

export default InterestBar
