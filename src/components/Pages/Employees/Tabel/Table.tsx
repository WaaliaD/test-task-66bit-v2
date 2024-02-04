import React from 'react';
import styled from 'styled-components';
import TableRow from './TableRow';
import {useAppSelector} from '../../../../hooks/redux';

const TableContainer = styled.div`
    display: flex;
    justify-content: center;
`

const StyledTable = styled.div`
    width: 1584px;
    display: flex;
    flex-direction: column;
`

const TableHead = styled.div`
    display: grid;
    grid-template-columns:
        minmax(150px, 4fr)
        minmax(150px, 3fr)
        minmax(150px, 2fr)
        minmax(150px, 1fr);
    padding: 32px 12px 28px 12px;
`

const StyledTh = styled.div`
    color: #B0B0B0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    font-weight: normal;
`

const Table = () => {
    const {employees} = useAppSelector(state => state.employeesReducer);

    return (
        <TableContainer>
            <StyledTable>
                <TableHead>
                    <StyledTh>ФИО</StyledTh>
                    <StyledTh>Должность</StyledTh>
                    <StyledTh>Телефон</StyledTh>
                    <StyledTh>Дата рождения</StyledTh>
                </TableHead>
                {employees.length
                    ?
                    employees.map(item => <TableRow
                        key={item.id}
                        name={item.name}
                        phone={item.phone}
                        position={item.position}
                        birthdate={item.birthdate}
                        id={item.id}
                    />)
                    :
                    <h2 style={{textAlign: 'center'}}>Таких не найденно</h2>}
            </StyledTable>
        </TableContainer>
    );
};

export default Table;