export default function DeleteProductBtn({ id, delProduct }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/products/productpage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
    delProduct(id);
  };

  return (
    <button className="" onClick={handleDelete}>
      Delete
    </button>
  );
}
