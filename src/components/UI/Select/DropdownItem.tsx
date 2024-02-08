import React, {FC} from 'react';
import styled from 'styled-components';

interface selectItemProps {
    item: {label: string, value: string};
    handler: (value: string[]) => void;
    values: string[];
    backgroundColor: string;
    secondColor: string;
    isDesktop: boolean;
}

const Container = styled.div<{background: string, second: string, isDesktop: boolean}>`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: ${props => props.isDesktop ? '8px 20px' : '6px 20px'};
    background-color: ${props => props.background};
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.second};
    }
`

const StyledSpan = styled.span`
    margin-right: 36px;
`

const Checkmark = styled.span<{background: string}>`
    position: absolute;
    right: 20px;
    height: 19px;
    width: 19px;
    background-color: ${props => props.background};
    border: 1px #155DA4 solid;
    border-radius: 2px;
    
    &:after {
        left: 6px;
        top: 3px;
        width: 5px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(35deg);
        content: "";
        position: absolute;
        display: none;
    }
`

const StyledInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    
    &:checked + ${Checkmark} {
        background-color: #155DA4;
    }    
    
    &:checked + ${Checkmark}:after {
        display: block;
    }
`

const DropdownItem: FC<selectItemProps> = ({item, handler, values, secondColor, backgroundColor, isDesktop}) => {
    function onClick() {
        if (values?.includes(item.value)) {
            handler(values.filter(el => el !== item.value))
        } else {
            let newState = [item.value]
            if (values?.length) {
                newState = newState.concat(values)
            }
            handler(newState)
        }
    }

    return (
        <Container
            background={backgroundColor}
            second={secondColor}
            onClick={onClick}
            isDesktop={isDesktop}
        >
            <StyledSpan>{item.label}</StyledSpan>
            <StyledInput
                type="checkbox"
                checked={values?.includes(item.value)}
            />
            <Checkmark background={backgroundColor}/>
        </Container>
    );
};

export default DropdownItem;