import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "styled-components";
import Form from "../../Components/Form";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  onSubmit : React.FormEventHandler,
  loading:boolean,
  onChange:React.ChangeEventHandler,
  verificationKey:string,
}


const VerifyPhonePresenter : React.SFC<IProps> = ({verificationKey, onSubmit,onChange,loading}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm onSubmit={onSubmit} className={""}>
      <ExtendedInput
        value={verificationKey}
        name={"key"}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
      />
      <Button 
        onClick={onSubmit} 
        value={loading?"Verifying": "Submit"}
        disabled={loading}/>
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;