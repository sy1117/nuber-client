import React from 'react'
import { graphql } from 'react-apollo'
import { IS_LOGGED_IN } from './AppQueries'
import AppPresenter from './AppPresenter'
import reset from 'styled-reset'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import GlobalStyle from '../../global-styles'


const AppContainer = ({data}:any)=>

<ThemeProvider theme={theme}>
    <GlobalStyle/>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn}/>
</ThemeProvider>

export default graphql(IS_LOGGED_IN)(AppContainer)