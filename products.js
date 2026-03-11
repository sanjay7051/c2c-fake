// products.js

import { firestore } from './firebase'; // Adjust the import based on your firebase configuration

// Get all products
export const getAllProducts = async () => {
    const snapshot = await firestore.collection('products').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get product by ID
export const getProductById = async (id) => {
    const doc = await firestore.collection('products').doc(id).get();
    return { id: doc.id, ...doc.data() };
};

// Get products by category
export const getProductsByCategory = async (category) => {
    const snapshot = await firestore.collection('products').where('category', '==', category).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add product
export const addProduct = async (product) => {
    const docRef = await firestore.collection('products').add(product);
    return { id: docRef.id, ...product };
};

// Update product
export const updateProduct = async (id, updatedProduct) => {
    await firestore.collection('products').doc(id).update(updatedProduct);
    return { id, ...updatedProduct };
};

// Delete product
export const deleteProduct = async (id) => {
    await firestore.collection('products').doc(id).delete();
    return id;
};

// Get featured products
export const getFeaturedProducts = async () => {
    const snapshot = await firestore.collection('products').where('featured', '==', true).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get best seller products
export const getBestSellerProducts = async () => {
    const snapshot = await firestore.collection('products').orderBy('sales', 'desc').limit(10).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
