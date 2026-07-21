import { getAuthHeader } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export const verifyEmail = async (userId, otp) => {
    const res = await fetch(`${API_BASE_URL}/api/register/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
    });
    return res.json();
};

export const verifyPhone = async (userId, otp) => {
    const res = await fetch(`${API_BASE_URL}/api/register/verify-phone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp })
    });
    return res.json();
};

export const fetchSiteSettings = async () => {
    const res = await fetch(`${API_BASE_URL}/api/site-settings`);
    return res.json();
};

export const updateSiteSettings = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/site-settings`, {
        method: 'PUT',
        headers: { ...getAuthHeader() },
        body: formData
    });
    return res.json();
};

export const getEvents = async () => {
    const res = await fetch(`${API_BASE_URL}/api/event`);
    return res.json();
};

export const getEventById = async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/event/${id}`);
    return res.json();
};

export const createEvent = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/event`, {
        method: 'POST',
        headers: { ...getAuthHeader() },
        body: formData
    });
    return res.json();
};

export const registerEvent = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/registration`, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const createOrder = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const verifyPayment = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/payment/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const getBrandParticipants = async () => {
    const res = await fetch(`${API_BASE_URL}/api/brand/participants`, {
        headers: { ...getAuthHeader() }
    });
    return res.json();
};

export const sendPromoEmail = async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/brand/send-promo`, {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};
