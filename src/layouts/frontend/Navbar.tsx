import axios from "axios";
import swal from "sweetalert";
import {Link,  useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../assests/frontend/css/style.css'
import './css/style.css';
import { debounce } from 'lodash';
import {useEffect, useState} from "react";
import { notification } from "antd";

function Navbar() {

  const [collection, setCollection] = useState([]);
  const [category, setCategory] = useState([]);
  const [hoveredCollection, setHoveredCollection] = useState(null);
  const history = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [cart, setCart] = useState([]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.get(`api/delete-cart/${id}`);
      if (res.data.status === 200) {
        notification.success({
          message: 'Success',
          description: res.data.message,
          placement:'bottomRight'
        });
        setCart(cart.filter(item => item.product.id !== id));
      } else if (res.data.status === 404) {
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement:'bottomRight'
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: "There was an error deleting the product",
        placement:'bottomRight'
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const name = localStorage.getItem('auth_name');
    if (token) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);
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
  const { id } = useParams();
  const fetchCollection = () => {
    axios.get('api/getCollection').then(res => {
      if (res.data.status === 200) {
        setCollection(res.data.collection);
      }
    }).catch(error => {
      console.error('Error fetching collections:', error);
    });
  };

  const handleMouseEnter = (id) => {
    setHoveredCollection(id);
    fetchCategoryByCollectionId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCollection(null);
  };
  const fetchCategoryByCollectionId = (collectionId) => {
    axios.get(`api/getCategoryByCollection/${collectionId}`).then(res => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      }
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });
  };
  console.log(category)

  useEffect(() => {
    fetchCollection();
    axios.get(`api/show-cart`).then(res=>{
      if(res.data.status===200){
        setCart(res.data.cart)
      }
    })
  }, []);


  useEffect(() => {
    if (id) {
      fetchCategoryByCollectionId(id);
    }
  }, [id]);

  var AuthButtons = '';

  let grandTotal = 0
  let totalItem = cart.length
  const [search, setSearch] = useState();
  const [product, setProduct] = useState([]);
  const {name}= useParams();
  const handleSearch = debounce(async (e) => {
    const query = e.target.value;
    setSearch(query);
    console.log(query)
    if (query) {
      axios.get(`api/search/${query}`).then(res => {
        if (res.data.status === 200) {
          setProduct(res.data.products);
        } else if (res.data.status === 404) {
          setProduct([]);
          notification.error({
            message: "Error",
            description: res.data.message,
            placement: 'bottomRight'
          });
        }
      }).catch(err => {
        console.error(err);
      });
    } else {
      setProduct([]);
    }
  }, 300);

  return (
    <>


      <div id="pageWrapper">
        <header className="version_1">
          <div className="layer"></div>

          <div className="main_header">
            <div className="container">
              <div className="row small-gutters">
                <div className="col-xl-3 col-lg-3 d-lg-flex align-items-center">
                  <div id="logo">
                    <Link to="/"><img src="h.jpg" alt="" width="100" height="35"/></Link>
                  </div>
                </div>
                <nav className="col-xl-6 col-lg-7">
                  <a className="open_close" href="javascript:void(0);">
                    <div className="hamburger hamburger--spin">
                      <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                      </div>
                    </div>
                  </a>

                  <div className="main-menu">
                    <div id="header_menu">
                      <Link to="/"><img src="img/logo_black.svg" alt="" width="100" height="35"/></Link>
                      <a href="#" className="open_close" id="close_in"><i className="ti-close"></i></a>
                    </div>
                    <ul>
                      <li className="">
                        <Link to="/" className="show-submenu">Home</Link>
                      </li>
                      <li className="megamenu ">
                        <Link to="#" className="show-submenu-mega">Pages</Link>


                      </li>
                      <li className="">
                        <Link to="/contact" className="show-submenu">Contact</Link>

                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li>
                        <a href="#0">Buy Template</a>
                      </li>
                    </ul>
                  </div>

                </nav>
                <div className="col-xl-3 col-lg-2 d-lg-flex align-items-center justify-content-end text-end">
                  <a className="phone_top" href="tel://0949985409"><strong><span>Need Help?</span>+84
                    949-985-409</strong></a>
                </div>
              </div>
            </div>
          </div>


          <div className="main_nav Sticky">
            <div className="container">
              <div className="row small-gutters">
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <nav className="categories">
                    <ul className="clearfix">
                      <li><span>
										<a href="#">
											<span className="hamburger hamburger--spin">
												<span className="hamburger-box">
													<span className="hamburger-inner"></span>
												</span>
											</span>
											Categories
										</a>
									</span>
                        <div id="menu">
                          <ul>
                            {collection.map((item) => {
                              return (
                                <li key={item.id} onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}>
                                  <span><Link to={`/collections/${item.id}`}>{item.name}</Link></span>
                                  <ul style={{display: hoveredCollection === item.id ? 'block' : 'none'}}>
                                    {category.map((catItem) => (
                                      <li key={catItem.id}>
                                        <Link to={`/category/${catItem.slug}`}>{catItem.name}</Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              )
                            })
                            }
                            <li><span><a href="#0">Collections</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">Trending</a></li>
                                <li><a href="listing-grid-2-full.html">Life style</a></li>
                                <li><a href="listing-grid-3.html">Running</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Training</a></li>
                                <li><a href="listing-grid-5-sidebar-right.html">View all Collections</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Men</a></span>
                              <ul>
                                <li><a href="listing-grid-6-sidebar-left.html">Offers</a></li>
                                <li><a href="listing-grid-7-sidebar-right.html">Shoes</a></li>
                                <li><a href="listing-row-1-sidebar-left.html">Clothing</a></li>
                                <li><a href="listing-row-3-sidebar-left.html">Accessories</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">Equipment</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Women</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">Best Sellers</a></li>
                                <li><a href="listing-grid-2-full.html">Clothing</a></li>
                                <li><a href="listing-grid-3.html">Accessories</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Shoes</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Boys</a></span>
                              <ul>
                                <li><a href="listing-grid-6-sidebar-left.html">Easy On Shoes</a></li>
                                <li><a href="listing-grid-7-sidebar-right.html">Clothing</a></li>
                                <li><a href="listing-row-3-sidebar-left.html">Must Have</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">All Boys</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Girls</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">New Releases</a></li>
                                <li><a href="listing-grid-2-full.html">Clothing</a></li>
                                <li><a href="listing-grid-3.html">Sale</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Best Sellers</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Customize</a></span>
                              <ul>
                                <li><a href="listing-row-1-sidebar-left.html">For Men</a></li>
                                <li><a href="listing-row-2-sidebar-right.html">For Women</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">For Boys</a></li>
                                <li><a href="listing-grid-1-full.html">For Girls</a></li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-xl-6 col-lg-7 col-md-6 d-none d-md-block">
                  <div className="custom-search-input">
                    <input type="text" placeholder="Search over 10.000 products"/>
                    <button type="submit"><i className="header-icon_search_custom"></i></button>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-md-3">

                  <ul className="top_tools">

                    <li>
                      <div className="dropdown dropdown-cart">
                        <Link to="/cart" className="cart_bt submenu"><strong>{totalItem}</strong></Link>
                        <div className="dropdown-menu show-submenu">
                          <ul>
                            {
                                cart.map((item) => {
                                    return (
                                      <>
                                        <li key={item.id}>
                                          <Link to={item.product.slug}>
                                            <figure><img src={`http://127.0.0.1:8001/${item.product.image}`}
                                                         data-src="img/products/shoes/thumb/1.jpg" alt="" width="50"
                                                         height="50"
                                                         className="lazy"/></figure>
                                            <strong><span>{item.product_qty}x {item.product.name}</span>${item.product.original_price}
                                            </strong>
                                          </Link>
                                          <Link to={"#"} onClick={() => handleDelete(item.id)} className="action"><i className="ti-trash"></i></Link>
                                        </li>
                                      </>
                                    )
                              })
                            }
                          </ul>
                          <div className="total_drop">
                            <div className="clearfix"><strong>Total</strong><span>${grandTotal.toFixed(2)}</span></div>
                            <Link to="/cart" className="btn_1 outline">View Cart</Link><a href="checkout.html"
                                                                                          className="btn_1">Checkout</a>
                          </div>
                        </div>
                      </div>

                    </li>
                    <li>
                      <Link to="/wishlist" className="wishlist"><span>Wishlist</span></Link>
                    </li>
                    <li>
                      <div className="dropdown dropdown-access">
                        <a href="account.html" className="access_link"><span>Account</span></a>
                        <div className="dropdown-menu">
                          {isAuthenticated ? (
                            <>
                              <Link to="/login" className="btn_1">{userName}</Link>
                              <ul>
                                <li>
                                  <a href="track-order.html"><i className="ti-truck"></i>Track your Order</a>
                                </li>
                                <li>
                                  <a href="account.html"><i className="ti-package"></i>My Orders</a>
                                </li>
                                <li>
                                  <a href="account.html"><i className="ti-user"></i>My Profile</a>
                                </li>
                                <li>
                                  <a href="help.html"><i className="ti-help-alt"></i>Help and Faq</a>
                                </li>
                                <li>
                                  <a href="help.html" onClick={logoutSubmit}><i className="ti-layout"></i>Logout</a>
                                </li>
                              </ul>
                            </>
                          ) : (
                            <>
                              <Link to="/login" className="btn_1">Sign In or Sign Up</Link>
                              <ul>
                                <li>
                                  <a href="track-order.html"><i className="ti-truck"></i>Track your Order</a>
                                </li>
                                <li>
                                  <a href="account.html"><i className="ti-package"></i>My Orders</a>
                                </li>
                                <li>
                                  <a href="account.html"><i className="ti-user"></i>My Profile</a>
                                </li>
                                <li>
                                  <a href="help.html"><i className="ti-help-alt"></i>Help and Faq</a>
                                </li>
                              </ul>
                            </>
                          )
                          }
                        </div>
                      </div>

                    </li>
                    <li>
                      <Link to="#" className="btn_search_mob"><span>Search</span></Link>

                    </li>
                    <li>
                      <a href="#menu" className="btn_cat_mob">
                        <div className="hamburger hamburger--spin" id="hamburger">
                          <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                          </div>
                        </div>
                        Categories
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="search_mob_wp search">
              <input type="text" className="form-control" placeholder="Search over 10.000 products" name="search" onChange={handleSearch} value={search}/>
              <input type="submit" className="btn_1 full-width" value="Search"/>
            </div>
            <div className="dropdown-content">
                {product.map((item, index) => (
                  <a key={index}>{item.name}</a>
                ))}
      </div>

          </div>

        </header>
      </div>


    </>
);
}

export default Navbar;
