import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../loading/loading.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Empty, message, notification} from "antd";
import Item from "antd/es/list/Item";
interface Cart{
  user_id:number,
  product_id:number,
  product_qty:number,
  color_id:number,
  size_id:number,
  total_price:number,
}

function Cart(){

  const [cart, setCart]= useState<Cart[]>([]);
  const [loading, sertLoading]=useState(true);
  const navigate = useNavigate();
  if(!localStorage.getItem('auth_token')){
    navigate("/");
    notification.error({
      message: 'Error',
      description: "Login to view",
      placement:'bottomRight'
    });
  }
  let isMounted = true;

  useEffect(() => {
    if(isMounted){
      axios.get('api/show-cart').then(res=>{
        if(res.data.status===200){
          setCart(res.data.cart);
          sertLoading(false);
        }else if( res.data.status === 401){
          notification.warning({
            message: 'Warning',
            description: res.data.message,
            placement:'bottomRight'
          });
          navigate("/login");

        }
      })
    }


  }, []);
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
      message.error("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };
 if(loading){
   return (
     <Loading></Loading>
   )
 }
 const shiiping = 7;
 const totalCartPrice = cart.reduce((total, item) => total + item.total_price, 0);
const totalWithShipping = (totalCartPrice + shiiping);
  return(
    <>
        <div className="container margin_30">
          <div className="page_header">
            <div className="breadcrumbs">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Category</a></li>
                <li>Page active</li>
              </ul>
            </div>
            <h1>Cart page</h1>
          </div>
          {cart && cart.length > 0 ? (
          <table className="table table-striped cart-list">
            <thead>
            <tr>
              <th>
                Product
              </th>
              <th>
                Price
              </th>
              <th>
                Quantity
              </th>
              <th>
                Subtotal
              </th>
              <th>

              </th>
            </tr>
            </thead>
            <tbody>
           {


              cart.map((item) => {
                const subtotal = item.product.original_price * item.product_qty;

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="thumb_cart">
                        <img src={`http://127.0.0.1:8001/${item.product.image}`} data-src={`http://127.0.0.1:8001/${item.product.image}`} className="lazy" alt="Image" />
                      </div>
                      <span className="item_cart">{item.product.name}</span>
                    </td>
                    <td>
                      <strong>${item.product.original_price}</strong>
                    </td>
                    <td>
                      <div className="numbers-row">
                        <input type="text" value={item.product_qty} id="quantity_1" className="qty2" name="quantity_1" />
                        <div className="inc button_inc">+</div>
                        <div className="dec button_inc">-</div>
                      </div>
                    </td>
                    <td>
                      <strong>{subtotal}</strong>
                    </td>
                    <td className="options">
                      <Link to={"#"} onClick={() => handleDelete(item.id)}><i className="ti-trash"></i></Link>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
            ) : (
             <div className="d-flex align-items-center justify-content-center"  style={{height:'490px', }}>
                <Empty
            style={{transform:'scale(1.5)'}}
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={
                <span>
                 Your cart is empty
                </span>
              }
            >
              <Link to="/"><Button type="primary">Continue Shoping</Button></Link>
            </Empty>
             </div>



            )}

        {cart.length===0?(
          <></>
        ):(
           <div className="row add_top_30 flex-sm-row-reverse cart_actions">
            <div className="col-sm-4 text-end">
              <button type="button" className="btn_1 gray">Update Cart</button>
            </div>
            <div className="col-sm-8">
              <div className="apply-coupon">
                <div className="form-group">
                  <div className="row g-2">
                    <div className="col-md-6"><input type="text" name="coupon-code" value="" placeholder="Promo code"
                                                     className="form-control"/></div>
                    <div className="col-md-4">
                      <button type="button" className="btn_1 outline">Apply Coupon</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

          }
        </div>
          {cart.length===0?(
            <div></div>
          ):(
            <div className="box_cart">
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <ul>
                  <li>

                           <span>Subtotal</span> $999.00


                  </li>
                  <li>

                    <span>Shipping</span> ${shiiping}
                  </li>
                  <li>

                           <span>Total</span> $111.00


                  </li>
                </ul>
                <Link to={`/checkout`} className="btn_1 full-width cart">Proceed to Checkout</Link>
              </div>
            </div>
          </div>

        </div>
          )
          }


    </>
  )
}

export default Cart
