import { StoreContext } from '../context/StoreContext'
import './MyOrders.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items.map((item, index) => (
                index === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `
              ))}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span><b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;