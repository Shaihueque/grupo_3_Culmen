import Header from '../header/Header.jsx'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import styles from './LayoutStyle.module.css'

const Layout = () => {
  return (
    <div style={{backgroundColor: 'white'}} className={styles.fondo}>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout