import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

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

function AdminProduct() {
  const [openSheet, setOpenSheet] = useState(false);
  const { register, handleSubmit, control } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const onSubmit = (data) => {
    console.log("data",data);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setOpenSheet(true)}>Add Products</Button>
        <div className="flex flex-col">
          <Sheet open={openSheet} onOpenChange={() => setOpenSheet(!openSheet)}>
            <SheetContent className="overflow-auto">
              <SheetHeader>
                <SheetTitle onClick={() => setOpenSheet(!openSheet)}>
                  Add product
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
                <Input
                  type="text"
                  placeholder="Enter Product Tittle"
                  {...register("productTitle")}
                ></Input>
                <Label>Description</Label>
                <Textarea
                  type="text"
                  placeholder="Enter Product Description"
                  {...register("productDescription")}
                ></Textarea>
                <Label>Catagory</Label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Nike</SelectItem>
                        <SelectItem value="dark">Adidas</SelectItem>
                        <SelectItem value="Puma">Puma</SelectItem>
                        <SelectItem value="Levi's">Levi's</SelectItem>
                        <SelectItem value="Zara">Zara</SelectItem>
                        <SelectItem value="H&M">H&M</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <Label>Price</Label>
                <Input
                  type="text"
                  placeholder="Enter Product Price"
                  {...register("ProductPrice")}
                ></Input>
                <Label>Sale Price</Label>
                <Input
                  type="text"
                  placeholder="Enter Sale Price (optional)"
                  {...register("ProductSalePrice")}
                ></Input>
                <Label>Total Stock</Label>
                <Input
                  type="text"
                  placeholder="Enter Total Stock"
                  {...register("TotalStock")}
                ></Input>
                <Button type="Submit">Add</Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
