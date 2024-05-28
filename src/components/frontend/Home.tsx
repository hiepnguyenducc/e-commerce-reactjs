
import shome4 from '../../../public/shome4.jpg'
import life from '../../../public/lifeestyle.jpg'
import running from '../../../public/running.jpg'
import football from '../../../public/football.jpg';
import traing from '../../../public/training.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    sale:number;
    status: number;
}
function Home() {
    const [viewProduct, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        document.title = "View Product"
        axios.get(`/api/view-product`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product)
                setLoading(false);
            }
        })
    },[]);
    return (
      <>
        <main>
          <div id="carousel-home-2">
            <div className="owl-carousel owl-theme">
              <div className="owl-slide cover" style={{backgroundImage: `url(${shome4})`}}>
                <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                  <div className="container">
                    <div className="row justify-content-center justify-content-md-start">
                      <div className="col-lg-12 static">
                        <div className="slide-text text-center white">
                          <h2 className="owl-slide-animated owl-slide-title">Runnig<br/>Collection</h2>
                          <p className="owl-slide-animated owl-slide-subtitle">
                            Limited items available at this price
                          </p>
                          <div className="owl-slide-animated owl-slide-cta"><a className="btn_1"
                                                                               href="listing-grid-1-full.html"
                                                                               role="button">Shop Now</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-slide cover" style={{backgroundImage: `url(${shome4})`}}>
                <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                  <div className="container">
                    <div className="row justify-content-center justify-content-md-start">
                      <div className="col-lg-12 static">
                        <div className="slide-text text-center white">
                          <h2 className="owl-slide-animated owl-slide-title">Easy Fit<br/>Collection</h2>
                          <p className="owl-slide-animated owl-slide-subtitle">
                            Limited items available at this price
                          </p>
                          <div className="owl-slide-animated owl-slide-cta"><a className="btn_1"
                                                                               href="listing-grid-1-full.html"
                                                                               role="button">Shop Now</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-slide cover" style={{backgroundImage: `url(${shome4})`}}>
                <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
                  <div className="container">
                    <div className="row justify-content-center justify-content-md-start">
                      <div className="col-lg-12 static">
                        <div className="slide-text text-center white">
                          <h2 className="owl-slide-animated owl-slide-title">Casual<br/>Collection</h2>
                          <p className="owl-slide-animated owl-slide-subtitle">
                            Limited items available at this price
                          </p>
                          <div className="owl-slide-animated owl-slide-cta"><a className="btn_1"
                                                                               href="listing-grid-1-full.html"
                                                                               role="button">Shop Now</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-slide cover" style={{backgroundImage: `url(${shome4})`}}>
                <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(255, 255, 255, 0.5)">
                  <div className="container">
                    <div className="row justify-content-center justify-content-md-start">
                      <div className="col-lg-12 static">
                        <div className="slide-text text-center black">
                          <h2 className="owl-slide-animated owl-slide-title">Attack Air<br/>Monarch</h2>
                          <p className="owl-slide-animated owl-slide-subtitle">
                            Lightweight cushioning and durable support with a Phylon midsole
                          </p>
                          <div className="owl-slide-animated owl-slide-cta"><a className="btn_1"
                                                                               href="listing-grid-1-full.html"
                                                                               role="button">Shop Now</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="icon_drag_mobile"></div>
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
                       className="img-fluid lazy"/>
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
                           className="img-fluid lazy"/>
                      <div className="wrapper">
                        <h2>Running</h2>
                        <p>150 Products</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <a href="listing-grid-1-full.html">
                      <img src={football} data-src="img/img_cat_home_3.jpg" alt=""
                           className="img-fluid lazy"/>
                      <div className="wrapper">
                        <h2>Football</h2>
                        <p>90 Products</p>
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-12 mt-sm-2">
                    <a href="listing-grid-1-full.html">
                      <img src={traing} data-src="img/img_cat_home_4.jpg" alt=""
                           className="img-fluid lazy"/>
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

          <hr className="mb-0"/>
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
                                 data-src="img/products/shoes/1.jpg" alt=""/>
                            <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                                 data-src="img/products/shoes/1_b.jpg" alt=""/>
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
                            <a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to favorites">
                              <i className="ti-heart"></i><span>Add to favorites</span>
                            </a>
                          </li>
                          <li>
                            <a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to compare">
                              <i className="ti-control-shuffle"></i><span>Add to compare</span>
                            </a>
                          </li>
                          <li>
                            <a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to cart">
                              <i className="ti-shopping-cart"></i><span>Add to cart</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })
              }


              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon off">-30%</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/2.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/2_b.jpg" alt=""/>
                    </a>
                    <div data-countdown="2019/05/10" className="countdown"></div>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Okwahn II</h3>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon off">-50%</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/3.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/3_b.jpg" alt=""/>
                    </a>
                    <div data-countdown="2019/05/21" className="countdown"></div>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Air Wildwood ACG</h3>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon new">New</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/4.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/4_b.jpg" alt=""/>
                    </a>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor ACG React Terra</h3>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon new">New</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/5.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/5_b.jpg" alt=""/>
                    </a>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Air Zoom Alpha</h3>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon new">New</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/6.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/6_b.jpg" alt=""/>
                    </a>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Air Alpha</h3>
                  </a>
                  <div className="price_box">
                    <span className="new_price">$130.00</span>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon hot">Hot</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/7.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/7_b.jpg" alt=""/>
                    </a>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Air Max 98</h3>
                  </a>
                  <div className="price_box">
                    <span className="new_price">$115.00</span>
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
              <div className="col-6 col-md-4 col-xl-3">
                <div className="grid_item">
                  <span className="ribbon hot">Hot</span>
                  <figure>
                    <a href="product-detail-1.html">
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/8.jpg" alt=""/>
                      <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                           data-src="img/products/shoes/8_b.jpg" alt=""/>
                    </a>
                  </figure>
                  <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                    className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                  </div>
                  <a href="product-detail-1.html">
                    <h3>Armor Air Max 720</h3>
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
            </div>
          </div>

          <div className="featured lazy" data-bg="url(img/featured_home.jpg)">
            <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.5)">
              <div className="container margin_60">
                <div className="row justify-content-center justify-content-md-start">
                  <div className="col-lg-6 wow" data-wow-offset="150">
                    <h3>Armor<br/>Air Color 720</h3>
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
                           data-src="img/products/shoes/4.jpg" alt=""/>
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
                           data-src="img/products/shoes/5.jpg" alt=""/>
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
                           data-src="img/products/shoes/8.jpg" alt=""/>
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
                           data-src="img/products/shoes/2.jpg" alt=""/>
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
                           data-src="img/products/shoes/3.jpg" alt=""/>
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
                                    className="owl-lazy"/></a>
                </div>
                <div className="item">
                  <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_2.png" alt=""
                                    className="owl-lazy"/></a>
                </div>
                <div className="item">
                  <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_3.png" alt=""
                                    className="owl-lazy"/></a>
                </div>
                <div className="item">
                  <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_4.png" alt=""
                                    className="owl-lazy"/></a>
                </div>
                <div className="item">
                  <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_5.png" alt=""
                                    className="owl-lazy"/></a>
                </div>
                <div className="item">
                  <a href="#0"><img src="img/brands/placeholder_brands.png" data-src="img/brands/logo_6.png" alt=""
                                    className="owl-lazy"/></a>
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
                         height="266" className="lazy"/>
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
                         height="266" className="lazy"/>
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
                         height="266" className="lazy"/>
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
                         height="266" className="lazy"/>
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
