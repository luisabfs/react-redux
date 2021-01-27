import { useState, useEffect } from 'react';

import { IProduct } from '../store/modules/cart/types';

import CalatogItem from './CatalogItem';

import api from '../services/api';

function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data);
    });
  }, []);

  return (
    <main>
      <h1>Catalog</h1>

      {catalog.map(product => (
        <CalatogItem key={product.id} product={product} />
      ))}
    </main>
  );
}

export default Catalog;
