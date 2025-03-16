import React, { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Dialog } from "@/components/ui/dialog";

import { useForm, Controller } from "react-hook-form";
import AdminOrderDetailsView from "../../components/shopping-view/AdminOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAllUser,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/admin/order-slice";

function AdminOrder() {
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);

  const { register, control, reset } = useForm({
    defaultValues: {
      status: "",
    },
  });

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetails(id));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAllUser());
  }, [dispatch]);

  console.log("orderList", orderList);

  useEffect(() => {
    if (orderDetails !== null) setOpenProductDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div>
      <div>Order List :--</div>
      <div>
        <Table>
          <TableHeader>
            <TableHead>orderId</TableHead>
            <TableHead>orderDate</TableHead>
            <TableHead>status</TableHead>
            <TableHead>price</TableHead>
            <TableHead></TableHead>
          </TableHeader>
          <TableBody>
            {orderList?.length > 0 &&
              orderList.map((orderItem) => (
                <TableRow>
                  <TableCell>{orderItem._id}</TableCell>
                  <TableCell>{orderItem.orderDate}</TableCell>
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
                        onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrder;
