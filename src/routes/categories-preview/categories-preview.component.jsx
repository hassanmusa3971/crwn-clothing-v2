import React, {  Fragment } from 'react';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from "../../components/spiner/spiner.component"
import { useSelector } from 'react-redux';


const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
 return (
    <Fragment>
      {
        isLoading ? <Spinner /> :
       ( Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return(
            <CategoryPreview key={title}  title={title} products={products} />
          )
        }))
      }
    </Fragment>
  );
}

export default CategoriesPreview;
