import { HeaderContainer , Li, LogoImage, Ul } from './Header'
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../../public/Logo_Transparente.png'



const Header = () => {
  return (
    <HeaderContainer>
      <picture><LogoImage src={logo} alt="" /></picture>
      <nav>
        <Ul>
          <Li><Link className={styles.link} to='/' >Total Panels</Link></Li>
          <Li><Link className={styles.link} to='/detailLastProduct' >Detail Last Product</Link></Li>
          <Li> <Link className={styles.link} to='/panelCategories' >Panel Categories</Link></Li>
          <Li><Link className={styles.link} to='/productList' >Product List</Link></Li>
        </Ul>
      </nav>
    </HeaderContainer>

  )
}

export default Header