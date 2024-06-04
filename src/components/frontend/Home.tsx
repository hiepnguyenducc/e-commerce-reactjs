

import life from '../../../public/lifeestyle.jpg'
import running from '../../../public/running.jpg'
import football from '../../../public/football.jpg';
import traing from '../../../public/training.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Home.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import { Drawer, Slider, notification, Space, Select } from "antd";
import Loading from '../loading/loading';
import NaoCho from "./NaoCho.tsx";
function ChromePicker(props: { disableAlpha: boolean }) {
  return null;
}
interface Product {
  id: number;
  category_id: {
    name: string;
  };
  slug: string;
  name: string;
  description: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  brand_id: number;
  selling_price: number;
  original_price: number;
  quantity: number;
  image: string;
  featured: number;
  popular: number;
  sale: number;
  status: number;
}
function Home() {
  const [viewProduct, setProduct] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([]);
  const [selectedColor, setSelected] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [emailInput, setEmailInput]= useState({
    email:'',
  })
  const [isModalVisible, setIsModalVisible] = useState(true);
  let isMounted = true;
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndexSize, setActiveIndexSize] = useState(null);
  const onClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {

    axios.get(`/api/view-product`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.product)
        setLoading(false);
      }
    })

  }, []);
  useEffect(() => {
    axios.get(`api/getProductBySlug/${slug}`).then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.product);
        setLoading(false);
      }
    })
    axios.get(`api/getAllColor`).then(res => {
      if (res.data.status === 200) {
        setColor(res.data.color);

      }
    })
    axios.get(`api/all-size`).then(res => {
      if (res.data.status === 200) {
        setSize(res.data.size);
      }
    })
  }, [slug])

  if (loading) {
    <Loading></Loading>
  }
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProduct(null);
  };
  const handleClick = (index, color) => {
    setActiveIndex(index);
    setSelected(color);
  };
  const handleClickSize = (index, size) => {
    setActiveIndexSize(index);
    setSelectedSize(size);
  };
  const selectedProductId = selectedProduct ? selectedProduct.id : null;
  console.log("id product",selectedProductId)
  const addToCart = (e) => {
    e.preventDefault();
    const data = {
      product_id: selectedProductId,
      product_qty: quantity,
      size_id: selectedSize,
      color_id: selectedColor
    }
    console.log(data)
    axios.post(`api/add-to-cart`, data).then(res => {
      if (res.data.status === 201) {
        notification.success({
          message: 'Success',
          description: res.data.message,
          placement: 'bottomRight'
        });
        handleClose();
      } else if (res.data.status === 409) {
        notification.warning({
          message: 'Warning',
          description: res.data.message,
          placement: 'bottomRight'
        });
      } else if (res.data.status === 401) {
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement: 'bottomRight'
        });
      } else if (res.data.status === 404) {
        notification.warning({
          message: 'Warning',
          description: res.data.message,
          placement: 'bottomRight'
        });
      }
    })
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }

  }
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(prevState => prevState + 1)
    }

  }

  const addToWishList = (e,id)=>{
    e.preventDefault();
    const data ={
      product_id:id,
    }
    console.log('data',data)
    axios.post(`api/add-favorites`,data).then(res=>{
      if(res.data.status===200){
        notification.success({
          message: 'Success',
          description: res.data.message,
          placement:'bottomRight'
        });
      }else if(res.data.status==422){
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement:'bottomRight'
        });
      }else if(res.data.status==409){
        notification.error({
          message: 'Error',
          description: res.data.errors,
          placement:'bottomRight'
        });
      }else if(res.data.status==404){
        notification.warning({
          message: 'Warning',
          description: res.data.message,
          placement:'bottomRight'
        });
      }else if(res.data.status==401){
        notification.warning({
          message: 'Warning',
          description: res.data.message,
          placement:'bottomRight'
        });
      }
    })
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEmailInput({ ...emailInput, [e.target.name]: value });

}
  const submitEmail =(e)=>{
    e.preventDefault();
    const data = {
      email: emailInput.email,
    }
    axios.post(`api/email`,data).then(res=>{
      if(res.data.status===200){
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })

      }else if(res.data.status===401){
        notification.warning({
          message:'Warning',
          description:res.data.message,
          placement:'bottomRight'
        })
      }
    }) }

  return (
    <>
      <main>
        {selectedProduct && (
          <Modal show={show} onHide={handleClose} centered dialogClassName="modal-custom">

            <Modal.Body closeButton>
              <div>
                <h1>{selectedProduct.name}</h1>
                {selectedProduct.sale === 1 ? (
                  <div>
                    <h2 className='new_price'>${selectedProduct.selling_price}</h2>
                    <h2 className='old_price'>${selectedProduct.original_price}</h2>
                  </div>
                ) : (
                  <h2 className='new_price'>${selectedProduct.original_price}</h2>
                )
                }

                <img style={{ width: '100px' }} src={`http://127.0.0.1:8001/${selectedProduct.image}`} alt={selectedProduct.name} />
                <div className="prod_options">
                  <div className="row">
                    <label className="col-xl-5 col-lg-5  col-md-6 col-6 pt-0"><strong>Size</strong></label>
                    <div className="col-xl-4 col-lg-5 col-md-6 col-6 colors ">
                      <ul>
                        {size.map((item, index) => {
                          return (
                            <li style={{ backgroundColor: item.name, borderRadius: '50%' }}>
                              <Link className={`color ${activeIndexSize === index ? 'active' : ''}`}
                                onClick={() => handleClickSize(index, item.name)} to="#"> <ChromePicker
                                   disableAlpha={true} />{item.name}</Link>
                            </li>
                          )
                        })
                        }
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="prod_options">
                  <div className="row">
                    <label className="col-xl-5 col-lg-5  col-md-6 col-6 pt-0"><strong>Color</strong></label>
                    <div className="col-xl-4 col-lg-5 col-md-6 col-6 colors ">
                      <ul>
                        {color.map((item, index) => {
                          return (
                            <li style={{ backgroundColor: item.hex_code, borderRadius: '50%' }}>
                              <Link className={`color ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => handleClick(index, item.hex_code)} to="#"> <ChromePicker
                                  color={item.hex_code} disableAlpha={true} /></Link>
                            </li>
                          )
                        })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <label className="col-xl-5 col-lg-5  col-md-6 col-6"><strong>Quantity:</strong> {selectedProduct.quantity}
                  </label>
                  <br />
                  <div className="form-group mb-3">
                    <div className="numbers-row" >
                      <button className="btn-descrement" onClick={handleDecrement} style={{ width: '40px' }}>-</button>
                      <input type="text" value={quantity} id="quantity_1" className="qty2" name="quantity_1" />
                      <button className="float-end btn-descrement" onClick={handleIncrement}
                        style={{ width: '40px', lineHeight: '40px' }}>+
                      </button>
                    </div>
                  </div>
                </div>
                <Link to={selectedProduct.slug}>View Detail</Link>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addToCart}>
                Add to Cart
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <div className="popup_wrapper">
          <div className="popup_content newsletter">
            <span className="popup_close" >Close</span>
            <div className="row g-0">
              <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
                <figure><img src="newsletter_img.jpg" alt="" /></figure>
              </div>
              <div className="col-md-7">
                <div className="content">
                  <div className="wrapper">
                    <img src="h.jpg" alt="" width="100" height="35" />
                    <h3>Sign up our newsletter</h3>
                    <p>Subscribe to our newsletter and get 10% off your first purchase.</p>
                    <form action="/" onSubmit={submitEmail}>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter your email address" name='email' onChange={handleInput} value={emailInput.email}/>
                      </div>

                      <button type="submit" className="btn_1 mt-2 mb-4">Subscribe</button>
                      <div className="form-group">
                        <label className="container_check d-inline">Don't show this PopUp again
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feat">

          <div className="container">
            <ul>
              <li>
                <div className="box">
                  <i className="ti-gift"></i>
                  <div className="justify-content-center">
                    <h3>Free Shipping</h3>
                    <p>For all oders over $99</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="box">
                  <i className="ti-wallet"></i>
                  <div className="justify-content-center">
                    <h3>Secure Payment</h3>
                    <p>100% secure payment</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="box">
                  <i className="ti-headphone-alt"></i>
                  <div className="justify-content-center">
                    <h3>24/7 Support</h3>
                    <p>Online top support</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="container margin_60_35">
          <div className="row small-gutters categories_grid">
            <div className="col-sm-12 col-md-6">
              <a href="listing-grid-1-full.html">
                <img src={life} data-src="img/img_cat_home_1.jpg" alt=""
                  className="img-fluid lazy" />
                <div className="wrapper">
                  <h2>Life Style</h2>
                  <p>115 Products</p>
                </div>
              </a>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="row small-gutters mt-md-0 mt-sm-2">
                <div className="col-sm-6">
                  <a href="listing-grid-1-full.html">
                    <img src={running} data-src="img/img_cat_home_2.jpg" alt=""
                      className="img-fluid lazy" />
                    <div className="wrapper">
                      <h2>Running</h2>
                      <p>150 Products</p>
                    </div>
                  </a>
                </div>
                <div className="col-sm-6">
                  <a href="listing-grid-1-full.html">
                    <img src={football} data-src="img/img_cat_home_3.jpg" alt=""
                      className="img-fluid lazy" />
                    <div className="wrapper">
                      <h2>Football</h2>
                      <p>90 Products</p>
                    </div>
                  </a>
                </div>
                <div className="col-sm-12 mt-sm-2">
                  <a href="listing-grid-1-full.html">
                    <img src={traing} data-src="img/img_cat_home_4.jpg" alt=""
                      className="img-fluid lazy" />
                    <div className="wrapper">
                      <h2>Training</h2>
                      <p>120 Products</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <hr className="mb-0" />
        <div className="container margin_60_35">
          <div className="main_title">
            <h2>Top Selling</h2>
            <span>Products</span>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset</p>
          </div>


          <div className="row small-gutters">
            {
              viewProduct.map(item => {
                const discountPercentage = ((item.original_price - item.selling_price) / item.original_price) * 100;
                const creationDate = new Date(item.created_at);
                const today = new Date();
                const timeDifference = today.getTime() - creationDate.getTime();
                const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
                const isNew = daysDifference <= 1;
                let countdownElement;
                if (item.sale === 1) {
                  // Convert sale start and end dates to Date objects
                  const saleStartDate = new Date(item.sale_start_date);
                  const saleEndDate = new Date(item.sale_end_date);
                  const saleTimeDifference = saleEndDate.getTime() - today.getTime();
                  if (saleTimeDifference > 0) {
                    // Convert milliseconds to hours, minutes, and seconds
                    let seconds = Math.floor((saleTimeDifference / 1000) % 60);
                    let minutes = Math.floor((saleTimeDifference / (1000 * 60)) % 60);
                    let hours = Math.floor((saleTimeDifference / (1000 * 60 * 60)) % 24);

                    let countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                    countdownElement = <div data-countdown={saleEndDate} className="countdown">{countdownString}</div>;
                  } else {
                    countdownElement = null
                  }
                } else {
                  countdownElement = null
                }
                return (
                  <div className="col-6 col-md-4 col-xl-3" key={item.id}>
                    <div className="grid_item">
                      <figure>
                        {item.sale === 1 && (
                          <span className={`ribbon off ${isNew ? 'ml-10' : ''}`}>{`-${discountPercentage.toFixed(0)}%`}</span>
                        )
                        }
                        {isNew && (
                          <span className="ribbon new">New</span>
                        )}
                        <Link to={item.slug}>
                          <img className="img-fluid lazy" src={`http://127.0.0.1:8001/${item.image}`}
                            data-src="img/products/shoes/1.jpg" alt="" />
                          <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                            data-src="img/products/shoes/1_b.jpg" alt="" />
                        </Link>

                        {countdownElement}
                      </figure>
                      <div className="rating">
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star voted"></i>
                        <i className="icon-star"></i>
                      </div>
                      <Link to={item.slug}>
                        <h3>{item.name}</h3>
                      </Link>
                      <div className="price_box">
                        {item.sale === 1 ? (
                          <>
                            <span className="new_price">${item.selling_price}</span>
                            <span className="old_price">${item.original_price}</span>
                          </>
                        ) : (
                          <span className="new_price">${item.original_price}</span>
                        )}
                      </div>
                      <ul>
                        <li>
                          <Link onClick={(e)=>addToWishList(e,item.id)} to={"#"} className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to favorites">
                            <i className="ti-heart"></i><span>Add to favorites</span>
                          </Link>
                        </li>
                        <li>
                          <a className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to compare">
                            <i className="ti-control-shuffle"></i><span>Add to compare</span>
                          </a>
                        </li>
                        <li>

                          <Drawer title="Basic Drawer" onClose={onClose} open={open} >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                          </Drawer>
                          <Link to="" className="tooltip-1" onClick={() => handleShow(item)} style={{ cursor: 'pointer' }} data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                            <i className="ti-shopping-cart"></i><span>Add to cart</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            }


          </div>
        </div>

        <div className="featured lazy" data-bg="url(img/featured_home.jpg)">
          <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
            <div className="container margin_60">
              <div className="row justify-content-center justify-content-md-start">
                <div className="col-lg-6 wow" data-wow-offset="150">
                  <h3>Armor<br />Air Color 720</h3>
                  <p>Lightweight cushioning and durable support with a Phylon midsole</p>
                  <div className="feat_text_block">
                    <div className="price_box">
                      <span className="new_price">$90.00</span>
                      <span className="old_price">$170.00</span>
                    </div>
                    <a className="btn_1" href="listing-grid-1-full.html" role="button">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container margin_60_35">
          <div className="main_title">
            <h2>Featured</h2>
            <span>Products</span>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset</p>
          </div>
          <div className="owl-carousel owl-theme products_carousel">
            <div className="item">
              <div className="grid_item">
                <span className="ribbon new">New</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                      data-src="img/products/shoes/4.jpg" alt="" />
                  </a>
                </figure>
                <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                  className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                  <h3>ACG React Terra</h3>
                </a>
                <div className="price_box">
                  <span className="new_price">$110.00</span>
                </div>
                <ul>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                  </li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
              </div>
            </div>
            <div className="item">
              <div className="grid_item">
                <span className="ribbon new">New</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                      data-src="img/products/shoes/5.jpg" alt="" />
                  </a>
                </figure>
                <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                  className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                  <h3>Air Zoom Alpha</h3>
                </a>
                <div className="price_box">
                  <span className="new_price">$140.00</span>
                </div>
                <ul>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                  </li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
              </div>
            </div>
            <div className="item">
              <div className="grid_item">
                <span className="ribbon hot">Hot</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                      data-src="img/products/shoes/8.jpg" alt="" />
                  </a>
                </figure>
                <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                  className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                  <h3>Air Color 720</h3>
                </a>
                <div className="price_box">
                  <span className="new_price">$120.00</span>
                </div>
                <ul>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                  </li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
              </div>
            </div>
            <div className="item">
              <div className="grid_item">
                <span className="ribbon off">-30%</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                      data-src="img/products/shoes/2.jpg" alt="" />
                  </a>
                </figure>
                <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                  className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                  <h3>Okwahn II</h3>
                </a>
                <div className="price_box">
                  <span className="new_price">$90.00</span>
                  <span className="old_price">$170.00</span>
                </div>
                <ul>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                  </li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
              </div>
            </div>
            <div className="item">
              <div className="grid_item">
                <span className="ribbon off">-50%</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="owl-lazy" src="img/products/product_placeholder_square_medium.jpg"
                      data-src="img/products/shoes/3.jpg" alt="" />
                  </a>
                </figure>
                <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                  className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                </div>
                <a href="product-detail-1.html">
                  <h3>Air Wildwood ACG</h3>
                </a>
                <div className="price_box">
                  <span className="new_price">$75.00</span>
                  <span className="old_price">$155.00</span>
                </div>
                <ul>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                  </li>
                  <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                    title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg_gray">
          <div className="container margin_30">
            <div id="brands" className="owl-carousel owl-theme">
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_1.png" alt=""
                  className="owl-lazy" /></a>
              </div>
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_2.png" alt=""
                  className="owl-lazy" /></a>
              </div>
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_3.png" alt=""
                  className="owl-lazy" /></a>
              </div>
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_4.png" alt=""
                  className="owl-lazy" /></a>
              </div>
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_5.png" alt=""
                  className="owl-lazy" /></a>
              </div>
              <div className="item">
                <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_6.png" alt=""
                  className="owl-lazy" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="container margin_60_35">
          <div className="main_title">
            <h2>Latest News</h2>
            <span>Blog</span>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <a className="box_news" href="blog.html">
                <figure>
                  <img src="img/blog-thumb-placeholder.jpg" data-src="img/blog-thumb-1.jpg" alt="" width="400"
                    height="266" className="lazy" />
                  <figcaption><strong>28</strong>Dec</figcaption>
                </figure>
                <ul>
                  <li>by Mark Twain</li>
                  <li>20.11.2017</li>
                </ul>
                <h4>Pri oportere scribentur eu</h4>
                <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum
                  vidisse....</p>
              </a>
            </div>
            <div className="col-lg-6">
              <a className="box_news" href="blog.html">
                <figure>
                  <img src="img/blog-thumb-placeholder.jpg" data-src="img/blog-thumb-2.jpg" alt="" width="400"
                    height="266" className="lazy" />
                  <figcaption><strong>28</strong>Dec</figcaption>
                </figure>
                <ul>
                  <li>By Jhon Doe</li>
                  <li>20.11.2017</li>
                </ul>
                <h4>Duo eius postea suscipit ad</h4>
                <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum
                  vidisse....</p>
              </a>
            </div>
            <div className="col-lg-6">
              <a className="box_news" href="blog.html">
                <figure>
                  <img src="img/blog-thumb-placeholder.jpg" data-src="img/blog-thumb-3.jpg" alt="" width="400"
                    height="266" className="lazy" />
                  <figcaption><strong>28</strong>Dec</figcaption>
                </figure>
                <ul>
                  <li>By Luca Robinson</li>
                  <li>20.11.2017</li>
                </ul>
                <h4>Elitr mandamus cu has</h4>
                <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum
                  vidisse....</p>
              </a>
            </div>
            <div className="col-lg-6">
              <a className="box_news" href="blog.html">
                <figure>
                  <img src="img/blog-thumb-placeholder.jpg" data-src="img/blog-thumb-4.jpg" alt="" width="400"
                    height="266" className="lazy" />
                  <figcaption><strong>28</strong>Dec</figcaption>
                </figure>
                <ul>
                  <li>By Paula Rodrigez</li>
                  <li>20.11.2017</li>
                </ul>
                <h4>Id est adhuc ignota delenit</h4>
                <p>Cu eum alia elit, usu in eius appareat, deleniti sapientem honestatis eos ex. In ius esse ullum
                  vidisse....</p>
              </a>
            </div>
          </div>
        </div>

      </main>
      <script src='../../assests/frontend/js/common_scripts.min.js'></script>
      <script src="../../assests/frontend/js/main.js"></script>
      <script src="../../assests/frontend/js/carousel-home-2.js"></script>
    </>
  )
}

export default Home;
