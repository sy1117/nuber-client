import React, { useState, useRef, useEffect } from 'react'
import HomePresenter from './HomePresenter';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { userProfile } from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import { geoCode } from '../../mapHelpers';
import { MAPS_KEY } from '../../keys';
import { toast } from 'react-toastify';
import { stat } from 'fs';
import { REPORT_LOCATION } from './HomeQueries.queries';
import { reportMovement } from '../../types/api'

interface IState { 
    isMenuOpen: boolean,
    lat : number,
    lng: number,
    toAddress: string,
    toLat:number,
    toLng:number,
    distance?: string,
    duration?: string, 
    price:number
}

interface IProps {

}

let map:google.maps.Map, userMarker:google.maps.Marker, toMarker:google.maps.Marker, directions:google.maps.DirectionsRenderer;

const HomeContainer : React.FunctionComponent<any>= ({google})=>{

    const { loading, error } = useQuery<userProfile>(USER_PROFILE);
    const [state, setState] = useState<IState>({
        isMenuOpen:false,
        lat:0,
        lng:0,
        toAddress:'',
        toLat:0,
        toLng:0,
        distance:'',
        duration:'',
        price:0
    })
    const {isMenuOpen, lat,lng, toAddress, toLat, toLng, price} = state;

    const [reportLocationMutation] = useMutation<reportMovement>(REPORT_LOCATION)

    const toggleMenu = ()=>setState({
        ...state,
        isMenuOpen:!isMenuOpen
    });

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
            zoom : 11,
            // minZoom : 8,
            center : { lat, lng },
            disableDefaultUI : false
        }
        map  = new google.maps.Map(mapNode, mapConfig)
        console.log(map)
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
        map.panTo({lat:latitude, lng:longitude});
        reportLocationMutation({
            variables : {lat: latitude, lng:longitude }
        })

    }
    const handleGeoWatchError = ()=>{
        console.log("watch error")
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        setState({
            ...state,
          [name]: value
        } as any);
    };

    const onAddressSubmit = async ()=>{
        const result = await geoCode(toAddress);
        if(result !== false){
            const {lat:toLat, lng:toLng, formatted_address:toAddress} = result;
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
                /**
                 * bound
                 */
                const bounds = new google.maps.LatLngBounds();
                bounds.extend({lat:toLat, lng:toLng});
                bounds.extend({lat:lat, lng});
                map.fitBounds(bounds);

                setState({
                    ...state,
                    toLat, toLng, toAddress
                })
                createPath(toLat, toLng);
            }
        } 
    }

    const createPath = (toLat:number, toLng:number)=>{
        if(directions){
            directions.setMap(null);
        }

        const renderOptions :google.maps.DirectionsRendererOptions = {
            polylineOptions : {
                strokeColor:"#000"
            },
            suppressMarkers:true
        }
        directions = new google.maps.DirectionsRenderer(renderOptions);
        const directionService:google.maps.DirectionsService = new google.maps.DirectionsService();
        const to:google.maps.LatLng = new google.maps.LatLng(toLat.toString(), toLng.toString());
        const from = new google.maps.LatLng(state.lat.toString(), state.lng.toString());
        const directionsOptions : google.maps.DirectionsRequest = {
            destination:to,
            origin:from,
            travelMode: google.maps.TravelMode.DRIVING,
        }
        directionService.route(directionsOptions, handleRouteRequest);

    }

    const handleRouteRequest = (result:google.maps.DirectionsResult,status:google.maps.DirectionsStatus)=>{
        if(status === "OK"){
            const { routes } = result;
            const { 
                distance : {text:distance },
                duration : {text:duration}
            } = routes[0].legs[0]
            directions.setDirections(result);
            directions.setMap(map);
            setPrice(duration)
        }else{
            toast.error("There is no route there, you have to swim.")
        }
    }

    const setPrice = (duration:string)=>{
        let price:number = parseFloat(duration) * 3
        setState({
            ...state,
            price
        })
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
            price={price}
        />
    )
}

export default HomeContainer