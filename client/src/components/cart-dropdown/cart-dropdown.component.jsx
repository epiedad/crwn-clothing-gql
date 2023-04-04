import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import {
  useNavigate,
} from "react-router-dom";

import './cart-dropdown.styles.scss';

const withRouter = Component => {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return (
      <Component
        {...props}
        router={{ navigate }}
      />
    );
  }

  return ComponentWithRouterProp;
}
const CartDropdown = ({ cartItems, router, dispatch }) => {
  return (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length 
                ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                : (
                    <span className='empty-message'>Your cart is empty</span>
                )
            }
        </div>
        <CustomButton onClick={() => {
          router.navigate('/checkout');
          dispatch(toggleCartHidden());
        }}>
        GO TO CHECKOUT
        </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})
export default connect(mapStateToProps)(withRouter(CartDropdown));