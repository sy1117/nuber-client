import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USER_PROFILE } from '../../sharedQueries.queries';
import { userProfile, userProfile_GetMyProfile, toggleDriving } from "../../types/api";
import { TOGGLE_DRIVING } from "./MenuQueries.queries";
import { toast } from "react-toastify";

const MenuContainer = ()=>{

    const { loading, error, data} = useQuery<userProfile>(USER_PROFILE);
    const [ toggleDrivingMutation ]  = useMutation<toggleDriving>(TOGGLE_DRIVING,{
        // refetchQueries:[{query:USER_PROFILE}]
        update(cache, {data} ){
            if(data){
                const {ToggleDrivingMode} =data;
                if(!ToggleDrivingMode.ok){
                    toast.error(ToggleDrivingMode.error)
                    return;
                }
                const query : userProfile | null = cache.readQuery<userProfile>({query:USER_PROFILE});
                if(query){
                    const { GetMyProfile : {user}} = query;
                    if(user){
                        user.isDriving = !user.isDriving
                    }
                }
                cache.writeQuery({query:USER_PROFILE, data:query})
            }
        }
    })
    return <MenuPresenter 
        data={data} 
        loading={loading}
        toggleDriving={toggleDrivingMutation}
        />
}

export default MenuContainer;