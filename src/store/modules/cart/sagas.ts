<<<<<<< HEAD
import { all, takeLatest } from 'redux-saga/effects';

function checkProductStock() {
  console.log('Add product')
};

export default all([
  takeLatest('ADD_PRODUCT_TO_CART', checkProductStock),
]); 
=======
import { all, takeLatest, select, call, put } from 'redux-saga/effects';

import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';
import { IState } from '../..';
import { ActionTypes } from './types';

import { AxiosResponse } from 'axios';
import api from '../../../services/api';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload; 

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  const availableStockReponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

  if(availableStockReponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }

  console.log(currentQuantity);
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
>>>>>>> 1e28eaf1b76a526915fc90749a8719bcfc828445
