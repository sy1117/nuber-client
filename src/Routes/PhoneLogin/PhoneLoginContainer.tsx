import React, { useState } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";
import { useMutation } from "@apollo/react-hooks";
import { MutationFunctionOptions } from "react-apollo";
import { startPhoneVerification } from "../../types/api";
import { GraphQLError } from "graphql";

interface IProps extends RouteComponentProps<any>{

}


interface IMutation{
    phoneNumber: string
}

interface IData{

}

interface IState {
    countryCode: string,
    phoneNumber: string
}

const PhoneLoginContainer : React.FunctionComponent<IProps>= ({history})=>{

    const [phoneSignIn,{loading, data}] = useMutation<IMutation>(PHONE_SIGN_IN)

    const [state, setState] = useState<IState>({
        countryCode : "+82",
        phoneNumber : "123"
    }) 
    const {countryCode, phoneNumber}= state;

    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event)=>{
        const { target : { name, value} } = event;

        setState({
            ...state,
            [name] : value
        })

    }

    // @ts-ignore 
    const completeCallback:MutationUpdaterFn<IMutation, Record<IData>>=(cache: DataProxy, mutationResult: FetchResult)=>{
    // const completeCallback = (data)=>{
        const { data } = mutationResult
        const { StartPhoneVerification } = data;
        const phone = `${countryCode}${phoneNumber}`;
        if(StartPhoneVerification.ok){
            toast.success("SMS Sent! Redirecting you...")
            setTimeout(()=>{
                history.push({
                    pathname:"/verify-phone",
                    state:{
                        phoneNumber
                    }
                })
            }, 1000)
            return;
        }else{
            toast.error(StartPhoneVerification.error)
        }
    }

    const errorCallback = (error:GraphQLError)=>{
        toast.error(error)
    }

    const submitHandler : React.FormEventHandler = (event) =>{
        event.preventDefault();
        const _phoneNumber = `${countryCode}${phoneNumber}`;
        const isValid =/^\+[1-9]{1}[0-9]{7,11}$/.test(_phoneNumber)
        if(isValid){
            const mutate = phoneSignIn({
                variables:{
                    phoneNumber :`${countryCode}${phoneNumber}`
                },
                update: completeCallback,
                // onError: errorCallback
            })

            return ;
        }{
            toast.error("Please writed a valid phone number")
        }

    }

    return(
        <PhoneLoginPresenter 
            countryCode={state.countryCode}
            phoneNumber={state.phoneNumber}
            onInputChange = {inputChangeHandler}
            onSubmit={submitHandler}
        />
    )
}

export default PhoneLoginContainer;