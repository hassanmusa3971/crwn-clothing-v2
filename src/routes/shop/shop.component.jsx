import React, { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductsContext } from '../../contexts/products.contex';
import "./shop.styles.scss"

const Shop = () => {
    const { products } = useContext(ProductsContext)
  return (
    <div className='product-container'>
      {
        products.map((product) => (
            <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  );
}

export default Shop;
