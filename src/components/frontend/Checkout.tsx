import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../loading/loading.tsx";
import swal from "sweetalert";
import {notification} from "antd";
import Confirm from "./Confirm.tsx";
interface Cart {
  product_qty: number;
  product: {
    id: number;
    name: string;
  };
  total_price: number | string;
}
function Checkout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [cart, setCart] = useState<Cart[]>([]);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkoutInput, setCheckoutInput]= useState({
      name:'',
      last_name:'',
      email:'',
      city:'',
      full_address:'',
      telephone:'',
      postal_code:'',
    total_amount:'',

    });
    const handleInput=(e)=>{
      e.persist();
      setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
  }
  const submitOrder =(e)=>{
    const total_price = cart.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
      e.preventDefault();
      const data ={
        name:checkoutInput.name,
        last_name:checkoutInput.last_name,
        email:checkoutInput.email,
        city:checkoutInput.city,
        full_address:checkoutInput.full_address,
        telephone:checkoutInput.telephone,
        postal_code:checkoutInput.postal_code,
        total_amount:total_price,
      }
      axios.post(`api/place-order`,data).then(res=>{
        if(res.data.status===200){
          notification.success({
            message:"Success",
            description:res.data.message,
            placement:'bottomRight',
          })
          setError([]);
          setShowConfirm(true);
        }else if(res.data.status===422){
          notification.error({
            message:"Error",
            description:'All fields are mandetory',
            placement:'bottomRight',
          })
          setError(res.data.message);
        }
      })
  }
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const name = localStorage.getItem('auth_name');
        if (token) {
          setIsAuthenticated(true);
          setUserName(name);
        }
        axios.get(`api/show-cart`).then(res=>{
          if(res.data.status===200){
            setCart(res.data.cart);
            setLoading(false);
          }
        })
      }, []);
