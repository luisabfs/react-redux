import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../store';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCartRequest } from '../store/modules/cart/actions';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasStockCheckFailure = useSelector<IState, boolean>(state => {
    return state.cart.stockCheckFailure.includes(product.id);
  })
  
  console.log(hasStockCheckFailure)

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
    <strong>{product.title}</strong> {" - "}
    <span>{product.price}</span> {"  "}

    <button 
      type="button" 
      disabled={hasStockCheckFailure}
      onClick={handleAddProductToCart}
    >
      Comprar
    </button> {"  "}

    {hasStockCheckFailure && <span style={{color: "red"}}>Sem estoque</span>}
  </article>
  );
}

export default CatalogItem;