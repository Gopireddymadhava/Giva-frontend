import { useState,useEffect,React} from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Product } from './Product';
import axios from 'axios';


export const Productview = () => {
  const [prod, setProd] = useState([]);
    const { productId } = useParams();


    useEffect(() => {
        
        axios.get(`http://localhost:8080/products/getproduct/${productId}`)
            .then(response => {
                setProd(response.data)
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [productId]);
    // console.log(categoryId)

  return (
    <div>
   <Product prod={prod}/>
    </div>
  )
}
