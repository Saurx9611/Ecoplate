import { useState } from 'react';

const DonorDashboard = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    type: 'Cooked Food',
    expiresIn: '',
    distance: '2 km' // Hardcoded for now, or you can add an input
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, donor: user.name, status: 'available' }),
      });
      if (res.ok) {
        alert('Donation Added Successfully!');
        setFormData({ title: '', quantity: '', type: 'Cooked Food', expiresIn: '', distance: '2 km' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, <b>{user.name}</b></span>
            <button onClick={onLogout} className="text-red-500 text-sm hover:underline">Logout</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Item Title</label>
            <input
              required
              placeholder="e.g., 20 Packets of Curry Rice"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option>Cooked Food</option>
                <option>Bakery</option>
                <option>Raw Ingredients</option>
                <option>Packaged Goods</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                required
                placeholder="e.g., 5kg"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expires In (Time)</label>
            <input
              required
              placeholder="e.g., 4 hours"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.expiresIn}
              onChange={(e) => setFormData({...formData, expiresIn: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
            Post Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorDashboard;