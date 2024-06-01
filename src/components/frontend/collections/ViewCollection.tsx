import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
import {Link, useParams} from "react-router-dom";

interface ProductData {
  productUnder50: string[];
  product50to100: string[];
  product100to150: string[];
  product150to200: string[];
  productAbove200: string[];
  original_price:number
}
interface Product{
  id:number,
  name:string,
  slug:string,
  original_price:number,
  selling_price:number,
  sale:number,
  sale_start_date:string,
  sale_end_date:string,
  created_at:string,
  description:string,
  category_id:number,
  image:string,

}
interface Category{
  id:number
  name:string
  product_count:number
}
interface Color{
  id:number,
  name:string,

}
interface Brand{
  id:number,
  name:string
}

function ViewCollection(){
  const [category, setCategory]= useState<Category[]>([]);
  const [color, setColor]= useState<Color[]>([]);
  const [brand, setBrand]= useState<Brand[]>([]);
  const [loading,setLoading]=useState(true);
  const [price, setPrice]= useState<ProductData[]>([]);
  const [product,setProduct]= useState<Product[]>([]);

  const [checkedItems, setCheckedItems] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const ids = Object.keys(checkedItems).filter(key => checkedItems[key]);
    setSelectedIds(ids);
  }, [checkedItems]);
  const { id } = useParams();

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id]
    }));

  };

  useEffect(() => {
    const selectedIds = Object.keys(checkedItems).filter(key => checkedItems[key]);
    if (selectedIds.length > 0) {
      fetchProductsByCategory(selectedIds);
    } else {

      fetchProductsByCollection(id);
    }
  }, [checkedItems]);
  const fetchProductsByCollection = (id) => {
    axios.get(`/api/getProductByCollection/${id}`)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    axios.get(`api/getCategoryByCollection/${id}`).then(res=>{
      if(res.data.status===200){
        setCategory(res.data.category);
      }
    })

    axios.get(`api/getCategoryByCollection/${id}`).then(res => {
      if (res.data.status === 200) {
        setCategory(res.data.category);
      }
    });

    axios.get(`api/getColor`).then(res=>{
      if(res.data.status===200){
        setColor(res.data.color)
        setLoading(false);
      }
    })
    axios.get(`api/getBrand`).then(res=>{
      if(res.data.status===200){
        setBrand(res.data.brand)
        setLoading(false);
      }
    })
    axios.get(`api/getPriceProduct`).then(res=>{
      if(res.data.status===200){
        const { productUnder50, product50to100, product100to150, product150to200, productAbove200 } = res.data;
        const allProducts = [...productUnder50, ...product50to100, ...product100to150, ...product150to200, ...productAbove200];
        setPrice(allProducts);
        setLoading(false);
      }
    })
    fetchProductsByCategory([]);
  }, [id]);

  useEffect(() => {
    if (selectedIds.length > 0) {
      fetchProductsByCategory(selectedIds);
    }
  }, [selectedIds,id]);

  const fetchProductsByCategory = (selectedIds) => {
    const endpoint = selectedIds.length > 0
      ? `/api/getProductByCategory/${selectedIds.join(',')}`
      : `/api/getProductByCollection/${id}`;
    axios.get(endpoint)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    if (selectedIds.length > 0) {
      axios.get(`/api/getProductByCategory/${selectedIds.join(',')}`)
        .then(response => {
          setProduct(response.data.product);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log('No categories selected.');

    }
  }, [selectedIds]);

  if(loading){
    return (
      <>
      <Loading></Loading>
      </>
    )
  }

  const countProductUnder50 = price.filter(item => item.original_price < 50).length;
  const countProduct50to100 = price.filter(item => item.original_price >= 50 && item.original_price <= 100).length;
  const countProduct100to150 = price.filter(item => item.original_price > 100 && item.original_price <= 150).length;
  const countProduct150to200 = price.filter(item => item.original_price > 150 && item.original_price <= 200).length;
  const countProductAbove200 = price.filter(item => item.original_price > 200).length;

  return(
    <>
      <div className="container margin_30">
        <div className="row">
          <aside className="col-lg-3" id="sidebar_fixed">
            <div className="filter_col">
              <div className="inner_bt"><a href="#" className="open_filters"><i className="ti-close"></i></a></div>
              <div className="filter_type version_2">

                <h4><a href="#filter_1" data-bs-toggle="collapse" className="opened">Categories</a></h4>

                <div className="collapse show" id="filter_1">
                  <ul>
                    {category.map(category => (
                      <li key={category.id}>
                        <label className="container_check">
                          {category.name}
                          <small>{category.product_count}</small>
                          <input
                            type="checkbox"
                            checked={checkedItems[category.id] || false}
                            onChange={() => handleCheckboxChange(category.id)}
                            onClick={() => handleCheck(category.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>
              <div className="filter_type version_2">
                <h4><a href="#filter_2" data-bs-toggle="collapse" className="opened">Color</a></h4>
                <div className="collapse show" id="filter_2">
                  <ul>
                    {color.map((item)=>{
                      return (
                        <li>
                          <label className="container_check">{item.name} <small>{item.product_count}</small>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                          </label>
                        </li>
                      )
                    })
                    }
                  </ul>
                </div>
              </div>

              <div className="filter_type version_2">
                <h4><a href="#filter_3" data-bs-toggle="collapse" className="closed">Brands</a></h4>
                <div className="collapse" id="filter_3">
                  <ul>
                    {brand.map((item)=>{
                      return (
                        <li>
                          <label className="container_check">{item.name}<small>{item.product_count}</small>
                            <input type="checkbox"/>
                            <span className="checkmark"></span>
                          </label>
                        </li>
                      )
                    })
                    }

                  </ul>
                </div>
              </div>

              <div className="filter_type version_2">
                <h4><a href="#filter_4" data-bs-toggle="collapse" className="closed">Price</a></h4>
                <div className="collapse" id="filter_4">
                  <ul>
                    <li>
                      <label className="container_check">Under $50<small>{countProductUnder50}</small>
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">$50 — $100<small>{countProduct50to100}</small>
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">$100 — $150<small>{countProduct100to150}</small>
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">$150 — $200<small>{countProduct150to200}</small>
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">Above $200<small>{countProductAbove200}</small>
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="buttons">
                <a href="#0" className="btn_1">Filter</a> <a href="#0" className="btn_1 gray">Reset</a>
              </div>
            </div>
          </aside>

          <div className="col-lg-9">
            <div className="top_banner">
              <div className="opacity-mask d-flex align-items-center" data-opacity-mask="rgba(0, 0, 0, 0.3)">
                <div className="container pl-lg-5">
                  <div className="breadcrumbs">
                    <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Collection</a></li>
                      <li>Page active</li>
                    </ul>
                  </div>
                  <h1>Shoes - Grid listing</h1>
                </div>
              </div>
              <img src="shome4.jpg" className="img-fluid" alt=""/>
            </div>

            <div id="stick_here"></div>
            <div className="toolbox elemento_stick add_bottom_30">
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
                    <a href="#0" className="open_filters">
                      <i className="ti-filter"></i><span>Filters</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {

              product.map((item) => {
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
                  <div className="row row_item">
                    <div className="col-sm-4">
                      <figure>
                        {item.sale === 1 && (
                          <span className={`ribbon off ${isNew ? 'ml-10' : ''}`}>{`-${discountPercentage.toFixed(0)}%`}</span>
                        )
                        }
                        {isNew && (
                          <span className="ribbon new">New</span>
                        )}

                        <Link to={`/${item.category_id}/${item.slug}`}>
                          <img className="img-fluid lazy" src={`http://127.0.0.1:8001/${item.image}`}
                               data-src="img/products/shoes/1.jpg" alt=""/>
                        </Link>
                        {countdownElement}
                      </figure>
                    </div>
                    <div className="col-sm-8">
                      <div className="rating"><i className="icon-star voted"></i><i className="icon-star voted"></i><i
                        className="icon-star voted"></i><i className="icon-star voted"></i><i className="icon-star"></i>
                      </div>
                      <Link to={`/${item.category_id}/${item.slug}`}>
                        <h3>{item.name}</h3>
                      </Link>
                      <p>{item.description}</p>
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
                        <li><a href="#0" className="btn_1">Add to cart</a></li>
                        <li><a href="#0" className="btn_1 gray tooltip-1" data-bs-toggle="tooltip"
                               data-bs-placement="top"
                               title="Add to favorites"><i className="ti-heart"></i><span>Add to favorites</span></a>
                        </li>
                        <li><a href="#0" className="btn_1 gray tooltip-1" data-bs-toggle="tooltip"
                               data-bs-placement="top"
                               title="Add to compare"><i className="ti-control-shuffle"></i><span>Add to compare</span></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              })
            }


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

        </div>

      </div>
    </>
)
}
export default ViewCollection
