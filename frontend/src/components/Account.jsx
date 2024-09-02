import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [showAddModal, setShowAddModal] = useState(false); // State untuk mengontrol modal tambah user
  const [showEditModal, setShowEditModal] = useState(false); // State untuk mengontrol modal edit user
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' }); // State untuk form tambah user
  const [editUser, setEditUser] = useState({ id: '', name: '', email: '' }); // State untuk form edit user
  const [showDeletePopup, setShowDeletePopup] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return; // Hentikan eksekusi jika tidak ada token
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', { // Ganti endpoint sesuai dengan API Anda
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
        // Menangani kesalahan jika terjadi
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setEditUser({ id: user.id, name: user.name, email: user.email });
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', newUser);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', password: '' }); // Reset form
      window.location.reload(); // Refresh halaman setelah user berhasil ditambahkan
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem('token'); // Ambil token dari local storage
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editUser),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        handleCloseEditModal();
        window.location.reload(); // Refresh halaman
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeletePopup(true);
  };
  
  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
  
    const token = localStorage.getItem('token');
  
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userToDelete.id)); // Menghapus user dari state
      closeDeletePopup(); // Tutup popup
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 fixed top-0 w-screen">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Account</h1>
          <div className='flex justify-between'>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="bg-red-500 text-white px-4 py-2 m-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
            <button className='bg-yellow-500 text-white px-4 py-2 m-1 rounded-lg' onClick={() => navigate('/dashboard')} >
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 mt-20">
        <h2 className="text-2xl font-bold mb-2">User Accounts</h2>
        <button className='p-3 text-white bg-green-500 duration-300 hover:bg-red-600 rounded-md m-2' onClick={handleAddUser}>Add User</button>
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.id}</td>
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(user.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // Untuk format 24 jam
                      })}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className='flex flex-col md:flex-row text-white'>
                        <button
                          className='p-3 bg-yellow-500 duration-300 hover:bg-yellow-600 rounded-md m-2'
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
  onClick={() => handleDeleteClick(user)}
  className="p-3 bg-red-500 duration-300 hover:bg-red-600 rounded-md m-2"
>
  Delete
</button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Add User */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
                  onClick={handleCloseAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit User */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={editUser.password}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

 {/* Modal Delete User */}
{showDeletePopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Hapus data ini?</h2>
      <div className="flex justify-end">
        <button
          onClick={handleDeleteConfirm}
          className="bg-red-500 text-white px-4 py-2 m-1 rounded-lg hover:bg-red-600"
        >
          Ya
        </button>
        <button
          onClick={closeDeletePopup}
          className="bg-gray-500 text-white px-4 py-2 m-1 rounded-lg hover:bg-gray-600"
        >
          Tidak
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Account;
