import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from '../../sharedQueries.queries';
import { userProfile, userProfile_GetMyProfile } from "../../types/api";

const MenuContainer = ()=>{

    const { loading, error, data} = useQuery<userProfile>(USER_PROFILE);
    return <MenuPresenter data={data} loading={loading}/>
}

export default MenuContainer;