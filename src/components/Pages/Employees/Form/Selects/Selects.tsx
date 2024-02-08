import React from 'react';
import {gender, position, stack} from 'utils/consts/selectOptions'
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {filterFormContentSlice} from 'store/reducers/FilterFormContentSlice';
import styled from 'styled-components';
import Select from 'components/UI/Select';
import {selectsSlice} from 'store/reducers/SelectsSlice';

const Container = styled.div<{isDesktop: boolean}>`
    width: ${props => props.isDesktop ? '475px' : '100%'}; 
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    margin-bottom: ${props => props.isDesktop ? 0 : '16px'};
`

const Selects = () => {
    const {isDesktop} = useAppSelector(state => state.windowSizeReducer);
    const {filterFormContent} = useAppSelector(state => state.filterFormContentReducer);
    const {background, second} = useAppSelector(state => state.themeReducer);
    const {isFirstOpen, isSecondOpen, isThirdOpen} = useAppSelector(state => state.selectsReducer);
    const {positionChanged, genderChanged, stackChanged} = filterFormContentSlice.actions;
    const dispatch = useAppDispatch();
    const {toggleThird, toggleSecond, toggleFirst} = selectsSlice.actions;

    function positionDispatch(content: string[]) {
        dispatch(positionChanged(content))
    }

    function genderDispatch(content: string[]) {
        dispatch(genderChanged(content))
    }

    function stackDispatch(content: string[]) {
        dispatch(stackChanged(content))
    }

    return (
        <Container isDesktop={isDesktop}>
            <Select
                isDesktop={isDesktop}
                isOpen={isFirstOpen}
                open={() => dispatch(toggleFirst())}
                backgroundColor={background}
                secondColor={second}
                handler={positionDispatch}
                options={position}
                placeholder={'Должность'}
                values={filterFormContent.position}
            />
            <Select
                isDesktop={isDesktop}
                isOpen={isSecondOpen}
                open={() => dispatch(toggleSecond())}
                backgroundColor={background}
                secondColor={second}
                handler={genderDispatch}
                options={gender}
                placeholder={'Пол'}
                values={filterFormContent.gender}
            />
            <Select
                isDesktop={isDesktop}
                isOpen={isThirdOpen}
                open={() => dispatch(toggleThird())}
                backgroundColor={background}
                secondColor={second}
                handler={stackDispatch}
                options={stack}
                placeholder={'Стек технологий'}
                values={filterFormContent.stack}
            />
        </Container>
    );
};

export default Selects;