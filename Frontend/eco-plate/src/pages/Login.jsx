import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('donor'); // Default role
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegistering ? { ...formData, role } : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (res.ok) {
        onLogin(data); // Pass user data up to App.jsx
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Is the server running?');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isRegistering ? 'Join EcoPlate' : 'Welcome Back'}
        </h2>

        {/* Role Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'donor' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'
            }`}
          >
            I am a Donor
          </button>
          <button
            type="button"
            onClick={() => setRole('ngo')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'ngo' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500'
            }`}
          >
            I am an NGO
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
              role === 'donor' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRegistering ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="ml-1 font-semibold text-green-600 hover:underline"
          >
            {isRegistering ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;