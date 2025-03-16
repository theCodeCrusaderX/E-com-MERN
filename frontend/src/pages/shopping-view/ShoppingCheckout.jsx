import React, { useEffect, useState } from "react";
import Address from "@/components/shopping-view/Address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/UserCartItemsContent";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currAddress, setCurrAddress] = useState(null);
  const [isPaymentStart,setIsPaymentStart] = useState(false)
  const {approvalURL} = useSelector((state) => state.shopOrder)

  const {toast} = useToast()

  const dispatch = useDispatch();

  console.log("cartItem form checkout page", cartItems);

  const totalCartAmount =
    cartItems && cartItems.items?.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.productSalePrice > 0
            ? currentItem?.productSalePrice
            : currentItem?.productPrice) *
          currentItem?.quantity,
        0
      )
      : 0;




  function handlePayment() {

    if(cartItems.length === 0) {
      toast({
        title : "please select any item to proceed",
        variant : "destructive"
      })

      return;
    }

    if(currAddress === null) {
      toast({
        title : "please select address",
        variant : "destructive"
      })

      return;
    }

    const orderData = {
      userId: user._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.productTitle,
        image: singleCartItem?.productImage,
        price:
          singleCartItem?.productSalePrice > 0
            ? singleCartItem?.productSalePrice
            : singleCartItem?.productPrice,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currAddress?._id,
        address: currAddress?.address,
        city: currAddress?.city,
        pincode: currAddress?.pincode,
        phone: currAddress?.phone,
        notes: currAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'payPal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date,
      orderUpdateDate: null,
      paymentId: '',
      payerId: '',
      cartId: cartItems?._id,
    }
    dispatch(createNewOrder(orderData)).then((res) => {
      if(res.payload.success) {
        isPaymentStart(true)
      }
    })
  }

  if(approvalURL) {
    window.location.href = approvalURL
  }

  return (
    <div className="flex flex-wrap">
      <div className="max-w-[50%]">
        <Address setCurrAddress={setCurrAddress} />
      </div>
      <div className="flex flex-wrap gap-2">
        {cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item) => (
            <UserCartItemsContent cartItem={item} />
          ))
          : null}
      </div>

      <div className="m-8">
        Total :- {totalCartAmount}
        <div>
          <Button onClick={handlePayment}>Proceed To Payment</Button>
        </div>
      </div>

    </div>
  );
}

export default ShoppingCheckout;
