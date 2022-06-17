import { rootState } from '../../../redux/reducers/index';
import { addToCart } from '../../../redux/cart/action';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { MINIO_FULL_ENDPOINT_FOR } from '../../../constants/ApiConstants';
export default function ProductCard_() {
  type ProductParams = {
    id: string;
  };
  const {id} = useParams<ProductParams>(); 
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state: rootState) => state.productsReducer.filteredProducts);
  let product = filteredProducts.filter((product) => product.id === (id))[0];
  return (
    <>     
      <Link to={'/productlist'} className="btn btn-primary">Continue Shopping!</Link>
      <div className='my-form'>
      
        <div key={product?.id} style={{ width: '18rem' }}>
          <img src={`${MINIO_FULL_ENDPOINT_FOR}/product/${product.photo}`} height='200px' width='200px' alt={product.id} />
          <div>
            <title>{product.short_name}</title>
            <br></br>
            <br></br>
            <p className="title">DKK {product.price}</p>
            <Button onClick={() => { dispatch(addToCart(product)); }} value={product.short_name} >Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  )
}
