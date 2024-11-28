import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware.js";
import handleImageUpload from "../../controllers/products.controller.js";

const router = Router();

router.route("/img-upload").post(upload.single("my_file"),handleImageUpload)

export default router;