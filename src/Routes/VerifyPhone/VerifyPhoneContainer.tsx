import React, { useState } from 'react'
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useMutation, graphql } from 'react-apollo';
import { VERIFY_PHONE } from './VerifyPhoneQueries.queries';
import { LOG_USER_IN } from '../../sharedQueries';

interface IProps extends RouteComponentProps<any>{

}

const VerifyPhoneContainer : React.SFC<IProps>= ({history, location})=>{

    const [verifyPhone, {loading, data}] = useMutation(VERIFY_PHONE)
    const [state, setState] = useState({
        key :"",
        //@ts-ignore
        phoneNumber: location.state?.phoneNumber 
    })
    const {key, phoneNumber} = state;

    if(!location?.state || !location.state.hasOwnProperty("phoneNumber")){
        history.push("/")
    }
    
    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement>= (event:React.ChangeEvent)=>{
        const {target:{name, value}}:any = event;
        setState({
            ...state,
            [name] : value
        })
    }

    const submitHandler = ()=>{
        verifyPhone({
            variables:{
                key,
                phoneNumber
            },
        })
    }
    
    return <VerifyPhonePresenter 
        key={key}
        onSubmit={submitHandler}
        loading={loading}
        onChange={inputChangeHandler}
    />
}

export default graphql<IProps, any>(LOG_USER_IN, {
    name:"logUserIn"
})(VerifyPhoneContainer);