import { useEffect, useState } from "react";
import axios from "axios";
import { message, notification, Empty,Button } from "antd";
import { Link, useParams } from "react-router-dom";

function WishList() {
  const [favorites, setFavorites] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    axios.get(`api/view-favorites`).then(res => {
      if (res.data.status === 200) {
        setFavorites(res.data.favorites)
      } else if (res.data.status === 401) {
        message.open({
          type: 'error',
          content: res.data.message
        })
      }
    })

  }, []);
  const handleIncrement = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const res = await axios.get(`api/delete-favorites/${id}`);
      if (res.data.status === 200) {
        message.open({
          type: 'success',
          content: res.data.message
        });

        setFavorites((prevFavorites) => prevFavorites.filter(item => item.product.id !== id));
      } else if (res.data.status === 404) {
        notification.error({
          message: 'Error',
          description: res.data.message
        });
      }
    } catch (error) {
      console.error('There was an error deleting the product:', error);
      message.open({
        type: 'error',
        content: 'An error occurred while trying to delete the product'
      });
    }
  };
  return (
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
          <h1>Wish List</h1>
        </div>
        {favorites.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center"  style={{height:'490px', }}>
           <Empty
            style={{transform:'scale(1.5)'}}
           image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
           imageStyle={{ height: 60 }}
           description={
             <span>
              Your wishlist is empty
             </span>
           }
         >
           <Link to="/"><Button type="primary">Continue Shoping</Button></Link>
         </Empty>
         </div>
        ) : (
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
                  Action
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((item) => {
                return (
                  <tr>
                    <td key={item.id}>
                      <div className="thumb_cart">
                        <img src={`http://127.0.0.1:8001/${item.product.image}`} data-src="img/products/shoes/1.jpg"
                          className="lazy" alt="Image" />
                      </div>
                      <span className="item_cart">{item.product.name}</span>
                    </td>
                    <td>
                      <strong>${item.product.original_price}</strong>
                    </td>
                    <td>
                      <div className="numbers-row">
                        <input type="text" value={item.quantity} id={`quantity_${item.product.id}`} className="qty2"
                          name={`quantity_${item.product.id}`} />
                        <div className="inc button_inc" onClick={() => handleIncrement(item.product.id)}>+</div>
                        <div className="dec button_inc" onClick={() => handleDecrement(item.product.id)}>-</div>
                      </div>
                    </td>
                    <td>
                      <button type="button" className="btn_1 gray">Add To Cart</button>
                    </td>
                    <td className="options">
                      <Link to="#" onClick={(e) => handleDelete(e, item.id)}><i className="ti-trash"></i></Link>
                    </td>
                  </tr>
                )
              })
              }

            </tbody>
            
          </table>
          
        )

          }
          {favorites.length===0?(
             <>
             </>
          ):(
             <div className="row add_top_30 flex-sm-row-reverse cart_actions">
                <div className="col-sm-4 text-end">
                   <button type="button" className="btn_1 gray">Go To Cart</button>
                </div>
             </div>
          )

          }
           
    </div >

    </>
  )
}

export default WishList
