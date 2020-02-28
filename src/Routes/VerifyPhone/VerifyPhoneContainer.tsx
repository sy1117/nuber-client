import React, { useState } from 'react'
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { RouteComponentProps, Redirect, withRouter, useHistory, useLocation } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries.queries';
import { LOG_USER_IN } from '../../sharedQueries';
import { toast } from 'react-toastify';

interface IProps  {

}

const VerifyPhoneContainer : React.FunctionComponent = ()=>{

    const history = useHistory();
    const location = useLocation();

    if (!location.state) {
        history.push("/")
    }

    const [verifyPhone, {loading, data}] = useMutation(VERIFY_PHONE)
    const [logUserIn] = useMutation<any, any>(LOG_USER_IN);
    const {state} :{state:any}= location; 
    const [formData, setFormData] = useState({
        key : "",
        phoneNumber: state?.phoneNumber || ""
    })
    const {key, phoneNumber} = formData;

    console.log(phoneNumber, location.state)
    
    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement>= (event:React.ChangeEvent)=>{
        const {target:{name, value}}:any = event;
        setFormData({
            ...formData,
            [name] : value,
        })
    }

    const verifyHandler = (data:any) => {
        const { CompletePhoneVerification } = data;
        if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
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

    const submitHandler = ()=>{
        const {key, phoneNumber} = formData;

        verifyPhone({
            variables:{
                key,
                phoneNumber
            },
            update: verifyHandler
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