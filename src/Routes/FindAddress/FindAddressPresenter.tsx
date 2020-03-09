import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import AddressBar from '../../Components/AddressBar'

const Map = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
`

const Center = styled.div`
    position: absolute;
    height:40px;
    width:40px;
    z-index:2;
    font-size:30px;
    margin:auto;
    top:0;
    left:0;
    right:0;
    bottom:0;
`

interface IProps{
    mapRef:any,
    onInputBlur:()=>void,
    onInputChange:React.ChangeEventHandler<HTMLInputElement>,
    address:string
}

const FindAddressPresenter: React.SFC<IProps> = ({mapRef,onInputBlur,onInputChange,address})=>{
    return(
        <div>
            <Helmet>Find Address | Nuber</Helmet>
            <AddressBar
                onBlur={onInputBlur}
                onChange={onInputChange}
                name={"address"}
                value={address}
                />
            <Map ref={mapRef}/>
            <Center><span role="img">📍</span></Center>
        </div>
    )
}

export default FindAddressPresenter
