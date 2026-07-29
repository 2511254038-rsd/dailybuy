"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as authService from "@/services/authService";
import { Customer } from "@/services/authService";
import Loading from "@/components/common/Loading";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    const res = await authService.getCustomers();
    setCustomers(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleDisabled = async (customer: Customer) => {
    try {
      await authService.setCustomerDisabled(customer.id, !customer.isDisabled);
      toast.success(customer.isDisabled ? "Customer re-enabled" : "Customer disabled");
      fetchCustomers();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update customer"));
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Customers</h1>
      <table className="w-full text-sm border rounded overflow-hidden">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-3 py-2">{c.name}</td>
              <td className="px-3 py-2">{c.email}</td>
              <td className="px-3 py-2">{c.isDisabled ? "Disabled" : "Active"}</td>
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => toggleDisabled(c)}
                  className={c.isDisabled ? "text-green-600" : "text-red-500"}
                >
                  {c.isDisabled ? "Enable" : "Disable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}