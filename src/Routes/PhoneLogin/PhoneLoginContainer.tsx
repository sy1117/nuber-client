import React, { useState } from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any>{

}

interface IState {
    countryCode: string,
    phoneNumber: string
}

const PhoneLoginContainer : React.FunctionComponent<IProps>= ()=>{
    const [state, setState] = useState<IState>({
        countryCode : "+82",
        phoneNumber : "123"
    }) 

    const inputChangeHandler : React.ChangeEventHandler<HTMLInputElement> = (event)=>{
        const { target : { name, value} } = event;

        setState({
            ...state,
            [name] : value
        })

    }

    const submitHandler : React.FormEventHandler = (event) =>{
        event.preventDefault();
        const { countryCode, phoneNumber } = state;
        console.log(countryCode, phoneNumber)
    }

    return <PhoneLoginPresenter 
        countryCode={state.countryCode}
        phoneNumber={state.phoneNumber}
        onInputChange = {inputChangeHandler}
        onSubmit={submitHandler}
    />;
}

export default PhoneLoginContainer;