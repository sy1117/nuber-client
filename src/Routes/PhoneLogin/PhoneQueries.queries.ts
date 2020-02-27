import gql from "graphql-tag";

export const PHONE_SIGN_IN = gql`
    mutation startPhoneVerification($phoneNumber: String!){
        StartPhoneVerification(phoneNumber : $phoneNumber){
            ok
            error
        }
    }
`