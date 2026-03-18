import React, { useState, useEffect } from 'react';
import { supabase } from '../helpers/supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({ firstName: '', lastName: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                // Fetch additional profile data from our backend
                // For now, we'll just use the email
            } else {
                navigate('/login');
            }
            setLoading(false);
        };
        getProfile();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Call backend API to update profile
        alert('Profile update logic here');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="profile">
            <h1>User Profile</h1>
            <div className="profile-container">
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={user?.email || ''} disabled />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="update-btn">Update Profile</button>
                </form>
                <button className="logout-btn" onClick={() => supabase.auth.signOut().then(() => navigate('/'))}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
