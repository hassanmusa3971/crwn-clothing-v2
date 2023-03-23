import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spiner/spiner.component"
import "./category.styles.scss"






const Category = () => {
  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {
        isLoading ? (<Spinner />) : (
          <div className="category-container">
            {
              products && products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        )
      }

    </Fragment>

  );
}

export default Category;
