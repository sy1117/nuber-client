import React, { useRef, useEffect, useState } from 'react'
import FindAddressPresenter from "./FindAddressPresenter"
import { RouteComponentProps } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { reverseGeoCode, geoCode } from '../../mapHelpers';

interface IState{
    lat : number ;
    lng : number;
    address :string;
}


const FindAddressContainer : React.FunctionComponent<any> = ({google})=>{

    const [state, setState] = useState<IState>({
        lat:0,
        lng:0,
        address:''
    });
    const {lat, lng, address} = state;
    const mapRef = useRef(null);
    let map : google.maps.Map;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    }, [])

    const loadMap = (lat:number, lng:number)=>{
        const mapNode = ReactDOM.findDOMNode(mapRef.current);
        const mapConfig : google.maps.MapOptions = {
            zoom:11,
            minZoom:8,
            center:{
                lat,
                lng,
            },
            disableDefaultUI: false
        }
        map  = new google.maps.Map(mapNode, mapConfig)
        map.addListener('dragend', handleDragEnd)
    }

    const handleGeoSuccess:PositionCallback = (position: Position)=>{
        const { coords  : {latitude,longitude}} = position;
        setState({...state, lat:latitude, lng:longitude})
        loadMap(latitude,longitude)
    }

    const handleGeoError :PositionErrorCallback= ()=>console.error("error")

    const handleDragEnd =  async ()=>{
        const newCenter = map.getCenter();
        const lat = newCenter.lat(), lng = newCenter.lng();
        geoCodeAddress(lat,lng);
        setState({lat, lng, address})
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        setState({
            ...state,
            [name]: value
        } as any);
    }

    const onInputBlur = async () => {
        const coords:any = await geoCode(address);
        if(!coords){
            let { lat, lng, formatted_address:address} = coords;
            setState({lat,lng, address})
            map.panTo({lat, lng})
        }
    };

    const geoCodeAddress = async(lat:number,lng:number)=>{
        const address = await reverseGeoCode(lat, lng) ;
        setState({...state, address})
    }

    return (
        <FindAddressPresenter 
            mapRef={mapRef}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            address={address}
            />
    )
}

export default FindAddressContainer