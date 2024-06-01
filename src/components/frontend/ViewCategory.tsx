import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Loading from "../loading/loading.tsx";
interface Product{
  name:string,
  slug:string,
  image:string,
  sale:number,
  sale_start_date:string,
  sale_end_date:string,
  original_price:number,
  selling_price:number,
  created_at:string
}
interface Category{
  name:string,
  slug:string,
  image:string,
}
function ViewCategory(){
  const [category, setCatgegory] = useState<Category[]>([]);
  const [product, setProduct]= useState<Product[]>([]);
  const [loading,setLoading]= useState(true);
  const {slug}= useParams();
  useEffect(() => {
    axios.get(`api/getCategoryBySlug/${slug}`).then(res=>{
      if(res.data.status===200){
        setCatgegory(res.data.category)
      }
    })
    axios.get(`api/getProductByCategorySlug/${slug}`).then(res=>{
      if(res.data.status===200){
        setProduct(res.data.product)
        setLoading(false);
      }
    })
  }, [slug]);
  console.log("category",category)
  if(loading){
    return (
      <Loading></Loading>
    )
  }
  return(
    <>
      {category.map((item)=>{
        return (
          <div className="top_banner version_2">
            <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0)">
              <div className="container">
                <div className="d-flex justify-content-center"><h1>{item.name}</h1></div>
              </div>
            </div>
            <img src={`http://127.0.0.1:8001/${item.image}`} className="img-fluid" alt=""/>
          </div>
        )
      })

      }


      <div id="stick_here"></div>
      <div className="toolbox elemento_stick">
        <div className="container">
          <ul className="clearfix">
            <li>
              <div className="sort_select">
                <select name="sort" id="sort">
                  <option value="popularity" selected="selected">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                    <option value="date">Sort by newness</option>
                    <option value="price">Sort by price: low to high</option>
                    <option value="price-desc">Sort by price: high to</option>
                  </select>
                </div>
              </li>
              <li>
                <a href="#0"><i className="ti-view-grid"></i></a>
                <a href="listing-row-1-sidebar-left.html"><i className="ti-view-list"></i></a>
              </li>
              <li>
                <a data-bs-toggle="collapse" href="#filters" role="button" aria-expanded="false"
                   aria-controls="filters">
                  <i className="ti-filter"></i><span>Filters</span>
                </a>
              </li>
            </ul>
            <div className="collapse" id="filters">
              <div className="row small-gutters filters_listing_1">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="dropdown">
                    <a href="#" data-bs-toggle="dropdown" className="drop">Categories</a>
                    <div className="dropdown-menu">
                      <div className="filter_type">
                        <ul>
                          <li>
                            <label className="container_check">Men <small>12</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Women <small>24</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Running <small>23</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Training <small>11</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <a href="#0" className="apply_filter">Apply</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="dropdown">
                    <a href="#" data-bs-toggle="dropdown" className="drop">Color</a>
                    <div className="dropdown-menu">
                      <div className="filter_type">
                        <ul>
                          <li>
                            <label className="container_check">Blue <small>06</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Red <small>12</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Orange <small>17</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Black <small>43</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <a href="#0" className="apply_filter">Apply</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="dropdown">
                    <a href="#" data-bs-toggle="dropdown" className="drop">Brand</a>
                    <div className="dropdown-menu">
                      <div className="filter_type">
                        <ul>
                          <li>
                            <label className="container_check">Adidas <small>11</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Nike <small>08</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Vans <small>05</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">Puma <small>18</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <a href="#0" className="apply_filter">Apply</a>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="dropdown">
                    <a href="#" data-bs-toggle="dropdown" className="drop">Price</a>
                    <div className="dropdown-menu">
                      <div className="filter_type">
                        <ul>
                          <li>
                            <label className="container_check">$0 — $50<small>11</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">$50 — $100<small>08</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">$100 — $150<small>05</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                          <li>
                            <label className="container_check">$150 — $200<small>18</small>
                              <input type="checkbox"/>
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                        <a href="#0" className="apply_filter">Apply</a>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container margin_30">
          <div className="row small-gutters">
            {
                <div className="col-6 col-md-4 col-xl-3">
                  <div className="grid_item">
                    <figure>
                      <span className="ribbon off">-30%</span>
                      <a href="product-detail-1.html">
                        <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                             data-src="img/products/shoes/1.jpg" alt=""/>
                      </a>
                      <div data-countdown="2019/05/15" className="countdown"></div>
                    </figure>
                    <a href="product-detail-1.html">
                      <h3>{category.name}</h3>
                    </a>
                    <div className="price_box">
                      <span className="new_price">$48.00</span>
                      <span className="old_price">$60.00</span>
                    </div>
                    <ul>
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to compare"><i
                        className="ti-control-shuffle"></i><span>Add to compare</span></a>
                      </li>
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                    </ul>
                  </div>
                </div>

            }
            {product.map((item)=>{
              const discountPercentage = ((item.original_price - item.selling_price) / item.original_price) * 100;
              const creationDate = new Date(item.created_at);
              const today = new Date();
              const timeDifference = today.getTime() - creationDate.getTime();
              const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
              const isNew = daysDifference <= 1;
              let countdownElement;
              if (item.sale === 1) {

                const saleStartDate = new Date(item.sale_start_date);
                const saleEndDate = new Date(item.sale_end_date);
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
              return (
                <div className="col-6 col-md-4 col-xl-3">
                  <div className="grid_item">
                    {item.sale === 1 && (
                      <span className={`ribbon off ${isNew ? 'ml-10' : ''}`}>{`-${discountPercentage.toFixed(0)}%`}</span>
                    )
                    }
                    {isNew && (
                      <span className="ribbon new">New</span>
                    )}
                    <figure>

                      <Link to={item.slug}>
                        <img className="img-fluid lazy" src={`http://127.0.0.1:8001/${item.image}`}
                             data-src={`http://127.0.0.1:8001/${item.image}`} alt=""/>
                      </Link>
                      {countdownElement}
                    </figure>
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
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a></li>
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to compare"><i
                        className="ti-control-shuffle"></i><span>Add to compare</span></a>
                      </li>
                      <li><a href="#0" className="tooltip-1" data-bs-toggle="tooltip" data-bs-placement="left"
                             title="Add to cart"><i className="ti-shopping-cart"></i><span>Add to cart</span></a></li>
                    </ul>
                  </div>

                </div>
              )
            })

            }


            <div className="col-6 col-md-4 col-xl-3">
              <div className="grid_item">
                <span className="ribbon off">-50%</span>
                <figure>
                  <a href="product-detail-1.html">
                    <img className="img-fluid lazy" src="img/products/product_placeholder_square_medium.jpg"
                         data-src="img/products/shoes/3.jpg" alt=""/>
                  </a>
                  <div data-countdown="2019/05/21" className="countdown"></div>
                </figure>
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
                  </a>
                </figure>
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
                  </a>
                </figure>
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
                  </a>
                </figure>
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
                  </a>
                </figure>
                <a href="product-detail-1.html">
                  <h3>Armor Air 98</h3>
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
                  </a>
                </figure>
                <a href="product-detail-1.html">
                  <h3>Armor Air 720</h3>
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


          <div className="pagination__wrapper">
            <ul className="pagination">
              <li><a href="#0" className="prev" title="previous page">&#10094;</a></li>
              <li>
                <a href="#0" className="active">1</a>
              </li>
              <li>
                <a href="#0">2</a>
              </li>
              <li>
                <a href="#0">3</a>
              </li>
              <li>
                <a href="#0">4</a>
              </li>
              <li><a href="#0" className="next" title="next page">&#10095;</a></li>
            </ul>
          </div>

        </div>


    </>
)
}
export default ViewCategory
