import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import { ArrowUpDownIcon  } from "lucide-react";
import { sortOptions } from "@/config";
import ShoppingProductTile from "./ShoppingProductTile";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProduct } from "@/store/shop/product-slice";
import { useEffect } from "react";



function ShoppingListing() {

  const dispatch = useDispatch()

  function handleGetProductDetails() {

  }

  const {productList} = useSelector((state) => state.shopProducts)

  console.log(productList);

  useEffect(() => {
    dispatch(getFilteredProduct())
  }, [dispatch])
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter  />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  // handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
