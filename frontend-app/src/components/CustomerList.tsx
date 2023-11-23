import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer, createCustomer } from '../Api/ApiService.ts';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

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

  const handleCreate = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateSubmit = async (formData: any) => {
    try {
      // Call your API to create a new customer with formData
      const newCustomer = await createCustomer(formData);
      // Update the state with the newly created customer
      setCustomers([...customers, newCustomer]);
      // Close the create form
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>
      <button onClick={handleCreate}>Create New Customer</button>
      {showCreateForm && (
        <CreateForm onSubmit={handleCreateSubmit} onCancel={() => setShowCreateForm(false)} />
      )}
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

//CreateForm component
const CreateForm: React.FC<{ onSubmit: (formData: any) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', emailAddress: '', dateOfBirth: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Create New Customer</h2>
      <label>
        Full Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Email Address:
        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
      </label>
      <button onClick={() => onSubmit(formData)}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CustomerList;
