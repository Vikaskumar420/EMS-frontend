import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaUser, FaCamera } from "react-icons/fa"


const Navbar = () => {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef(null)
  

  if (!user) return null;

  
  

  const imageUrl = user.profileImage
    ? `https://ems-server-bnxh.onrender.com/${user.profileImage}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr1K1CFWvueNo3Q79DRRLHVTEI8taRKrAuGw&s"

  // Open device file picker
  const handleChangeImageClick = () => {
    fileInputRef.current.click()
    setOpen(false)
  }

  // When user selects image
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    console.log("Selected file:", file)
    // yahin se upload API call karoge (next step)
  }

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

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <FaUser /> <p>Profile</p>
            </button>

            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleChangeImageClick}
            >
              <FaCamera /> Change Profile Image
            </button>

            <hr />

            <button
              onClick={logout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
