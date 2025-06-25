import React from 'react';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-4 px-4 sm:px-6 lg:px-8"> {/* Reduced py-6 to py-4 */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Dashboard
        </h2>
        <p className="text-gray-600 text-lg">
          As a user, you only have the authority to like or dislike posts.
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            You can interact with posts by liking or disliking them, but that's
            your only permission on this platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
