import { useState } from 'react'
import api from '../api'

const UserForm = ({ formData, setFormData, onUserUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateUser = (e) => {
    e.preventDefault()
    api
      .patch('/api/user/', {
        profile: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zip_code,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert('User updated!')
          onUserUpdate()
        } else {
          alert('Failed to update user.')
        }
      })
      .catch((err) => {
        console.error(
          'Error updating user:',
          err.response ? err.response.data : err,
        )
        alert(err.response ? err.response.data : 'An error occurred')
      })
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <form onSubmit={updateUser}>
        <h2 className="text-xl text-green-500 text-center mb-6">
          Update User Information
        </h2>

        <label htmlFor="username" className="block text-gray-400 text-left">
          Username:
        </label>
        <input
          className="w-full px-4 py-1 mb-2 border border-gray-300 rounded-lg"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="block text-gray-400 text-left">
          Email:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="first_name" className="block text-gray-400 text-left">
          First Name:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <label htmlFor="last_name" className="block text-gray-400 text-left">
          Last Name:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <h2 className="text-xl text-green-500 text-center mb-6">
          Address Information
        </h2>

        <label htmlFor="street" className="block text-gray-400 text-left">
          Street:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />

        <label htmlFor="city" className="block text-gray-400 text-left">
          City:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="block text-gray-400 text-left">
          State:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />

        <label htmlFor="country" className="block text-gray-400 text-left">
          Country:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <label htmlFor="zip_code" className="block text-gray-400 text-left">
          Zip Code:
        </label>
        <input
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          type="text"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
        />

        <button
          className="w-full px-4 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
          type="submit"
        >
          Update User
        </button>
      </form>
    </div>
  )
}

export default UserForm
