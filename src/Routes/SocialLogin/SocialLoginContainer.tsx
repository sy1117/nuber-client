import React, { useState } from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { useMutation, MutationFunction } from "react-apollo";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries.queries";
import { toast } from "react-toastify";

interface IState {
	firstName:string;
	lastName:string;
	email?:string;
	fbId:string;
}


const SocialLoginContainer  = ()=> {
	const [state, setState] = useState<IState>({
		firstName:"", lastName:"", email:"", fbId:""
	});
	const { firstName, lastName, email, fbId } = state;

	const [facebookConnect, {loading}] = useMutation<any, any>(FACEBOOK_CONNECT, {
		variables:{
			firstName, lastName, email, fbId
		},
	});

	console.log(firstName)

	const loginCallback:Function = (fbData:any)=>{
		let { name, first_name:firstName, last_name:lastName, email, id:fbId, accessToken} = fbData;
		if(accessToken){
			toast.success(`Welcome ${name}`);
			setState({
				...state,
				email,
				firstName,
				lastName,
				fbId 
			})
		}else{
			toast.error("Could not log in ")
		}
		// facebookConnect()
	}

    return <SocialLoginPresenter loginCallback={loginCallback}/>;
}

export default SocialLoginContainer;