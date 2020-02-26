import React from 'react'

interface IProps{
    isLoggedIn : boolean
}

const AppPresenter : React.SFC<IProps>= ({isLoggedIn})=>{
    return <div>
        {isLoggedIn ? "you are in" : "you are out"}
    </div>
}

export default AppPresenter