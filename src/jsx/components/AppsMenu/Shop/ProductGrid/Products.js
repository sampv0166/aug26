import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div
              className="new-arrivals-img-contnent"
              style={{ height: "200px", objectFit: "contain" }}
            >
              <img
                className="img-fluid"
                src={product.variations[0].images[0]}
                alt=""
                style={{ height: "200px", objectFit: "contain" }}
              />
            </div>
            <div className="new-arrival-content text-center mt-3">
              <h4>
                <Link to={`/ecom/product-edit/${product.id}`}>
                  {product.name}
                </Link>
              </h4>

              {/*rating*/}

              {/* <span className="">AED {price}</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
