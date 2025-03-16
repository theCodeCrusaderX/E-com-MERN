import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./ShoppingOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";

function ShoppingOrders() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?._id)).then((res) => console.log(res));
  }, [dispatch]);

  console.log("orderList", orderList);

  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetails(id));
  }

  useEffect(() => {
    if (orderDetails !== null) setOpenProductDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div>
      <div>Order List :--</div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList &&
              orderList.map((orderItem) => (
                <TableRow>
                  <TableCell>{orderItem._id}</TableCell>
                  <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                  <TableCell>{orderItem.orderStatus}</TableCell>
                  <TableCell>{orderItem.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openProductDetailsDialog}
                      onOpenChange={() => {
                        setOpenProductDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => (
                          handleFetchOrderDetails(orderItem?._id)
                        )}
                      >
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ShoppingOrders;
