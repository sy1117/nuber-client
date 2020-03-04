import React from 'react'
import SettingsPresenter from './SettingsPresenter'
import { useMutation, useQuery } from 'react-apollo'
import { LOG_USER_OUT } from '../../sharedQueries.local'
import { USER_PROFILE, GET_MY_PLACES } from '../../sharedQueries.queries'
import { userProfile, getPlaces } from '../../types/api'

const SettingContainer = ()=>{

    const [logUserOut] = useMutation(LOG_USER_OUT)
    const { loading: userDataLoading, error:userError, data:userData } = useQuery<userProfile>(USER_PROFILE);
    const { loading: placesDataLoading, data:placesData} = useQuery<getPlaces>(GET_MY_PLACES)


    return <SettingsPresenter 
        userData ={userData}
        userDataLoading={userDataLoading}
        placesDataLoading={placesDataLoading}
        placesData={placesData}
        logUserOut={logUserOut}/>
}

export default SettingContainer