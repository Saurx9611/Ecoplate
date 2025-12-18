import { useState, useEffect } from 'react';
import ListingCard from './components/ListingCard';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';

function App() {
  const [user, setUser] = useState(null); // Stores logged-in user info
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to Fetch Data (Used by NGO view)
  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ngo') {
      fetchListings();
    }
  }, [user]);

  // --- RENDER LOGIC ---

  // 1. If no user, show Login Page
  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  // 2. If Donor, show Dashboard
  if (user.role === 'donor') {
    return <DonorDashboard user={user} onLogout={() => setUser(null)} />;
  }

  // 3. If NGO, show the Listings Feed (Existing Logic)
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600 tracking-tight">EcoPlate</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">NGO: <b>{user.name}</b></span>
            <button 
              onClick={() => setUser(null)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Food Donations</h2>
        <p className="text-gray-500 mb-8">Claim food for your shelter immediately.</p>

        {loading ? (
          <p className="text-center text-gray-500">Loading food...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <ListingCard key={item._id} listing={item} onClaim={fetchListings} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;