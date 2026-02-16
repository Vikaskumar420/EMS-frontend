import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaUser, FaCamera } from "react-icons/fa"
import axios from 'axios'


const Navbar = () => {
  const { user, logout, setUser } = useAuth()
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef(null)

  if (!user) return null;




  const imageUrl = user.profileImage
    ? user.profileImage
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1K1CFWvueNo3Q79DRRLHVTEI8taRKrAuGw&s"

  // Open device file picker
  const handleChangeImageClick = () => {
    fileInputRef.current.click()
    setOpen(false)
  }

  // When user selects image
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file); // match your backend upload.single("image")
    // console.log("Selected file:", file);
    try {
      const response = await axios.put(
        `https://ems-server-bnxh.onrender.com/api/auth/update-profile-image/${user._id}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Profile image updated successfully!");
      setUser(response.data.user);
      
      
      e.target.value = null;

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };
  // yahin se upload API call karoge (next step)


  return (
    <div className="relative flex items-center text-white justify-between h-12 bg-teal-600 px-5">
      <p>Welcome {user.name}</p>

      <div className="relative">
        {/* Profile Image */}
        <img
          src={imageUrl}
          alt="profile"
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full object-cover border-2 border-white cursor-pointer"
        />

        


        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-100 text-black  shadow-lg z-50">
          

            <button
              onClick={logout}
              className="w-full px-4 py-2 text-sm font-bold text-red-600 hover:text-white hover:rounded-lg hover:bg-gray-900"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
