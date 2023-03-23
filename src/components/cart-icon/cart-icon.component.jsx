import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import { isCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { selectCartCount } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';




const CartIcon = () => {
  const dispatch = useDispatch()
  const selectCartOpen  = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const toggleIsCartOpen = () => dispatch(isCartOpen((!selectCartOpen)))
  
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon  />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
