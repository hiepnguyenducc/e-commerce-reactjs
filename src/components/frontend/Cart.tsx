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
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const navigate = useNavigate();
  const [applyCouponInput, setApplyCouponInput] = useState({
    code:'',
  })
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
  const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.total_price as string), 0);
  const shipping = 7;
  const total = subtotal + shipping;
  const formattedTotal = total.toFixed(2);

  const handleInput =(e)=>{
    setApplyCouponInput({...applyCouponInput,[e.target.name]:e.target.value})
  }
  const calculateDiscountedTotal = (cart, discountType, discountValue) => {
    let total = cart.reduce((acc, item) => acc + parseFloat(item.total_price), 0);
    if (discountType === "percentage") {
      total *= (1 - discountValue / 100);
    } else if (discountType === "fixed") {
      total -= discountValue;
    }
    return total.toFixed(2);
  };
  const handleApplyCoupon = async (e) => {

    const data ={
      code:applyCouponInput.code,
      total_price:formattedTotal,
    }
    axios.post(`api/apply-coupon`,data).then(res=>{
      if(res.data.status === 200){
        const discount = res.data.discount; // Destructure discount object
        setDiscountedTotal(
          calculateDiscountedTotal(cart, discount.type, discount.value)
        );
        const new_total_price = res.data.new_total_price;
        console.log('new total price',new_total_price);


      }else if(res.data.status === 422){
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement: 'bottomRight',
        });
      }
      else if(res.data.status === 404){
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement: 'bottomRight',
        });
      }else if(res.data.status === 400){
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement: 'bottomRight',
        });
      }else if(res.data.status === 500){
        notification.error({
          message: 'Error',
          description: res.data.message,
          placement: 'bottomRight',
        });
      }
    })
  };
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
                      <strong>{item.total_price}</strong>
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
                    <div className="col-md-6"><input type="text" name="code" value={applyCouponInput.code} onChange={handleInput} placeholder="Promo code"
                                                     className="form-control"/></div>
                    <div className="col-md-4">
                      <button type="button" className="btn_1 outline" onClick={handleApplyCoupon}>Apply Coupon</button>
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
          ): (
            <div className="box_cart">
              <div className="container">
                <div className="row justify-content-end">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <ul>
                      <li>
                        <span>Subtotal</span> ${subtotal}.00
                      </li>
                      {discountedTotal > 0 && ( // Check if discountedTotal is available
                        <li>
                          <span>Discount</span> -${
                          (subtotal - discountedTotal).toFixed(2)
                        }
                        </li>
                      )}
                      <li>
                        <span>Shipping</span> ${shipping}.00
                      </li>
                      <li>
                        <span>Total</span> ${
                        discountedTotal > 0 ? discountedTotal : formattedTotal
                      }
                      </li>
                    </ul>
                    <Link to={`/checkout`} className="btn_1 full-width cart">
                      Proceed to Checkout
                    </Link>
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
