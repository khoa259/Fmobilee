// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import { formatCash } from "../formatCash";

// const SingleProduct = ({ product }) => {
//   const { title, description, images, slug, _id } = product;
//   return (
//     <div className="card">
//       _id: {product._id}
//       <div className="row g-0">
//         <div className="col-md-6 border-end">
//           <div className=" ">
//             <Carousel showArrows={true} infiniteLoop>
//               {/* {product.images?.map((i) => (
//                 <img src={i.url} key={i.public._id} />
//               ))} */}
//             </Carousel>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="p-3 right-side">
//             <div className="d-flex justify-content-between align-items-center">
//               <h3>{product.title}</h3>
//               <span className="heart">
//                 <i className="bx bx-heart" />
//               </span>
//             </div>
//             <div className="mt-2 pr-3 content">
//               <p>{product.description}</p>
//             </div>
//             <span>441 reviews</span>
//             <h3 className="price">{formatCash(`${product.price}`)}đ</h3>

//             <div className="mt-2">
//               <span className="fw-bold">Color</span>
//               <div className="colors">
//                 <ul className="marker d-flex">
//                   <li className="marker-1" /> <li className="marker-2" />
//                   <li className="marker-3" /> <li className="marker-4" />
//                   <li className="marker-5" />
//                 </ul>
//               </div>
//             </div>
//             <div className="inputs">
//               <button className=" decrements btn btn-outline-dark">
//                 <i className="fa-solid fa-minus"></i>
//               </button>
//               <input
//                 type="number"
//                 min={0}
//                 max={20}
//                 maxLength={2}
//                 placeholder="1"
//               />
//               <button className="increments btn btn-outline-dark">
//                 <i className="fa-solid fa-plus"></i>
//               </button>
//             </div>
//             <div className="buttons d-flex flex-row mt-2  gap-3">
//               {/* <button className="btn btn-outline-dark">Mua ngay</button> */}
//               <button className="btn btn-dark">
//                 <i className="fa-solid fa-cart-plus mr-2"></i>
//                 Thêm vào giỏ hàng
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
