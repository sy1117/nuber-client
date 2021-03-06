import { gql } from "apollo-boost";

export const REPORT_LOCATION = gql`
    mutation reportMovement($lat:Float, $lng:Float){
        ReportMovement(
            lastLat :$lat
            lastLng :$lng
        ){
            ok
            error
        }
    }
`

export const GET_NEARBY_DRIVERS = gql`
    query getDrivers {
        GetNearByDrivers {
            ok
            error
            drivers{
                id
                lastLat
                lastLng
            }
        }
    }
`