if (loading){
  return(
    <Loading></Loading>
  )
}
  const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.total_price as string), 0);
  const shipping = 7;
  const total = subtotal + shipping;
  const formattedTotal = total.toFixed(2);


    return (
        <>
            <div className="container margin_30">
              {showConfirm ?(
                <Confirm></Confirm>
              ):(
                <>
                  <div className="page_header">
                    <div className="breadcrumbs">
                      <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Category</a></li>
                        <li>Page active</li>
                      </ul>
                    </div>
                    <h1>Sign In or Create an Account</h1>

                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="step first">
                        {isAuthenticated ? (
                          <>
                            <h3>1. Billing address</h3>
                          </>
                        ) : (
                          <>
                            <h3>1. User Info and Billing address</h3>
                            <ul className="nav nav-tabs" id="tab_checkout" role="tablist">
                              <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#tab_1"
                                   role="tab"
                                   aria-controls="tab_1" aria-selected="true">Register</a>
                              </li>
                              <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#tab_2" role="tab"
                                   aria-controls="tab_2" aria-selected="false">Login</a>
                              </li>
                            </ul>
                          </>
                        )

                        }

                        <div className="tab-content checkout">
                          <div className="tab-pane fade show active" id="tab_1" role="tabpanel" aria-labelledby="tab_1">
                            {isAuthenticated ? (
                              <>

                              </>
                            ) : (
                              <>
                                <div className="form-group">
                                  <input type="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                  <input type="password" className="form-control" placeholder="Password"/>
                                </div>
                                <hr/>
                              </>
                            )

                            }

                            <div className="row no-gutters">
                              <div className="col-6 form-group pr-1">
                                <input type="text" name="name" className="form-control" placeholder="Name"
                                       onChange={handleInput} value={checkoutInput.name}/>
                              </div>
                              <div className="col-6 form-group pl-1">
                                <input type="text" name="last_name" className="form-control" placeholder="Last Name"
                                       onChange={handleInput} value={checkoutInput.last_name}/>
                                <small className="text-danger"></small>
                              </div>
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" name="email" placeholder="Email"
                                     onChange={handleInput} value={checkoutInput.email}/>
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" name="full_address" placeholder="Full Address"
                                     onChange={handleInput} value={checkoutInput.full_address}/>
                            </div>
                            <div className="row no-gutters">
                              <div className="col-6 form-group pr-1">
                                <input type="text" className="form-control" placeholder="City" name="city"
                                       onChange={handleInput} value={checkoutInput.city}/>
                              </div>
                              <div className="col-6 form-group pl-1">
                                <input type="text" className="form-control" placeholder="Postal code" name="postal_code"
                                       onChange={handleInput} value={checkoutInput.postal_code}/>
                              </div>
                            </div>


                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="Telephone" name="telephone"
                                     onChange={handleInput} value={checkoutInput.telephone}/>
                            </div>
                            <hr/>
                            <div className="form-group">
                              <label className="container_check" id="other_addr">Other billing address
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                              </label>
                            </div>

                          </div>

                          <div className="tab-pane fade" id="tab_2" role="tabpanel" aria-labelledby="tab_2"
                               style={{position: 'relative'}}>
                            <a href="#0" className="social_bt facebook">Login con Facebook</a>
                            <a href="#0" className="social_bt google">Login con Google</a>
                            <div className="form-group">
                              <input type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control" placeholder="Password" name="password_in"
                                     id="password_in"/>
                            </div>
                            <div className="clearfix add_bottom_15">
                              <div className="checkboxes float-start">
                                <label className="container_check">Remember me
                                  <input type="checkbox"/>
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                              <div className="float-end"><a id="forgot" href="#0">Lost Password?</a></div>
                            </div>
                            <div id="forgot_pw">
                              <div className="form-group">
                                <input type="email" className="form-control" name="email_forgot" id="email_forgot"
                                       placeholder="Type your email"/>
                              </div>
                              <p>A new password will be sent shortly.</p>
                              <div className="text-center"><input type="submit" value="Reset Password"
                                                                  className="btn_1"/>
                              </div>
                            </div>
                            <hr/>
                            <input type="submit" className="btn_1 full-width" value="Login"/>
                          </div>

                        </div>
                      </div>

                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="step middle payments">
                        <h3>2. Payment and Shipping</h3>
                        <ul>
                          <li>
                            <label className="container_radio">Credit Card<a href="#0" className="info"
                                                                             data-bs-toggle="modal"
                                                                             data-bs-target="#payments_method"></a>
                              <input type="radio" name="payment" checked/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Paypal<a href="#0" className="info"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#payments_method"></a>
                              <input type="radio" name="payment"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Cash on delivery<a href="#0" className="info"
                                                                                  data-bs-toggle="modal"
                                                                                  data-bs-target="#payments_method"></a>
                              <input type="radio" name="payment"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Bank Transfer<a href="#0" className="info"
                                                                               data-bs-toggle="modal"
                                                                               data-bs-target="#payments_method"></a>
                              <input type="radio" name="payment"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <div className="payment_info d-none d-sm-block">
                          <figure><img src="img/cards_all.svg" alt=""/></figure>
                          <p>Sensibus reformidans interpretaris sit ne, nec errem nostrum et, te nec meliore
                            philosophia.
                            At vix quidam periculis. Solet tritani ad pri, no iisque definitiones sea.</p></div>

                        <h6 className="pb-2">Shipping Method</h6>


                        <ul>
                          <li>
                            <label className="container_radio">Standard shipping<a href="#0" className="info"
                                                                                   data-bs-toggle="modal"
                                                                                   data-bs-target="#payments_method"></a>
                              <input type="radio" name="shipping" checked/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_radio">Express shipping<a href="#0" className="info"
                                                                                  data-bs-toggle="modal"
                                                                                  data-bs-target="#payments_method"></a>
                              <input type="radio" name="shipping"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>

                        </ul>

                      </div>


                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="step last">
                        <h3>3. Order Summary</h3>
                        <div className="box_general summary">

                          <ul>
                            {
                              cart.map((item) => {
                                return (
                                  <li className="clearfix"><em>{item.product_qty}x {item.product.name}</em>
                                    <span>${item.total_price}</span></li>
                                )
                              })
                            }


                          </ul>
                          <ul>
                            <li className="clearfix"><em><strong>Subtotal</strong></em> <span>${subtotal}</span></li>
                            <li className="clearfix"><em><strong>Shipping</strong></em> <span>${shipping}</span></li>

                          </ul>
                          <div className="total clearfix">TOTAL <span>${formattedTotal}</span></div>
                          <div className="form-group">
                            <label className="container_check">Register to the Newsletter.
                              <input type="checkbox" checked/>
                              <span className="checkmark"></span>
                            </label>
                          </div>

                          <button type="button" onClick={submitOrder} className="btn_1 full-width">Confirm and Pay
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                </>
              )

              }


            </div>

        </>
    )
}

export default Checkout
