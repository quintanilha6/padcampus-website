import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import $ from 'jquery';
import {findDOMNode } from 'react-dom'

const navigationmenu = [
  {
      id: 1,
      linkText: 'Leirifisio',
      link: '/',
      child: false
  },
  {
    
    id: 2,
    linkText: 'Sobre nós',
    child: false,
    link: '/about',
  },
  {
    id: 3,
    linkText: 'Parcerias',
    child: false,
    link: '/partnerships',
    
  },
  {
    id: 4,
    link: '/contact',
    linkText: 'Contacto',
    child: false,
  }
]

class Header extends Component {

constructor(props) {
  super(props);
  this.state = {
     redText: false
  };
  this.addClass = this.addClass.bind(this);
  this.removeClass = this.removeClass.bind(this);
  this.removeAll = this.removeAll.bind(this);
}
addClass() {
  this.setState({
    redText:true
  });
}

removeClass() {
  this.setState({
    redText:false
  });
}
removeAll() {
  this.setState({
    redText:false
  });
}
componentDidMount() {
  window.addEventListener('resize', () => {
      this.setState({
          isMobile: window.innerWidth < 1020
      });
  }, false);
  window.addEventListener('load', () => {
    this.setState({
        isMobile: window.innerWidth < 1020
    });
  }, false);

    window.addEventListener('scroll', () => {
      this.setState({
          isTop: window.scrollY > 150
      });
  }, false);
}
navToggle = () => {
  const nv = findDOMNode(this.refs.navmenu);
  const nvb = findDOMNode(this.refs.navbtn);
  $(nv).toggleClass('menu-on');
  $(nvb).toggleClass('active');
}
removenavToggle = () => {
  const nv = findDOMNode(this.refs.navmenu);
  const nvb = findDOMNode(this.refs.navbtn);
  $(nv).removeClass('menu-on');
  $(nvb).removeClass('active');
}

getNextSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.nextElementSibling;

	// If there's no selector, return the first sibling
	if (!selector) return sibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}

}

triggerChild = (e) => {
  let subMenu = '';

  subMenu = ( this.getNextSibling(e.target, '.submenu') !== undefined ) ? this.getNextSibling(e.target, '.submenu') : null;

  if(subMenu !== null && subMenu !== undefined && subMenu !== ''){
    subMenu.classList = subMenu.classList.contains('open') ? 'submenu' : 'submenu open';
  }
}

  render() {
    const className = this.state.isMobile ? 'breakpoint-on' : '';
    const classNamess = this.state.isMobile ? 'd-none' : '';
    const classNamesss = this.state.isTop ? 'sticky-active' : '';
    return (
      <div>
        {/*====== HEADER START ======*/}
        <header className={`header-absolute sticky-header ${classNamesss}`}>
          <div className="container container-custom-one">
            <div className={`nav-container d-flex align-items-center justify-content-between ${className}`}>
              {/* Main Menu */}
              <div className="nav-menu d-lg-flex align-items-center" ref="navmenu">
                {/* Navbar Close Icon */}
                <div className="navbar-close" onClick={this.removenavToggle}>
                  <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                </div>
                {/* Off canvas Menu  */}

                <div className="toggle" onClick={this.addClass}>
                  <Link to="#" id="offCanvasBtn"><i className="fal fa-bars" /></Link>
                </div>
                {/* Mneu Items */}
                <div className="menu-items">

                  <ul>
                  {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                      <li key={i} className={` ${item.child ? 'menu-item-has-children' : ''} `} onClick={this.triggerChild}>
                      {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link> }
                          {item.child ?
                              <ul className="submenu" role="menu">
                                  {item.submenu.map((sub_item, i) => (
                                      <li key={i} className={`${sub_item.child ? 'menu-item-has-child' : ''} `}>
                                      {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link> }
                                          {sub_item.third_menu ?
                                              <ul className="submenu">
                                                  {sub_item.third_menu.map((third_item, i) => (
                                                      <li key={i}><Link
                                                          to={third_item.link}>{third_item.linkText}</Link>
                                                      </li>
                                                  ))}
                                              </ul> : null}
                                      </li>
                                  ))}
                              </ul>
                              : null
                          }
                      </li>
                  )) : null}
                  </ul>

                </div>
                {/* from pushed-item */}
                <div className="nav-pushed-item" />
              </div>
              {/* Site Logo */}
              <div className="site-logo">
                <Link to="/"><img src="assets/img/leirifisio/logo-sem-texto-lado.png" alt="" /></Link>
              </div>
              {/* Header Info Pussed To Menu Wrap */}
              <div className={`nav-push-item ${classNamess}`}>
                {/* Header Info */}
                <div className="header-info d-lg-flex align-items-center">
                  <div className="item">
                    <i className="fas fa-phone" />
                    <span>Telefone</span>
                    <a href="tel:244 838 574">
                      <h5 className="title">244 838 574</h5>
                    </a>
                  </div>
                  <div className="item">
                    <i className="fas fa-envelope" />
                    <span>E-mail</span>
                    <a href="mailto:leirifisio@gmail.com">
                      <h5 className="title">leirifisio@gmail.com</h5>
                    </a>
                  </div>
                </div>
              </div>
              {/* Navbar Toggler */}
              <div className="navbar-toggler" onClick={this.navToggle}  ref="navbtn">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </header>
        {/*====== HEADER PART END ======*/}
        {/*====== OFF CANVAS START ======*/}
        <div className={classNames("offcanvas-wrapper", {"show-offcanvas":this.state.redText})}>
          <div className={classNames("offcanvas-overly", {"show-overly":this.state.redText})}  onClick={this.removeAll}/>
          <div className="offcanvas-widget">
            <Link to="#" className="offcanvas-close" onClick={this.removeClass}><i className="fal fa-times" /></Link>
            {/* About Widget */}
            <div className="widget about-widget">
              <h5 className="widget-title">Sobre nós</h5>
              <p>
                A Leirifisio é um centro de Fisioterapia e Movimento privado fundado em 2002. Atualmente gerido 
                por Manuela Silva, Licenciada em Fisioterapia, a Leirifisio está situada no centro de Leiria, 
                junto ao Seminário Diocesano de Leiria. Venha conhecer-nos.
              </p>
            </div>
            {/* Nav Widget */}
            <div className="widget nav-widget">
              <h5 className="widget-title">Páginas</h5>
              <ul>
                <li><Link to="/">Leirifisio</Link></li>
                <li><Link to="/about">Sobre nós</Link></li>
                <li><Link to="/partnerships">Parcerias</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
              </ul>
            </div>
            {/* Social Link */}
            <div className="widget social-link">
              <h5 className="widget-title">Contacte-nos</h5>
              <ul>
                <li><a target="_blank" href="https://www.facebook.com/leirifisio/"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="mailto:leirifisio@gmail.com"><i className="fab fa-google" /></a></li>
                
              </ul>
            </div>
          </div>
        </div>
        {/*====== OFF CANVAS END ======*/}
      </div>
    );
  }
}

export default Header;
