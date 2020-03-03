import React, { useState } from 'react'
import EditAccountPresenter from './EditAccountPresenter';
import { useMutation, useQuery, MutationFunction } from 'react-apollo';
import { UPDATE_PROFILE } from './EditAccount.queries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { userProfile } from '../../types/api';
import { MutationUpdaterFn } from 'apollo-boost';
import { toast } from 'react-toastify';
import axios from "axios"

interface IState {
    firstName: string
    lastName: string
    email: string
    profilePhoto: string
    uploaded:boolean
    uploading:boolean
    file?:Blob
}


const EditAccountContainer : React.FunctionComponent= ()=>{
    const [state, setState] = useState<IState>({
        email: "",
        firstName: "",
        lastName: "",
        profilePhoto: "",
        uploaded:false,
        uploading:false
    })
    const { email, firstName, lastName, profilePhoto, uploaded, uploading} = state;
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
            setState({ ...state, email, firstName, lastName, profilePhoto, uploaded: profilePhoto !== null } )
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
    console.log(uploading, profilePhoto)
    
    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement> = async (event)=>{
        const { target : { name, value, files} } = event;
        if(files){
            setState({
                ...state,
                uploading : true
            })

            const formData = new FormData();
            formData.append("file", files[0])
            formData.append("api_key","512726643244784");
            formData.append("upload_preset","smounsa0");
            formData.append("timestamp", String(Date.now()/1000))

            const {data:{secure_url}} = await axios.post("https://api.cloudinary.com/v1_1/dc2txi62i/image/upload", formData)
            if(secure_url){
                setState({
                    ...state,
                    uploading:false,
                    profilePhoto:secure_url,
                })
            }

        }else{
            setState({
                ...state,
                [name] : value
            })
        }
    }

    return (
        <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            profilePhoto={profilePhoto}
            onInputChange={inputChangeHandler}
            uploading={uploading}
            loading={loading}
            onSubmit={submitHandler}
            onChange={()=>{}}
        />
    )
}

export default EditAccountContainer