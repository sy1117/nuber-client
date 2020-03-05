import React, { useRef, useEffect, useState } from 'react'
import FindAddressPresenter from "./FindAddressPresenter"
import { RouteComponentProps } from 'react-router-dom'
import ReactDOM from 'react-dom';



const FindAddressContainer : React.FunctionComponent<any> = ({google})=>{

    const [{lat,lng}, setState] = useState({
        lat:null,
        lng:null,
    });
    const mapRef = useRef(null);
    let map : google.maps.Map;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    }, [])

    const loadMap = (lat:number, lng:number)=>{
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig : google.maps.MapOptions = {
            zoom:11,
            center:{
                lat,
                lng,
            },
            disableDefaultUI: false
        }
        map  = new google.maps.Map(mapNode, mapConfig)
        map.addListener('dragend', handleDragEnd)
    }

    const handleGeoSuccess = (position: Position)=>{
        const { coords  : {latitude:lat,longitude:lng}} = position;
        setState({lat, lng})
        loadMap(lat,lng)
    }

    const handleGeoError= ()=>console.error("error")

    const handleDragEnd = ()=>{
        const newCenter = map.getCenter();
        setState({lat:newCenter.lat(), lng:newCenter.lng()})
    }

    return (
        <FindAddressPresenter mapRef={mapRef}/>
    )
}

export default FindAddressContainer