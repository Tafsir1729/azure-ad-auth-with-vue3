import { type AccountInfo, PublicClientApplication } from '@azure/msal-browser'
import { reactive } from 'vue'

export const msalConfig = {
  auth: {
    clientId: 'c7e598e1-ecab-450a-b73d-12c6f2d172a5',
    authority:
      'https://login.microsoftonline.com/0ed11b7c-74bd-478f-8a21-38a7f2e78a5e',
    redirectUri: 'http://localhost:8080/',
    postLogoutUri: 'http://localhost:8080/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const graphScopes = {
  scopes: ['api://c7e598e1-ecab-450a-b73d-12c6f2d172a5/access_as_user'],
}
export const state = reactive({
  isAuthenticated: false,
  user: null as AccountInfo | null,
})
export const msalObj = new PublicClientApplication(msalConfig)
