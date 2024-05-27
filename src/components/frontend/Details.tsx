import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../loading/loading.tsx";
import '../../assests/frontend/css/style.css';
function ChromePicker(props: { disableAlpha: boolean }) {
  return null;
}

function Details(){

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [product, setProduct]= useState([]);
  const [color, setColor]= useState([]);
  let isMounted = true;
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
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
        console.log(setColor(res.data.color))
      }
    })
  }, []);
  const backgroundImageUrl = `http://127.0.0.1:8001/${product.image}`;
  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,

  };
  console.log(style)
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
                            <li  style={{backgroundColor: item.hex_code, borderRadius:'50%'}}>
                              <Link className="color active"
                                    onClick={() => handleClick(index)} to="#" > <ChromePicker color={item.hex_code} disableAlpha={true}/></Link>
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
                      <select className="wide">
                        <option value="" selected>Small (S)</option>
                        <option value="">M</option>
                        <option value=" ">L</option>
                        <option value=" ">XL</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <label className="col-xl-5 col-lg-5  col-md-6 col-6"><strong>Quantity:</strong> {product.quantity}</label>
                  <div className="col-xl-4 col-lg-5 col-md-6 col-6">
                    <div className="numbers-row">
                      <input type="text" value="1" id="quantity_1" className="qty2" name="quantity_1"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 col-md-6">
                  {product.sale ==1 ?(
                    <>
                    <div className="price_main"><span className="new_price">${product.selling_price}</span><span
                      className="percentage">-{discountPercentage.toFixed(0)}%</span> <span className="old_price">${product.original_price}</span></div>

                    </>
                  ): (
                    <div className="price_main">
                      <span className="new_price">${product.original_price}</span>
                    </div>

                  )
                  }
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="btn_add_to_cart"><a href="#0" className="btn_1">Add to Cart</a></div>
                </div>
              </div>
            </div>


            <div className="product_actions">
            <ul>
                <li>
                  <a href="#"><i className="ti-heart"></i><span>Add to Wishlist</span></a>
                </li>
                <li>
                  <a href="#"><i className="ti-control-shuffle"></i><span>Add to Compare</span></a>
                </li>
              </ul>
            </div>

          </div>


      </div>
    </>
  )
}

export default Details
