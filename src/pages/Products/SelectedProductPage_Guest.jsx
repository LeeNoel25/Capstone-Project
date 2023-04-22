import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SelectedProductPage({ products }) {
  const { productName } = useParams();
  const product = products.filter((p) => p.name === productName);

  return (
    <>
      <div>
        <div>
          {product.map((p) => (
            <div key={p._id} className="row">
              <div>
                <img className="" src={p.imgurl} alt={p.name} />
              </div>
              <div className="">
                <div className="">
                  <div className="">{p.brand}</div>
                  <div className="">{p.name}</div>
                  <div className="">
                    {(p.price / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "SGD",
                    })}
                  </div>
                  <div className="">Description: {p.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
