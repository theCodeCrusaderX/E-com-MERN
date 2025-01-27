import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";


import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin-view/ImageUpload";
import {
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "@/store/admin/products-slice";
import { toast } from "@/hooks/use-toast";

import AdminProductTile from "@/components/admin-view/AdminProductTile";

function AdminProduct() {
  const { handleSubmit, reset, control } = useForm({
    defaultValues : {
      productTitle : "",
      productDescription : "",
      category : "",
      brand : "",
      productPrice: 0,
      productSalePrice : 0,
      totalStock : 0
    }
  });
  const [openSheet, setOpenSheet] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  // console.log("currentEditedId",currentEditedId);
  // console.log("productToEdit", productToEdit);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)).then((data) => {
      if (data.payload.success === true) {
        dispatch(fetchAllProducts());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit); // Prefill form for editing
    } else {
      reset({
        productTitle: "",
        productDescription: "",
        category: "",
        brand: "",
        productPrice: "",
        productSalePrice: "",
        totalStock: "",
      }); // Clear form for adding a new product
    }
  }, [productToEdit, reset]);

  const onSubmit = (data) => {
    //ready to send data to backend;
    const updatedData = {
      ...data,
      image: uploadedImageUrl,
    };

    console.log("data", data);

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: data,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            setImageFile(null); // Reset image when form is successfully submitted
            setUploadedImageUrl("");
            dispatch(fetchAllProducts());
            reset();
            setOpenSheet(false);
            toast({
              title: "Product edited successfully!",
            });
          }
        })
      : dispatch(addNewProduct(updatedData)).then((data) => {
          if (data?.payload?.success) {
            setImageFile(null); // Reset image when form is successfully submitted
            setUploadedImageUrl("");
            dispatch(fetchAllProducts());
            reset();
            setOpenSheet(false);
            toast({
              title: "Product added successfully!",
            });
          }
        });
  };  

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setOpenSheet(true)}>Add Products</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                product={productItem}
                setOpenSheet={setOpenSheet}
                setCurrentEditedId={setCurrentEditedId}
                setProductToEdit={setProductToEdit}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openSheet}
        onOpenChange={() => {
          setOpenSheet(false);
          setProductToEdit(null); // Clear any product edit state
          setImageFile(null); // Reset image
          setUploadedImageUrl(""); // Reset image URL
          setCurrentEditedId(null);
        }}
      >
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId != null ? "Edit Product" : "Add product"}
            </SheetTitle>
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Title</Label>
            <Controller
              name="productTitle"
              control={control}
              type="text"
              render={({ field }) => <Input {...field} />}
            />
            <Label>Description</Label>
            <Controller
              name="productDescription"
              control={control}
              type = "text"
              render={({ field }) => <Textarea {...field} />}
            />
            <Label>Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value} // Dynamically set value
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Label>Brand</Label>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  value={field.value} // Dynamically set value
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nike">Nike</SelectItem>
                    <SelectItem value="adidas">Adidas</SelectItem>
                    <SelectItem value="puma">Puma</SelectItem>
                    <SelectItem value="levi's">Levi's</SelectItem>
                    <SelectItem value="zara">Zara</SelectItem>
                    <SelectItem value="h&m">H&M</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Label>Price</Label>
            <Controller
              name="productPrice"
              placeholder = "Enter Product Price"
              type="number"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <Label>Sale Price</Label>
            <Controller 
              name="productSalePrice"
              placeholder="Enter Product Sale Price"
              control={control}
              type="number"
              render={({field}) => <Input {...field}/>}
            />
            <Label>Total Stock</Label>
            <Controller 
              name="totalStock"
              placeholder="Enter total stock"
              control={control}
              type="number"
              render={({field}) => <Input {...field}/>}
            />
            <Button type="submit">
              {currentEditedId != null ? "Update" : "Add"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminProduct;
