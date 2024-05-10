import React, { useEffect, useRef, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import "./header.css"
import { AuthContext } from '../../context/AuthContext'
// import DashBoard from '../Dashboard/Dashboard'

const nav__links = [
   {
      path: '/home',
      display: 'Home'
   },
   {
      path: '/about',
      display: 'About'
   },
   {
      path: '/tours',
      display: 'Tours'
   },
   {
      path:'/dashboard',
      display : 'DashBoard'
   }
];
const Header = () => {
   let nav_links = [];
   const headerRef = useRef(null)
   const menuRef = useRef(null)
   const navigate = useNavigate()
   const { user, dispatch } = useContext(AuthContext)
   
   const logout = () => {
      localStorage.clear();
      dispatch({ type: 'LOGOUT' })
      navigate('/')
   }

   const isAdminLoggedIn = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if(userData){
      return userData.username === 'admin';
   }
   };

   const stickyHeaderFunc = () => {
      window.addEventListener('scroll', () => {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header')
         } else {
            headerRef.current.classList.remove('sticky__header')
         }
      })
   }

   useEffect(() => {
      stickyHeaderFunc()
      return window.removeEventListener('scroll', stickyHeaderFunc)
   })

   const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

   return (
      <header className='header' ref={headerRef}>
         <Container>
            <Row>
               <div className="nav__wrapper d-flex align-items-center justify-content-between">
                  {/* ========== LOGO ========== */}
                  <div className="logo">
                     <img src={Logo} alt="" />
                  </div>
                  {/* ========== MENU ========== */}
                  
                  <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                     
                     <ul className="menu d-flex align-items-center gap-5">
                     
                     {(localStorage.getItem('user')!=='undefined')? 
                  nav__links.map((item, index) => (
                    (item.display == 'DashBoard' && !isAdminLoggedIn()) ? null : (
                      <li className="nav__item" key={index}>  
                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                      </li>
                    )
                  ))
                :navigate('/register')}
              </ul>
            </div>
                  {/* ================================ */}

                  <div className="nav__right d-flex align-items-center gap-4">
                     <div className="nav__btns d-flex align-items-center gap-2">
                        {
                           user ? <> <h5 className='mb-0'>{user.username}</h5>
                                 <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                              </> : <>
                                 <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                                 <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                              </>
                        }
                        {/* <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                        <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button> */}
                     </div>

                     <span className="mobile__menu" onClick={toggleMenu}>
                        <i class="ri-menu-line"></i>
                     </span>
                  </div>
               </div>
            </Row>
         </Container>
      </header>
   )
}

export default Header