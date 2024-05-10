import express from "express";
import {CreateOrders} from "../Controllers/paymentController.js";

const router = express.Router();
router.post("/create",CreateOrders);
// router.post("/card-detail",CardDetail);
export default router;