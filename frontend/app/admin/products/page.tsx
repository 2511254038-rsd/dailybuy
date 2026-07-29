"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as productService from "@/services/productService";
import { Product } from "@/types";
import ProductForm from "@/components/admin/ProductForm";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await productService.getProducts({ limit: 100 });
    setProducts(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data: Partial<Product>) => {
    await productService.createProduct(data);
    setShowForm(false);
    fetchProducts();
  };

  const handleUpdate = async (data: Partial<Product>) => {
    if (!editing) return;
    await productService.updateProduct(editing._id, data);
    setEditing(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not delete product"));
    }
  };

  if (loading) return <Loading />;

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="text-sm text-gray-500 mb-4">← Back</button>
        <h1 className="text-lg font-semibold mb-4">Edit product</h1>
        <ProductForm initial={editing} onSubmit={handleUpdate} />
      </div>
    );
  }

  if (showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(false)} className="text-sm text-gray-500 mb-4">← Back</button>
        <h1 className="text-lg font-semibold mb-4">New product</h1>
        <ProductForm onSubmit={handleCreate} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Products</h1>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white rounded px-4 py-2 text-sm">
          + New product
        </button>
      </div>
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Price</th>
            <th className="px-3 py-2">Stock</th>
            <th className="px-3 py-2">Active</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-3 py-2">{p.title}</td>
              <td className="px-3 py-2">৳{p.price}</td>
              <td className="px-3 py-2">{p.stock}</td>
              <td className="px-3 py-2">{p.isActive ? "Yes" : "No"}</td>
              <td className="px-3 py-2 text-right space-x-3">
                <button onClick={() => setEditing(p)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}