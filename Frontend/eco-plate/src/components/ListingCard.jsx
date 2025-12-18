import { MapPin, Clock, Package } from 'lucide-react';

// Added 'onClaim' prop to tell the parent when to refresh data
const ListingCard = ({ listing, onClaim }) => {
  
  const handleClaim = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/listings/${listing._id}/claim`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        // If successful, tell App.jsx to refresh the list
        onClaim(); 
      }
    } catch (error) {
      console.error("Error claiming item:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full border border-green-100">
            {listing.type}
          </span>
          {listing.status === 'available' ? (
             <span className="flex items-center text-green-600 text-xs font-bold">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
               Available
             </span>
          ) : (
             <span className="text-gray-400 text-xs font-medium bg-gray-100 px-2 py-1 rounded">Claimed</span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{listing.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{listing.donor}</p>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Package className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">{listing.quantity}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{listing.distance} away</span>
          </div>
          <div className="flex items-center text-amber-600 text-sm font-medium">
            <Clock className="w-4 h-4 mr-2" />
            <span>Expires in {listing.expiresIn}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <button 
          onClick={handleClaim} // Added Click Handler
          disabled={listing.status !== 'available'}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
            listing.status === 'available' 
              ? 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200 active:scale-[0.98]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          }`}
        >
          {listing.status === 'available' ? 'Claim Donation' : 'Already Claimed'}
        </button>
      </div>
    </div>
  );
};

export default ListingCard;