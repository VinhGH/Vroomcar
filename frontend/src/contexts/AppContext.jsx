import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, carAPI, bookingAPI } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')) || null);
    const [bookings, setBookings] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch cars on load
    useEffect(() => {
        fetchCars();
        if (user) {
            fetchMyBookings();
        }
    }, [user]);

    const fetchCars = async (filters = {}) => {
        try {
            setLoading(true);
            const { data } = await carAPI.getAll(filters);
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const { data } = await bookingAPI.getMyBookings();
            // Transform backend data to match frontend view if needed
            const transformedData = data.map(b => ({
                id: b._id,
                carName: b.car_id?.name || "Xe không tồn tại",
                status: b.status,
                duration: "N/A", // Backend doesn't store this exactly, could calculate from dates later
                location: b.car_id?.location_text || "N/A",
                date: new Date(b.createdAt).toLocaleDateString('vi-VN'),
                price: b.total_amount,
                paymentMethod: "Chuyển khoản" // Placeholder
            }));
            setBookings(transformedData);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    // Auth functions
    const login = async (formData) => {
        try {
            const { data } = await authAPI.login(formData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            alert(error.response?.data?.message || "Đăng nhập thất bại");
            return false;
        }
    };

    const register = async (formData) => {
        try {
            const { data } = await authAPI.register(formData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return true;
        } catch (error) {
            alert(error.response?.data?.message || "Đăng ký thất bại");
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    // Booking functions
    const addBooking = async (bookingData) => {
        try {
            // Map frontend data to backend schema
            const backendData = {
                car_id: selectedCar._id, // Assuming _id from MongoDB
                total_amount: bookingData.price,
            };
            await bookingAPI.create(backendData);
            await fetchMyBookings();
            return true;
        } catch (error) {
            alert("Đặt xe thất bại");
            return false;
        }
    };

    const cancelBooking = async (id) => {
        try {
            await bookingAPI.cancel(id);
            await fetchMyBookings();
        } catch (error) {
            alert("Hủy đơn thất bại");
        }
    };

    const value = {
        cars,
        user,
        setUser,
        bookings,
        selectedCar,
        setSelectedCar,
        loading,
        fetchCars,
        login,
        register,
        logout,
        addBooking,
        cancelBooking
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
