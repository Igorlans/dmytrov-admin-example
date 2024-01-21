"use client"

import OrderItem from './OrderItem';
import { useState, useEffect } from 'react';



const OrderMain = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function fetchData() {
        const res = await fetch(`https://twinsann-next.vercel.app/api/order/?type=all`, {
            method: "GET"
        })
        const categoryData = await res.json();
        setData(categoryData.data);
    }

    async function updateData(id, status) {
      console.log(status)
      const data = { id: id, updateData: {approved: status} };
      const res = await fetch(`https://twinsann-next.vercel.app/api/reviews/`, {
        method: "PUT",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(() => fetchData())
      .catch(error => console.error(error));
    }
  
    useEffect(() => {
        fetchData();
    }, []);

    return (
        
      <div>
        {
          data.map((item) => (
            <OrderItem data={item} update={updateData}/>
          ))
          
        }
      </div>
    )
}

export default OrderMain;