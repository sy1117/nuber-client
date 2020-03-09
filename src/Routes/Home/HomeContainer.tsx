import React, { useState, useRef, useEffect } from 'react'
import HomePresenter from './HomePresenter';
import { useQuery } from '@apollo/react-hooks';
import { userProfile } from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import { geoCode } from '../../mapHelpers';

interface IState { 
    isMenuOpen: boolean,
    lat : number,
    lng: number,
    toAddress: string,
    toLat:number,
    toLng:number,
}

interface IProps {

}

const HomeContainer : React.FunctionComponent<any>= ({google})=>{

    const { loading, error } = useQuery<userProfile>(USER_PROFILE);
    const [state, setState] = useState<IState>({
        isMenuOpen:false,
        lat:0,
        lng:0,
        toAddress:'',
        toLat:0,
        toLng:0,
    })
    const {isMenuOpen, lat,lng, toAddress} = state;

    const toggleMenu = ()=>setState({
        ...state,
        isMenuOpen:!isMenuOpen
    });

    let map:google.maps.Map, userMarker:google.maps.Marker, toMarker:google.maps.Marker;
    const mapRef = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError); 
    }, [])

    const handleGeoSucces = (positon: Position) => {
        const {
          coords: { latitude, longitude }
        } = positon;
        setState({
            ...state,
            lat: latitude,
            lng: longitude
        });
        loadMap(latitude, longitude);
    };

    const handleGeoError = ()=>console.log("error");

    const loadMap = (lat:number, lng:number)=>{

        /**
         * map 
         */
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

        /**
         * marker
         */
        const userMarkerOptions : google.maps.MarkerOptions = {
            position : { lat, lng },
            icon : {
                path: google.maps.SymbolPath.CIRCLE,
                scale:7,
            }
        }
        userMarker = new google.maps.Marker(userMarkerOptions)
        userMarker.setMap(map);

        /**
         * watch
         */
        const watchOptions : PositionOptions = {
            enableHighAccuracy:true,
        }
        navigator.geolocation.watchPosition(handleGeoWatchSuccess, handleGeoWatchError)
    }

    const handleGeoWatchSuccess = (position: Position)=>{
        const { coords : { latitude, longitude}} = position;
        userMarker.setPosition({lat:latitude, lng:longitude})
    }
    const handleGeoWatchError = ()=>{
        console.log("watch error")
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        setState({
          [name]: value
        } as any);
    };

    const onAddressSubmit = async ()=>{
        const result = await geoCode(toAddress);
        if(result !== false){
            const {lat:toLat, lng:toLng, formatted_address:toAddress} = result;
            setState({
                ...state,
                toLat, toLng, toAddress
            })
            if(toMarker){
                toMarker.setMap(null);
            }else{
                /**
                 * marker
                 */
                const toMarkerOptions : google.maps.MarkerOptions = {
                    position : { lat, lng },
                    icon : {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale:7,
                    }
                }
                toMarker = new google.maps.Marker(toMarkerOptions)
                toMarker.setMap(map);
            }
        } 
    }

    return (
        <HomePresenter 
            loading={loading}
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu}
            onInputChange={onInputChange}
            onAddressSubmit={onAddressSubmit}
            mapRef={mapRef}
            toAddress={toAddress}
        />
    )
}

export default HomeContainer