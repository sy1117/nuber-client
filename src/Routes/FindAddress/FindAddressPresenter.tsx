import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

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
    mapRef:any
}

const FindAddressPresenter: React.SFC<IProps> = ({mapRef})=>{
    return(
        <div>
            <Helmet>Find Address | Nuber</Helmet>
            <Map ref={mapRef}/>
            <Center><span role="img">📍</span></Center>
        </div>
    )
}

export default FindAddressPresenter
