import React, { useEffect, useState } from 'react'

function Basket() {
    const [data, setdata] = useState([])
    const [basket, setBasket] = useState(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem("basket")): [])

    
    useEffect(()=>{localStorage.setItem("basket",JSON.stringify(basket))
},[basket])

    useEffect(() => {
      async function getData() {
        const data = await fetch("https://northwind.vercel.app/api/products")
        const res = await data.json()
        setdata(res)
    }
    getData()
    }, [])
    
    function AddToBasket(item) {
      let index = basket.findIndex((x)=>x.id===item.id)
      if (index !==-1) {
        const Newb = [...Basket]
        Newb[index].count++
        setBasket(Newb)
      }
      else{
        setBasket([...basket,{...item,count:1}])
      }
      
    }
    function Remove(id) {
      setBasket(basket.filter((x)=>x.id !==id))
    }
  return (
    <div>
      <div className="basket" style={{backgroundColor:"olive", height:"20vh",display:"flex"}}>
      {basket.map((item)=>(
          <ul key={item.id}>
            <li > {item.name} </li>
            <li > {item.quantityPerUnit} </li>
            <li>Count: {item.count} </li>
            <button onClick={()=>Remove(item.id)}>Remove</button>
          </ul>
        )
            
        )
        }
      </div>

      <div className="card">
      {data.map((x)=>(
          <ul key={x.id}>
            <li > {x.name} </li>
            <li > {x.quantityPerUnit} </li>
            <button onClick={()=>AddToBasket(x)}>Add</button>
          </ul>
        )
            
        )
        }
      </div>
        
    </div>
  )
}

export default Basket