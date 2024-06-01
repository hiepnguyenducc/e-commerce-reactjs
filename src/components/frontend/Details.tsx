import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../loading/loading.tsx";
import '../../assests/frontend/css/style.css';
import {message, Select, Space} from "antd";
function ChromePicker(props: { disableAlpha: boolean }) {
  return null;
}

function Details(){

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [product, setProduct]= useState([]);
  const [color, setColor]= useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize]= useState([]);
  const [selectedColor, setSelected]= useState(null);
  const [comment, setComment] = useState([]);

  const [addToCartInput, setAddToCartInput] = useState({
    size_id:''
  });
  let isMounted = true;
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index,color) => {
    setActiveIndex(index);
    setSelected(color);

  };
  const {slug} = useParams();
  useEffect(() => {
    axios.get(`api/getProductBySlug/${slug}`).then(res=>{
    if(res.data.status===200){
      setProduct(res.data.product);
      setLoading(false);
    }
    })
    axios.get(`api/getAllColor`).then(res=>{
      if(res.data.status===200){
        setColor(res.data.color);

      }
    })
    axios.get(`api/all-size`).then(res=>{
      if(res.data.status===200){
        setSize(res.data.size);

      }
    })

    axios.get(`api/getProductIdBySlug/${slug}`).then(res=>{
      if(res.data.status===200){
        const productId = res.data.productId;
        axios.get(`api/show-comment/${productId}`).then(res=>{
          if(res.data.status ===200){
            setComment(res.data.comment)
          }
        })
        console.log(productId)
      }else if(res.data.status===404){
        message.open({
          type:'error',
          content:res.data.message
        })
      }
    })
  }, [slug]);

  const backgroundImageUrl = `http://127.0.0.1:8001/${product.image}`;
  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,

  };
  const addToCart =(e)=>{
    e.preventDefault();
    const data ={
      product_id:product.id,
      product_qty:quantity,
      size_id: addToCartInput.size_id || undefined,
      color_id:selectedColor
    }
    console.log(data)
    axios.post(`api/add-to-cart`,data).then(res=>{
    if(res.data.status===201){
      message.open({
        type:'success',
        content:res.data.message
      })
    }else if(res.data.status===409){
      message.open({
        type:'warning',
        content:res.data.message
      })
    }else if(res.data.status===401){
      message.open({
        type:'error',
        content:res.data.message
      })
    }else if(res.data.status===404){
      message.open({
        type:'warning',
        content:res.data.message
      })
    }
    })
  }
  const addToWishList = (e)=>{
    e.preventDefault();
    const data ={
      product_id:product.id,
    }
    axios.post(`api/add-favorites`,data).then(res=>{
      if(res.data.status===200){
        message.open({
          type:'success',
          content:res.data.message
        })
      }else if(res.data.status==422){
        message.open({
          type:'error',
          content:res.data.message
        })
        console.log("errors")
      }else if(res.data.status==409){
        message.open({
          type:'warning',
          content:res.data.message
        })
      }else if(res.data.status==404){
        message.open({
          type:'warning',
          content:res.data.message
        })
      }else if(res.data.status==401){
        message.open({
          type:'warning',
          content:res.data.message
        })
      }
    })
  }
  const handleDecrement =()=>{
    if(quantity>1){
      setQuantity(prevState => prevState-1)
    }

  }
  const handleIncrement =()=>{
    if(quantity <10){
      setQuantity(prevState => prevState+1)
    }

  }
