import React from 'react'
import SettingsPresenter from './SettingsPresenter'
import { useMutation, useQuery } from 'react-apollo'
import { LOG_USER_OUT } from '../../sharedQueries.local'
import { USER_PROFILE } from '../../sharedQueries.queries'
import { userProfile } from '../../types/api'

const SettingContainer = ()=>{

    const [logUserOut] = useMutation(LOG_USER_OUT)
    const { loading, error, data:userData } = useQuery<userProfile>(USER_PROFILE);


    return <SettingsPresenter 
        userData ={userData}
        userDataLoading={loading}
        logUserOut={logUserOut}/>
}

export default SettingContainer