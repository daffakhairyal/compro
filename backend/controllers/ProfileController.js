import Profile from '../models/Profile.js';

// Mendapatkan data profile
export const getProfile = (req, res) => {
  Profile.getAll((err, profiles) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving profile', error: err });
    }
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profiles[0]); // Mengembalikan profile pertama (dan satu-satunya)
  });
};

// Menambah atau mengupdate data profile
export const upsertProfile = (req, res) => {
  const newProfile = req.body;

  Profile.getAll((err, profiles) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking existing profiles', error: err });
    }
    
    if (profiles.length === 0) {
      // Jika tidak ada profile, tambahkan yang baru
      Profile.create(newProfile, (err, insertId) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating profile', error: err });
        }
        res.status(201).json({ message: 'Profile created successfully', id: insertId });
      });
    } else {
      // Jika sudah ada profile, update yang sudah ada
      const existingProfileId = profiles[0].id;
      Profile.updateById(existingProfileId, newProfile, (err, affectedRows) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating profile', error: err });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
      });
    }
  });
};

// Menghapus data profile
export const deleteProfile = (req, res) => {
  Profile.getAll((err, profiles) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking existing profiles', error: err });
    }
    
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const profileId = profiles[0].id;
    Profile.deleteById(profileId, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting profile', error: err });
      }
      res.status(200).json({ message: 'Profile deleted successfully' });
    });
  });
};
