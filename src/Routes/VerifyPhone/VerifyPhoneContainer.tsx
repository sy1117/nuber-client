import React, { useState } from 'react'
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { RouteComponentProps, Redirect, withRouter, useHistory, useLocation } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries.queries';
import { LOG_USER_IN } from '../../sharedQueries.local';
import { toast } from 'react-toastify';
import { verifyPhone } from '../../types/api';

interface IProps  {

}

const VerifyPhoneContainer : React.FunctionComponent = ()=>{

    const history = useHistory();
    const location = useLocation();

    if (!location.state) {
        history.push("/")
    }

    const [logUserIn] = useMutation<any, any>(LOG_USER_IN);
    const {state} :{state:any}= location; 
    const [formData, setFormData] = useState({
        key : "",
        phoneNumber: state?.phoneNumber || ""
    })
    const {key, phoneNumber} = formData;

    const verifyHandler = (data: any) => {
        const { CompletePhoneVerification } = data;
        console.log(data)
        if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
                console.log("here")
                logUserIn({
                    variables: {
                        token: CompletePhoneVerification.token
                    }
                });

            }
            toast.success("You're verified, loggin in now");
        } else {
            toast.error(CompletePhoneVerification.error);
        }
    }

    const [verifyPhoneMutation, {loading, data}] = useMutation<verifyPhone>(VERIFY_PHONE, {
        onCompleted : verifyHandler
    })
    
    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement>= (event:React.ChangeEvent)=>{
        const {target:{name, value}}:any = event;
        setFormData({
            ...formData,
            [name] : value,
        })
    }
    const submitHandler = ()=>{
        const {key, phoneNumber} = formData;

        verifyPhoneMutation({
            variables:{
                key,
                phoneNumber
            },
        })
    }
    
    return <VerifyPhonePresenter 
        verificationKey={formData.key}
        onSubmit={submitHandler}
        loading={loading}
        onChange={inputChangeHandler}
    />
}

export default VerifyPhoneContainer;