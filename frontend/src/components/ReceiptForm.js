import React, { useState } from 'react';
import axios from 'axios';

const ReceiptForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    description: '',
    receipt: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('date', formData.date);
    data.append('amount', formData.amount);
    data.append('description', formData.description);
    data.append('receipt', formData.receipt);

    try {
        const headers = {
        'Content-Type': 'multipart/form-data',
        'Allow-Origin': '*',
        }
      const res = await axios.post('http://localhost:5050/api/submit', data, { headers });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Submission failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Receipt for Reimbursement</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" name="date" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" step="0.01" className="form-control" name="amount" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Receipt File</label>
          <input type="file" className="form-control" name="receipt" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ReceiptForm;
