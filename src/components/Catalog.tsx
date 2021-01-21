import React from 'react';
import { useSelector } from 'react-redux';

function Catalog() {
  const state = useSelector(state => state);

  console.log(state)

  return (
    <div>
      <h1>Catalog</h1>
    </div>
  );
}

export default Catalog;
