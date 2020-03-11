import React from 'react'
import Sidebar from "react-sidebar";
import styled from 'styled-components';
import Menu from '../../Components/Menu'
import AddressBar from '../../Components/AddressBar';
import Button from '../../Components/Button';
import Helmet from 'react-helmet';
import { userProfile } from '../../types/api';

const Container = styled.div`
`

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;


const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
    bottom:100px;
`

interface IProps {
    loading: boolean
    isMenuOpen : boolean,
    toggleMenu : ()=>void,
    mapRef: any,
    onInputChange: React.ChangeEventHandler,
    onAddressSubmit: React.MouseEventHandler<HTMLButtonElement>
    toAddress: string,
    price?:number,
    userData:userProfile | undefined
}

const HomePresenter: React.SFC<IProps> = 
    ({
        loading, isMenuOpen,toggleMenu, mapRef, onInputChange,toAddress,onAddressSubmit, price, 
        userData : { GetMyProfile : { user = null } = {}}={}
    })=>
<Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{ 
            sidebar: { 
                background: "white",
                width: "80%",
                zIndex: "10"
            }}}
        >
        {!loading &&<MenuButton onClick={() => toggleMenu()}>|||</MenuButton>}
        {user && !user.isDriving &&
            <>
                <AddressBar
                    onBlur={()=>{}}
                    onChange={onInputChange}
                    name={"toAddress"}
                    value={toAddress}
                    />        
                <ExtendedButton
                    onClick={onAddressSubmit}
                    disabled={toAddress === ""}
                    value={price?"Change Address":"Pick Address"}
                />
            </>
        }
        <Map ref={mapRef} />
        {price &&
            <RequestButton
                onClick={onAddressSubmit}
                disabled={toAddress === ""}
                value={`Request Ride (${price})`}
            />
        }

    </Sidebar>
</Container>

export default HomePresenter