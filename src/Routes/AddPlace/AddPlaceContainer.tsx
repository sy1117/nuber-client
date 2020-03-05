import React, { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries.queries";
import { useMutation } from "react-apollo";
import { addPlace } from '../../types/api'
import { GET_MY_PLACES } from "../../sharedQueries.queries";
import { toast } from "react-toastify";

interface IState {
	address: string;
	name: string;
	lat: number;
	lng: number;
}

interface IProps extends RouteComponentProps<any> {}

const AddPlaceContainer : React.FunctionComponent <IProps>= () =>{

	const [state, setState] = useState<IState>({
		address: "", name :"", lat:123.2, lng:455.123
	})
	const {name, address, lat,lng} = state;

	const history = useHistory()

	const [addPlaceMutation] = useMutation<addPlace>(ADD_PLACE,{
		variables : {
			name,
			address,
			lat,
			lng,
			isFav:false
		},
		onCompleted(data){
			const { AddPlace } = data;
			if(AddPlace.ok){
				toast.success("Place added")
				setTimeout(()=>{
					history.push("/places")
				}, 2000);
			}else{
				toast.error(AddPlace.error)
			}
		},
		refetchQueries:[{query:GET_MY_PLACES}]
	})

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
		const {
			target: { name, value }
		} = event;
		setState({...state, [name]: value} as any);
	};

	return (
		<AddPlacePresenter
			loading={false}
			onInputChange={onInputChange}
			address={address}
			name={name}
			onSubmit={addPlaceMutation}
		/>
	)
}

export default AddPlaceContainer;