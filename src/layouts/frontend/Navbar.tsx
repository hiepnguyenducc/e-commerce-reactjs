import axios from "axios";
import swal from "sweetalert";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './css/bootstrap.css';
import './css/fontawesome.css';
import './css/style.css';
import './css/plugins.css';
import './css/color.css';
import './css/responsive.css';
import './css/style.css';

import logo from '../../../public/h.jpg';

function Navbar() {
  const history = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal('Success', res.data.message, 'success');
        history('/');
      }
      else {
        swal('Error', res.data.message, 'error');
      }
    });
  }
  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <RouterLink className="nav-link" to="/login" >
            Login
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/register">
            Register
          </RouterLink>
        </li>
      </ul>
    )
  } else {
    AuthButtons = (

      <li className="nav-item">
        <button type="button" className="nav-link btn btn-danger btn-sm text-white" onClick={logoutSubmit}>Logout</button>
      </li>

    )
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary shadow stick-top navbar-dark">
        <div className="container">
          <RouterLink className="navbar-brand" to="">
            Navbar
          </RouterLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/">
                  Home
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/about">
                  About
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/contact">
                  Contact
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link" to="#">
                  Collection
                </RouterLink>
              </li>
              {AuthButtons}

            </ul>
          </div>
        </div>
      </nav>
      
      <div id="pageWrapper">
      <header id="header" className="position-relative">
		
			<div className="headerHolderCol pt-lg-4 pb-lg-5 py-3">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-4">
							<a href="javascript:void(0);" className="tel d-flex align-items-end"><i className="icon-call mr-2"></i>  Hotline: (602) 462 8889</a>
						</div>
						<div className="col-12 col-sm-4 text-center">
							<span className="txt d-block">Wellcome To Botanical Store</span>
						</div>
						<div className="col-12 col-sm-4">
							
							<ul className="nav nav-tabs langListII justify-content-end border-bottom-0">
								<li className="dropdown">
									<span>Currency: </span>
									<a className="d-inline dropdown-toggle text-uppercase" data-toggle="dropdown" href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false">USD</a>
									<div className="dropdown-menu text-uppercase pl-4 pr-4 border-0">
										<a className="dropdown-item" href="javascript:void(0);">USD</a>
										<a className="dropdown-item" href="javascript:void(0);">VND</a>
										<a className="dropdown-item" href="javascript:void(0);">euro</a>
									</div>
								</li>
								<li className="dropdown m-0">
									<span>Languages: </span>
									<a className="d-inline dropdown-toggle text-uppercase" data-toggle="dropdown" href="javascript:void(0);" role="button" aria-haspopup="true" aria-expanded="false">EN</a>
									<div className="dropdown-menu pl-4 pr-4">
										<a className="dropdown-item" href="javascript:void(0);">English</a>
										<a className="dropdown-item" href="javascript:void(0);">Vietnamese</a>
										<a className="dropdown-item" href="javascript:void(0);">French</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		
			<div className="headerHolder container pt-lg-5 pb-lg-7 py-4">
				<div className="row">
					<div className="col-6 col-sm-2">
					
						<div className="logo">
							<a href="home.html"><img src={logo} style={{width:'125px', height:'58px'}} alt="Botanical" className="img-fluid"/></a>
						</div>
					</div>
					<div className="col-6 col-sm-7 col-lg-8 static-block">
						
						<div className="mainHolder pt-lg-5 pt-3 justify-content-center">
					
							<nav className="navbar navbar-expand-lg navbar-light p-0 pageNav2 position-static">
								<button type="button" className="navbar-toggle collapsed position-relative" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarNav">
									<ul className="navbar-nav mx-auto text-uppercase d-inline-block">
										<li className="nav-item active dropdown">
											<a className="dropdown-toggle d-block" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">home</a>
											<ul className="list-unstyled text-capitalize dropdown-menu mt-0 py-0">
												<li className="d-block mx-0"><a href="home.html">Home 1</a></li>
												<li className="d-block mx-0"><a href="home2.html">Home 2</a></li>
												<li className="d-block mx-0"><a href="home3.html">Home 3</a></li>
											</ul>
										</li>
										<li className="nav-item dropdown">
											<a className="dropdown-toggle d-block" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Store</a>
											<ul className="list-unstyled text-capitalize dropdown-menu mt-0 py-0">
												<li className="d-block mx-0"><a href="shop.html">Shop Left Sidebar</a></li>
												<li className="d-block mx-0"><a href="shop-detail.html">Single Product</a></li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="d-block" href="about-us.html">About</a>
										</li>
										<li className="nav-item dropdown">
											<a className="dropdown-toggle d-block" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Blog</a>
											<ul className="list-unstyled text-capitalize dropdown-menu mt-0 py-0">
												<li className="d-block mx-0"><a href="blog.html">Blog Left Sidebar</a></li>
												<li className="d-block mx-0"><a href="blog-detail.html">Blog Detail</a></li>
											</ul>
										</li>
										<li className="nav-item dropdown">
											<a className="dropdown-toggle d-block" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
											<ul className="list-unstyled text-capitalize dropdown-menu mt-0 py-0">
												<li className="d-block mx-0"><a href="cart-page.html">Cart Page</a></li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="d-block" href="contact-us.html">contact</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
					<div className="col-sm-3 col-lg-2">
						
						<ul className="nav nav-tabs wishListII pt-5 justify-content-end border-bottom-0">
							<li className="nav-item ml-0"><a className="nav-link icon-search" href="javascript:void(0);"></a></li>
							<li className="nav-item"><a className="nav-link position-relative icon-cart" href="javascript:void(0);"><span className="num rounded d-block">2</span></a></li>
							<li className="nav-item"><a className="nav-link icon-profile" href="javascript:void(0);"></a></li>
						</ul>
					</div>
				</div>
			</div>
		</header>
      </div>
     
      
    </>
  );
}

export default Navbar;
