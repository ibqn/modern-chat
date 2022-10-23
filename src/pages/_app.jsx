import { Amplify } from 'aws-amplify'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import config from '../aws-exports'
import '@aws-amplify/ui-react/styles.css'

import 'styles/globals.css'
import { Navbar } from 'components/navbar'

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }) {
  return (
    <AmplifyProvider>
      <Navbar />
      <Component {...pageProps} />
    </AmplifyProvider>
  )
}

export default MyApp
