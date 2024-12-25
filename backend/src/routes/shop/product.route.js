import { Router } from "express";
import { getFilteredProduct } from "../../controllers/shop/products.controller.js";

const router = Router();

router.route("/getProduct").get(getFilteredProduct)

export default router;