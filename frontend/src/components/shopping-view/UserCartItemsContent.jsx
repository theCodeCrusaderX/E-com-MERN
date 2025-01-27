import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";


function UserCartItemsContent({ cartItem }) {
  const toast = useToast()
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()


  function handleDeleteCartItem(productId) {
    dispatch(deleteCartItem({userId : user?._id,productId})).then((data) => {
      if(data.payload.succuss) {
        toast({title : "item deleted!"})
      }
    })
  }

  function handleUpdateCartItems(productId,quantity) {
    dispatch(updateCartQuantity({userId : user._id,productId,quantity})).then((data) => {
      if(data.payload.succuss) {
        toast({title : "item updated!"})
      }
    })
  }


  return (
    <div>
        <div>
          {cartItem.productId} 
          <br />
          {cartItem.productPrice} 
          <br />
          {cartItem.productTitle}
          <div>
            <img src={cartItem.image} alt="" />
          </div>
          <br />
          <div className="text-3xl">{cartItem.quantity}</div>
          <Button onClick={() => handleUpdateCartItems(cartItem.productId,cartItem.quantity+1)}>+</Button>
          <br />
          <Button disabled={cartItem.quantity === 1} onClick={() => handleUpdateCartItems(cartItem.productId,cartItem.quantity-1)}>-</Button>
          <br />
          Total :- 
          {((cartItem.productSalePrice > 0 ? cartItem.productSalePrice : cartItem.productPrice)*cartItem.quantity).toFixed(2)}
          <Button onClick={() => handleDeleteCartItem(cartItem.productId)} >Delete</Button>
          <hr />
        </div>
    </div>
  );
}

export default UserCartItemsContent;
