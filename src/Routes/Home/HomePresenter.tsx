import React from 'react'
import Sidebar from "react-sidebar";
import styled from 'styled-components';
import Menu from '../../Components/Menu'
import AddressBar from '../../Components/AddressBar';

const Container = styled.div`
`

const Button = styled.button`
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

interface IProps {
    loading: boolean
    isMenuOpen : boolean,
    toggleMenu : ()=>void,
    mapRef: any,
    onInputChange: React.ChangeEventHandler,
    onAddressSubmit: React.MouseEventHandler<HTMLButtonElement>
    toAddress: string,
}

const HomePresenter: React.SFC<IProps> = ({loading, isMenuOpen,toggleMenu, mapRef, onInputChange,toAddress,onAddressSubmit})=>
<Container>
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
        {!loading &&
            <Button onClick={() => toggleMenu()}>
            |||
            </Button>
        }
        <AddressBar
            onBlur={()=>{}}
            onChange={onInputChange}
            name={"toAddress"}
            value={toAddress}
            />
        <Map ref={mapRef} />
        <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={"Pick Address"}
        />
    </Sidebar>
</Container>

export default HomePresenter