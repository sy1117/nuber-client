import React from 'react'
import PlacePresenter from "./PlacePresenter"
import { useMutation } from 'react-apollo'
import { EDIT_PLACE } from './Place.queries'
import { editPlace } from '../../types/api'
import { GET_MY_PLACES } from '../../sharedQueries.queries'

interface IProps {
    fav: boolean;
    name: string;
    address: string;
    id:number;
}

const PlaceContainer : React.FunctionComponent<IProps> = ({fav, name, address, id})=>{
    const [editPlaceFn] = useMutation<editPlace>(EDIT_PLACE, {
        variables:{
            placeId:id,
            isFav:!fav
        },
        refetchQueries:[{query:GET_MY_PLACES}]
    })
    return (
        <PlacePresenter fav={fav} name={name} address={address} onStarPress={editPlaceFn}/>
    )
}

export default PlaceContainer