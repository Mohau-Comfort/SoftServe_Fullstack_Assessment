import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../Api/ApiService.ts';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        console.log('Fetched data:', data);
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.customerId !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId}>
            {customer.firstName} {customer.lastName}{' '}
            <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;