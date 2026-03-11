// auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

// Register a new user
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Log in user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Log out user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log('User signed out successfully.');
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

// Reset user password
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent.');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Get user profile (you may need to fetch additional user data)
export const getUserProfile = (userId) => {
    // Placeholder function
    // This can be modified to fetch user profile data from your database
    return new Promise((resolve, reject) => {
        const user = getCurrentUser();
        if (user) {
            resolve({ id: userId, email: user.email });
        } else {
            reject('No user logged in.');
        }
    });
};