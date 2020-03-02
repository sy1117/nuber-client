import React, { useState } from 'react'
import HomePresenter from './HomePresenter';
import { useQuery } from '@apollo/react-hooks';
import { userProfile } from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries.queries';

interface IState { 
    isMenuOpen: boolean
}

interface IProps {

}

const HomeContainer : React.FunctionComponent= ()=>{

    const { loading, error } = useQuery<userProfile>(USER_PROFILE);

    const [{isMenuOpen}, setMenuOpen] = useState<IState>({
        isMenuOpen:false
    })



    const toggleMenu = ()=>setMenuOpen({isMenuOpen:!isMenuOpen});

    return (
        <HomePresenter 
            loading={loading}
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu}
        />
    )
}

export default HomeContainer