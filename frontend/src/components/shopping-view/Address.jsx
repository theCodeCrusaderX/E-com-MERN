import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,  // corrected function name
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";

function Address({setCurrAddress}) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  console.log("address fetched", addressList);

  // Function to handle form submission
  const onSubmit = (data) => {

    if (addressList.length >= 3 && currentEditedId === null) {
        alert("You can't add more than 3 addresses.");
        return;
    } 

    data.userId = user._id;



    if (currentEditedId) {
      // Editing existing address
      
      dispatch(editAddress({ userId: user._id, addressId: currentEditedId, formData: data })).then(() => {
        dispatch(fetchAllAddresses(user._id));
        setCurrentEditedId(null); // Reset after update
        reset(); // Clear form fields
      });
    } else {
      // Adding new address
      dispatch(addNewAddress(data)).then(() => {
        dispatch(fetchAllAddresses(user._id));
        reset(); // Clear form fields
      });
    }
  };

  // Function to handle deletion of an address
  function handleDeleteAddress(cardId) {
    dispatch(deleteAddress({ userId: user._id, addressId: cardId })).then(() => 
      dispatch(fetchAllAddresses(user._id))
    );
  }

  // Function to handle edit click and pre-fill form
  function handleEditAddress(address) {

    setCurrentEditedId(address._id);  // Track which address is being edited
    setValue("address", address.address);
    setValue("city", address.city);
    setValue("pincode", address.pincode);
    setValue("phone", address.phone);
    setValue("notes", address.notes);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user._id));
  }, [dispatch, user._id]);

  return (
    <Card>
      <h2 className="text-lg font-bold">Address List</h2>
      <div className="flex gap-2 p-2">
        {addressList.map((item) => (
          <AddressCard
            key={item._id}
            cardInfo={item}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setCurrAddress={setCurrAddress}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Address</Label>
        <Input placeholder="Enter Address" {...register("address")} />

        <Label>City</Label>
        <Input placeholder="Enter City" {...register("city")} />

        <Label>Pin Code</Label>
        <Input placeholder="Enter Pin Code" {...register("pincode")} />

        <Label>Phone</Label>
        <Input placeholder="Enter Phone Number" {...register("phone")} />

        <Label>Notes</Label>
        <Input placeholder="Enter Notes" {...register("notes")} />

        <Button className="w-full mt-4" type="submit">
          {currentEditedId ? "Update" : "Add"}
        </Button>
      </form>
    </Card>
  );
}

export default Address;
