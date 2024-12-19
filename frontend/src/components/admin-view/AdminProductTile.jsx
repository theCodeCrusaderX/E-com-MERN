import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useEffect } from "react";

function AdminProductTile({
  product,
  setOpenSheet,
  setCurrentEditedId,
  handleDeleteProduct,
  setProductToEdit
}) {

  // console.log("product",product);
  

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.productTitle}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.productTitle}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.productSalePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.productPrice}
            </span>
            {product?.productSalePrice > 0 ? (
              <span className="text-lg font-bold">${product?.productSalePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenSheet(true);
              setCurrentEditedId(product?._id);
              setProductToEdit(product)
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
