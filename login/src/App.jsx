import React, { useState } from 'react';
import './App.css';

function App() {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        full_name: '',
        login_username: '',
        login_password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering ? '/api/register' : '/api/login'; // Update with your API endpoints
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                // Handle successful registration/login
                // e.g., redirect or show a success message
            } else {
                setError(result.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    const toggleForms = () => {
        setIsRegistering(!isRegistering);
        setFormData({ ...formData, username: '', password: '', email: '', full_name: '', login_username: '', login_password: '' });
        setError('');
    };

    return (
        <div className="app-container">
            <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <>
                        <input type="text" name="fullname" placeholder="full name" value={formData.fullname} onChange={handleChange} required />
                        <input type="email" name="Email" placeholder="email address" value={formData.email} onChange={handleChange} required />
                        <input type="text" name="username" placeholder="username " value={formData.username} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="password" value={formData.full_name} onChange={handleChange} required />
                    </>
                )}
                {!isRegistering && (
                    <>
                        <input type="text" name="login_username" placeholder="Username" value={formData.login_username} onChange={handleChange} required />
                        <input type="password" name="login_password" placeholder="Password" value={formData.login_password} onChange={handleChange} required />
                    </>
                )}
                <button type="submit">{isRegistering ? 'Create Account' : 'Login'}</button>
            </form>
            <p className="toggle-link" onClick={toggleForms}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
}

export default App;
