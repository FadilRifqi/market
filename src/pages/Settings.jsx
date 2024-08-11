import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";

function Settings() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState(null);
  const profilePictureInputRef = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setSelectedImage(savedProfilePicture);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    if (profilePictureInputRef.current) {
      profilePictureInputRef.current.value = "";
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setUsername(name);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("username", username);
    if (selectedImage) {
      localStorage.setItem("profilePicture", selectedImage);
    } else {
      localStorage.removeItem("profilePicture");
    }
    setSelectedImage(null);
    if (profilePictureInputRef.current) {
      profilePictureInputRef.current.value = "";
    }
    window.location.reload();
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Settings
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                value={username}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="profilePicture"
              >
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                onChange={handleImageChange}
                ref={profilePictureInputRef}
              />
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-2"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
