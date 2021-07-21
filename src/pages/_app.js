import HomeLayout from 'layouts/HomeLayout'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <HomeLayout>
      <Component {...pageProps} />
    </HomeLayout>
  )
}

export default MyApp
