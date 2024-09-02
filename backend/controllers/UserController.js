import User from '../models/User.js';

// Mendapatkan data user berdasarkan ID
export const getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
};

// Mendapatkan data user berdasarkan email
export const getUserByEmail = (req, res) => {
  const email = req.params.email;

  User.findByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  });
};

// Mendapatkan semua data user
export const getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users', error: err });
    }
    res.status(200).json(users);
  });
};

// Mengupdate data user berdasarkan ID
export const updateUserById = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  User.updateById(userId, updatedUser, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
};

// Menghapus data user berdasarkan ID
export const deleteUserById = (req, res) => {
  const userId = req.params.id;

  User.deleteById(userId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user', error: err });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
