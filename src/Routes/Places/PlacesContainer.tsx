import React from "react";
import { Query, useQuery } from "react-apollo";
import { getPlaces } from "../../types/api";
import PlacesPresenter from "./PlacesPresenter";
import { GET_MY_PLACES } from "../../sharedQueries.queries";

const PlacesContainer : React.FunctionComponent = ()=>{
    const { data, error, loading } = useQuery<getPlaces>(GET_MY_PLACES)
    return (
        <PlacesPresenter data={data} loading={loading} />
    )
}

export default PlacesContainer;