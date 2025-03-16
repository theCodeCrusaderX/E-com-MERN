import React from "react";
import { SheetContent, SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./UserCartItemsContent";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpen }) {
  const navigate = useNavigate();

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

  // console.log("store cart items :: ", cartItems);
  return (
    <SheetContent className="max-h-screen overflow-y-auto">
      <SheetHeader>your cart</SheetHeader>
      <div>Total</div>
      <div>{totalCartAmount}</div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpen(false);
        }}
      >
        checkOut
      </Button>
      <div>
        {cartItems &&
          cartItems.items?.map((it) => (
            <div className="flex flex-col">
              <UserCartItemsContent cartItem={it}></UserCartItemsContent>
            </div>
          ))}
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
