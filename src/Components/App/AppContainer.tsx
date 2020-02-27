import React from 'react'
import { graphql } from 'react-apollo'
import { IS_LOGGED_IN } from './AppQueries'
import AppPresenter from './AppPresenter'
import reset from 'styled-reset'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import GlobalStyle from '../../global-styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const AppContainer = ({data}:any)=>
<React.Fragment>
    <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn}/>
        <ToastContainer draggable={true} position={"bottom-center"} />
    </ThemeProvider>
</React.Fragment>

export default graphql(IS_LOGGED_IN)(AppContainer)