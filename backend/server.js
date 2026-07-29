// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import { errorHandler, notFound } from "./middlewares/errorHandler.js";
// import userRoutes from "./user/user.routes.js";
// import productRoutes from "./product/product.route.js";
// import cartRoutes from "./cart/cart.route.js";
// import orderRoutes from "./order/order.route.js";
// import bannerRoutes from "./banner/banner.route.js";
// import wishlistRoutes from "./wishlist/wishlist.route.js";


// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/banners", bannerRoutes);
// app.use("/api/wishlist", wishlistRoutes);

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// app.use("/api/users", userRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import { errorHandler, notFound } from "./middlewares/errorHandler.js";

import userRoutes from "./user/user.routes.js";
import productRoutes from "./product/product.route.js";
import cartRoutes from "./cart/cart.route.js";
import orderRoutes from "./order/order.route.js";
import bannerRoutes from "./banner/banner.route.js";
import wishlistRoutes from "./wishlist/wishlist.route.js";

dotenv.config();
console.log("NODE_ENV is:", process.env.NODE_ENV);
connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});