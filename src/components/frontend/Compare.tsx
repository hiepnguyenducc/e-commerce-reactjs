import { notification } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link} from 'react-router-dom'

function Compare() {
  const [compare, setCompare] = useState([])
  useEffect(() => {
    axios.get(`api/view-compare`).then(res => {
      if (res.data.status === 200) {
        setCompare(res.data.compare)
      } else if (res.data.status === 401) {
        notification.warning({
          message: 'Warning',
          description: res.data.errors,
          placement: 'bottomRight'
        })
      }
    })
  }, [])

  return (
    <>
      <section className="tp-compare-area mt-4 mb-4">
        <div className="container">
          <div className="tp-compare-table table-responsive text-center">
            <table className="table">
              <tbody>
                <tr>
                  <th>Product</th>
                  {compare.map((item) => (
                    <td>
                      <div className="tp-compare-thumb" ><img
                        src={`http://127.0.0.1:8001/${item.product.image}`}
                        loading="lazy"
                        className="thumbnail"
                        data-src="https://shofy.botble.com/storage/main/products/product-5-150x150.jpg"
                        alt="Sonos Beam Gen 2 Soundbar" />
                       
                      </div>
                      <h4 className="tp-compare-product-title"><Link
                         to={`/${item.product.slug}`}>{item.product.name}</Link></h4><span className="text-success"> (In stock)
                        </span>
                    </td>
                  ))
                  }

                </tr>
                <tr>
                  <th>Description</th>
                  {compare.map((item) => (
                    <td>
                      <div className="tp-compare-desc"> {item.product.description}</div>
                    </td>
                  ))

                  }

                </tr>
                <tr>
                  <th>Price</th>
                  {compare.map((item) => (
                    <td>
                      <div className="tp-compare-price"><span className=""
                        data-bb-value="product-price">${item.product.original_price}</span>
                        {item.product.sale ===1 ?(
                          <span className="">
                          <small>
                          <del data-bb-value="product-original-price">${item.product.selling_price}</del>
                          </small>
                          </span>
                        ):(
                          <span className=""
                        data-bb-value="product-price">${item.product.original_price}</span>
                        )
                        }
                
                      </div>
                    </td>
                  ))}

                </tr>
                <tr>
                  <th>SKU</th>
                  <td>#WL-144</td>
                  <td>#MW-159-A1</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td> &mdash; </td>
                  <td> &mdash; </td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td> &mdash; </td>
                  <td>
                    <div className="bb-product-attribute-list d-inline-block">
                      <ul className="d-flex flex-wrap gap-2 list-unstyled mb-0">
                        <li className="bg-body-tertiary border px-2"> 1KG </li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td> &mdash; </td>
                  <td> &mdash; </td>
                </tr>
               
                <tr>
                  <th>Add to cart</th>
                  <td>
                    <div className="tp-compare-add-to-cart"><button type="submit" className="tp-btn"
                      data-bb-toggle="add-to-cart"
                      data-url="https://shofy.botble.com/cart/add-to-cart" data-id="53"
                      data-bb-toggle="add-to-cart" data-product-id="53"
                      data-product-name="Sonos Beam Gen 2 Soundbar" data-product-price="1687"
                      data-product-sku="WL-144" data-product-brand="Soda Brand"
                      data-product-categories="Smart Watch,With Bluetooth,Sports,Remote Control">Add
                      to Cart</button></div>
                  </td>
                  <td>
                    <div className="tp-compare-add-to-cart"><button type="submit" className="tp-btn"
                      data-bb-toggle="add-to-cart"
                      data-url="https://shofy.botble.com/cart/add-to-cart" data-id="54"
                      data-bb-toggle="add-to-cart" data-product-id="54"
                      data-product-name="Bose Smart Soundbar 900" data-product-price="689"
                      data-product-sku="MW-159-A1" data-product-brand="Shofy"
                      data-product-categories="New Arrivals,Accessories,Gifts,TV, Video &amp; Music">Add
                      to Cart</button></div>
                  </td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td>
                    <div className="tp-compare-rating">
                      <div className="bb-product-rating page_speed_8746307"><span
                        className="page_speed_1422591629"></span></div>
                    </div>
                  </td>
                  <td>
                    <div className="tp-compare-rating">
                      <div className="bb-product-rating page_speed_8746307"><span
                        className="page_speed_1353162658"></span></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Remove</th>
                  <td>
                    <div className="tp-compare-remove"><button data-bb-toggle="remove-from-compare"
                      data-url="https://shofy.botble.com/compare/53"><svg className="icon"
                        xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24 }}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg></button></div>
                  </td>
                  <td>
                    <div className="tp-compare-remove"><button data-bb-toggle="remove-from-compare"
                      data-url="https://shofy.botble.com/compare/54"><svg className="icon"
                        xmlns="http://www.w3.org/2000/svg" style={{ width: 24, height: 24 }}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg></button></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  )
} export default Compare