if(loading){
  return(
    <Loading></Loading>
  )
}
  const discountPercentage = ((product.original_price - product.selling_price) / product.original_price) * 100;
  const creationDate = new Date(product.created_at);
  const today = new Date();
  const timeDifference = today.getTime() - creationDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const isNew = daysDifference <= 1;
  let countdownElement;
  if (product.sale === 1) {

    const saleStartDate = new Date(product.sale_start_date);
    const saleEndDate = new Date(product.sale_end_date);
    const saleTimeDifference = saleEndDate.getTime() - today.getTime();
    if (saleTimeDifference > 0) {

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
  return(

    <>

      <div className="container margin_30">
        {product.sale == 1 && (
          <div className="countdown_inner">-{discountPercentage.toFixed(0)}% This offer ends in {countdownElement}</div>
        )
        }

      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="all">

            <div className="slider">
              <div className="owl-carousel owl-theme main">

                <div style={style} className="item-box"></div>
                <div style={style} className="item-box"></div>
                <div style={style} className="item-box"></div>
                <div style={style} className="item-box"></div>
                <div style={style} className="item-box"></div>
                <div style={style} className="item-box"></div>

              </div>
              <div className="left nonl"><i className="ti-angle-left"></i></div>
              <div className="right"><i className="ti-angle-right"></i></div>
            </div>

            <div className="slider-two">
              <div className="owl-carousel owl-theme thumbs">
                <div style={style} className="item active"></div>
                <div style={style} className="item"></div>
                <div style={style} className="item"></div>
                <div style={style} className="item"></div>
                <div style={style} className="item"></div>
                <div style={style} className="item"></div>
              </div>
              <div className="left-t nonl-t"></div>
              <div className="right-t"></div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="breadcrumbs">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Category</a></li>
              <li>Page active</li>
            </ul>
          </div>

          <div className="prod_info">
            <h1>{product.name}</h1>

            <span className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
              className="icon-star voted"></i><i className="icon-star voted"></i><i
              className="icon-star"></i><em>4 reviews</em></span>
            <p><small>SKU: MTKRY-001</small><br/>{product.description}</p>
            <div className="prod_options">
              <div className="row">
                <label className="col-xl-5 col-lg-5  col-md-6 col-6 pt-0"><strong>Color</strong></label>
                <div className="col-xl-4 col-lg-5 col-md-6 col-6 colors ">
                  <ul>
                    {color.map((item, index) => {
                      return (
                        <li style={{backgroundColor: item.hex_code, borderRadius: '50%'}}>
                          <Link className={`color ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => handleClick(index, item.hex_code)} to="#"> <ChromePicker
                            color={item.hex_code} disableAlpha={true}/></Link>
                        </li>
                      )
                    })
                    }
                  </ul>
                </div>
              </div>
              <div className="row">
                <label className="col-xl-5 col-lg-5 col-md-6 col-6"><strong>Size</strong> - Size Guide <a
                  href="#0" data-bs-toggle="modal" data-bs-target="#size-modal"><i
                  className="ti-help-alt"></i></a></label>
                <div className="col-xl-4 col-lg-5 col-md-6 col-6">
                  <div className="custom-select-form">
                    <div className="form-group mb-3">
                      <label htmlFor="category_id">Category</label>
                      <br/>
                      <Space wrap>
                        <Select
                          name="size_id"
                          onChange={value => setAddToCartInput({...addToCartInput, size_id: value})}
                          value={addToCartInput.size_id}
                          style={{width: 400, height: 38}}
                        >
                          <Select.Option value="">Select Size</Select.Option>
                          {size.map(item => (
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                          ))}
                        </Select>
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <label className="col-xl-5 col-lg-5  col-md-6 col-6"><strong>Quantity:</strong> {product.quantity}
                </label>
                <div className="col-xl-4 col-lg-5 col-md-6 col-6">
                  <div className="numbers-row">
                    <button className="btn-descrement" onClick={handleDecrement} style={{width: '40px'}}>-</button>
                    <input type="text" value={quantity} id="quantity_1" className="qty2" name="quantity_1"/>
                    <button className="float-end btn-descrement" onClick={handleIncrement}
                            style={{width: '40px', lineHeight: '40px'}}>+
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 col-md-6">
                {product.sale == 1 ? (
                  <>
                    <div className="price_main"><span className="new_price">${product.selling_price}</span><span
                      className="percentage">-{discountPercentage.toFixed(0)}%</span> <span
                      className="old_price">${product.original_price}</span></div>

                  </>
                ) : (
                  <div className="price_main">
                    <span className="new_price">${product.original_price}</span>
                  </div>

                )
                }
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="btn_add_to_cart"><a href="#0" className="btn_1" onClick={addToCart}>Add to Cart</a>
                </div>
              </div>
            </div>
          </div>


          <div className="product_actions">
            <ul>
              <li>
                <a href="#" onClick={addToWishList}><i className="ti-heart"></i><span>Add to Wishlist</span></a>
              </li>
              <li>
                <a href="#"><i className="ti-control-shuffle"></i><span>Add to Compare</span></a>
              </li>
            </ul>
          </div>

        </div>


      </div>
      <div className="tabs_product">
        <div className="container">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a id="tab-A" href="#pane-A" className="nav-link active" data-bs-toggle="tab" role="tab">Description</a>
            </li>
            <li className="nav-item">
              <a id="tab-B" href="#pane-B" className="nav-link" data-bs-toggle="tab" role="tab">Reviews</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="tab_content_wrapper">
        <div className="container">
          <div className="tab-content" role="tablist">
            <div id="pane-A" className="card tab-pane fade active show" role="tabpanel" aria-labelledby="tab-A">
              <div className="card-header" role="tab" id="heading-A">
                <h5 className="mb-0">
                  <a className="collapsed" data-bs-toggle="collapse" href="#collapse-A" aria-expanded="false"
                     aria-controls="collapse-A">
                    Description
                  </a>
                </h5>
              </div>
              <div id="collapse-A" className="collapse" role="tabpanel" aria-labelledby="heading-A">
                <div className="card-body">
                  <div className="row justify-content-between">
                    <div className="col-lg-6">
                      <h3>Details</h3>
                      <p>Lorem ipsum dolor sit amet, in eleifend <strong>inimicus elaboraret</strong> his, harum
                        efficiendi mel ne. Sale percipit vituperata ex mel, sea ne essent aeterno sanctus, nam ea
                        laoreet civibus electram. Ea vis eius explicari. Quot iuvaret ad has.</p>
                      <p>Vis ei ipsum conclusionemque. Te enim suscipit recusabo mea, ne vis mazim aliquando, everti
                        insolens at sit. Cu vel modo unum quaestio, in vide dicta has. Ut his laudem explicari
                        adversarium, nisl <strong>laboramus hendrerit</strong> te his, alia lobortis vis ea.</p>
                      <p>Perfecto eleifend sea no, cu audire voluptatibus eam. An alii praesent sit, nobis numquam
                        principes ea eos, cu autem constituto suscipiantur eam. Ex graeci elaboraret pro. Mei te omnis
                        tantas, nobis viderer vivendo ex has.</p>
                      <p>{product.description}</p>
                    </div>
                    <div className="col-lg-5">
                      <h3>Specifications</h3>
                      <div className="table-responsive">
                        <table className="table table-sm table-striped">
                          <tbody>
                          <tr>
                            <td><strong>Color</strong></td>
                            <td>Blue, Purple</td>
                          </tr>
                          <tr>
                            <td><strong>Size</strong></td>
                            <td>150x100x100</td>
                          </tr>
                          <tr>
                            <td><strong>Weight</strong></td>
                            <td>0.6kg</td>
                          </tr>
                          <tr>
                            <td><strong>Manifacturer</strong></td>
                            <td>Manifacturer</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="pane-B" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-B">
              <div className="card-header" role="tab" id="heading-B">
                <h5 className="mb-0">
                  <a className="collapsed" data-bs-toggle="collapse" href="#collapse-B" aria-expanded="false"
                     aria-controls="collapse-B">
                    Reviews
                  </a>
                </h5>
              </div>
              <div id="collapse-B" className="collapse" role="tabpanel" aria-labelledby="heading-B">
                <div className="card-body">
                  <div className="row justify-content-between">
                    {comment.map((item)=>{
                      return(
                        <>
                          <div className="col-lg-6">
                            <div className="review_content">
                              <div className="clearfix add_bottom_10">
                              <span className="rating">
                                {[...Array(item.rating)].map((_, index) => (
                                  <i key={index} className="icon-star"></i>
                                ))}
                                {[...Array(5 - item.rating)].map((_, index) => (
                                  <i key={index + item.rating} className="icon-star empty"></i>
                                ))}
                                <em>{item.rating}/5.0</em>
                              </span>
                                <em>Published 54 minutes ago</em>
                              </div>
                              <h4>"{item.title}"</h4>
                              <p>{item.content}</p>
                            </div>
                          </div>
                        </>

                      )
                    })

                    }


                  </div>



                  <p className="text-end"><Link to={`/${product.slug}/review`} className="btn_1">Leave a review</Link></p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
      <div className="container margin_60_35">
        <div className="main_title">
          <h2>Related</h2>
          <span>Products</span>
          <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
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
                className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i></div>
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
                       title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
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
                className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i></div>
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
                       title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
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
                className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i></div>
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
                       title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
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
                className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i></div>
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
                       title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
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
                className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i></div>
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
                       title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a></li>
                <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                       title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
              </ul>
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
    </>
  )
}

export default Details
