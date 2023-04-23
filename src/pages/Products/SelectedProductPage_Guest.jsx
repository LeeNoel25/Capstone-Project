import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../OrderPage/CartContext";
import { useProducts } from "../../utilities/productStore";

export default function SelectedProductPage() {
  const products = useProducts();
  const { productName } = useParams();
  const product = products.filter((p) => p.name === productName);

  const cart = useContext(CartContext);
  const productQuantity =
    product.length > 0 ? cart.getProductQuantity(product[0]._id) : 0;

  return (
    <>
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
            <div className="">
              {productQuantity > 0 ? (
                <>
                  <div>In Cart: {productQuantity}</div>
                  <button onClick={() => cart.addOneToCart(p._id)}>+</button>
                  <button onClick={() => cart.removeOneFromCart(p._id)}>
                    -
                  </button>
                  <button onClick={() => cart.deleteFromCart(p._id)}>
                    Remove from cart
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    cart.addOneToCart(p._id);
                    console.log("Button clicked!");
                  }}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
