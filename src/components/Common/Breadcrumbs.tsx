import React from 'react';
import arrow from 'utils/images/arrow.svg';
import styled from 'styled-components';
import {useAppSelector} from 'hooks/redux';
import {useNavigate} from 'react-router-dom'
import {urlPathnameToBreadcrumbs} from 'utils/consts/urlPathnameToBreadcrumbs';

const StyledBreadcrumbs = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 24px;
`

const BreadcrumbsContent = styled.div`
    display: flex;
    align-items: center;
    height: 77px;
    width: 1560px;
    color: #B0B0B0;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        height: 44px;
    }
`

const StyledSpan = styled.span`
    cursor: pointer;
    font-size: 18px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const Arrow = styled.img`
    margin: 0 20.33px;
    height: 12.67px;
    width: 7.33px;

    @media (max-width: 768px) {
        margin: 0 15.25px;
        height: 9.5px;
        width: 5.5px;
    }
`

const Breadcrumbs = () => {
    const {employee} = useAppSelector(state => state.employeeByIdReducer);
    const {isDesktop} = useAppSelector(state => state.applicationAppearanceReducer);

    const currentUrl = window.location;
    let params = currentUrl.pathname.split('/');

    const router = useNavigate();

    function goToMain() {
        router(`/`)
    }

    function goToThePageByName(page: string) {
        router(`/${page}`)
    }

    function goToEmployeePageById(id: string) {
        router(`/employees/${id}`)
    }

    return (
        <StyledBreadcrumbs>
            <BreadcrumbsContent>
                <StyledSpan onClick={goToMain}>
                    Главная
                </StyledSpan>
                {params
                    .filter(item => urlPathnameToBreadcrumbs.has(item) || !!Number(item))
                    .map(item => {
                        if (urlPathnameToBreadcrumbs.has(item)) {
                            return (
                                <>
                                    <Arrow key={item} src={arrow} alt={'>'}/>
                                    <StyledSpan onClick={() => goToThePageByName(item)}>
                                        {isDesktop
                                            ? urlPathnameToBreadcrumbs.get(item)?.[0]
                                            : urlPathnameToBreadcrumbs.get(item)?.[1]
                                        }
                                    </StyledSpan>
                                </>
                            )
                        }
                        return (
                            <>
                                <Arrow key={item} src={arrow} alt={'>'}/>
                                <StyledSpan onClick={() => goToEmployeePageById(item)}>
                                    {isDesktop
                                        ? employee.name
                                        : employee.name &&
                                            employee.name.split(' ')[0]
                                            + ' '
                                            + employee.name.split(' ')[1][0]
                                            + '. '
                                            + employee.name.split(' ')[2][0]
                                            + '.'
                                    }
                                </StyledSpan>
                            </>
                        )
                    })
                }
            </BreadcrumbsContent>
        </StyledBreadcrumbs>
    );
};

export default Breadcrumbs;