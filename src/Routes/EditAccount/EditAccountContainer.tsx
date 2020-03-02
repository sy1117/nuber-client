import React, { useState } from 'react'
import EditAccountPresenter from './EditAccountPresenter';
import { useMutation, useQuery, MutationFunction } from 'react-apollo';
import { UPDATE_PROFILE } from './EditAccount.queries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { userProfile } from '../../types/api';
import { MutationUpdaterFn } from 'apollo-boost';
import { toast } from 'react-toastify';

interface IState {
    firstName: string
    lastName: string
    email: string
    profilePhoto: string
}


const EditAccountContainer : React.FunctionComponent= ()=>{
    const [state, setState] = useState<IState>({
        email: "",
        firstName: "",
        lastName: "",
        profilePhoto: ""
    })
    const { email, firstName, lastName, profilePhoto } = state;
    const [updateProfileMutation, {loading}] = useMutation(UPDATE_PROFILE, {
        onCompleted(data){
            const { UpdateMyProfile } = data;
            if(data.UpdateMyProfile){
                toast.success("Profile updated!")
            } else if(!UpdateMyProfile.ok){
                toast.error(UpdateMyProfile.error);
            }
        }
    })

    const updateField = (data :any)=>{
        const { GetMyProfile  } = data;
        if(data.GetMyProfile){
            const { ok, error, user } = GetMyProfile;
            let { email, firstName, lastName, profilePhoto } = user;
            setState({ email, firstName, lastName, profilePhoto } )

        }
    }
    const  {data} = useQuery<userProfile>(USER_PROFILE, {
        onCompleted : updateField
    });
    const submitHandler = ()=>{
        updateProfileMutation({
            variables:{
                email,
                firstName,
                lastName,
                profilePhoto
            },
            refetchQueries:[{query:USER_PROFILE}],
        })
    }
    
    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event)=>{
        const { target : { name, value} } = event;
        setState({
            ...state,
            [name] : value
        })
    }

    return (
        <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            profilePhoto={profilePhoto}
            onInputChange={inputChangeHandler}
            loading={loading}
            onSubmit={submitHandler}
        />
    )
}

export default EditAccountContainer