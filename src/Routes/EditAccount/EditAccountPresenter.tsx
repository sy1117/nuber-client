import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "styled-components";
import PhotoInput from "../../Components/PhotoInput";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    onSubmit: () => void
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    uploading:boolean
    onChange:()=>void
}

const EditAccountPresenter: React.SFC<IProps> = ({
    firstName,
    lastName,
    email,
    onSubmit,
    profilePhoto,
    onInputChange,
    loading,
    uploading,
}) => (
        <Container>
            <Helmet>
                <title>Edit Account | Number</title>
            </Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
            <ExtendedForm onSubmit={onSubmit}>
                <PhotoInput 
                    onChange={onInputChange}
                    uploading={uploading} 
                    fileUrl={profilePhoto}/>
                <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    name={"firstName"}
                    value={firstName}
                    placeholder={"First name"}
                />
                <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    name={"lastName"}
                    value={lastName}
                    placeholder={"Last name"}
                />
                <ExtendedInput
                    onChange={onInputChange}
                    type={"email"}
                    name={"email"}
                    value={email}
                    placeholder={"Email"}
                />
                <Button onClick={onSubmit} value={loading ? "Loading" : "Update"} />
            </ExtendedForm>
        </Container>
    );

export default EditAccountPresenter;