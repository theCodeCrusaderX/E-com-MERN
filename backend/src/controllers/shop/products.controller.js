import { Product } from "../../models/product.model.js";

const getFilteredProduct = async (req,res) => {
  try {
    const product = await Product.find({});

    console.log(product);
    

    if(!product) {
      return res.json({
        success : false,
        message : "product doesnot exist!"
      })
    }
    return res.json({
      success : true,
      data : product
    })
  } catch (error) {

    console.log(error);
    
    
    return res.json({
      success : false,
      message : error
    })
  }
}

export {getFilteredProduct}