import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

//function login google
const testLoginGoogle = async () => {
    try {
        // 1. Login với Firebase UI
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        console.log("1. Đã lấy được Firebase Token");

        // 2. Gửi token xuống Backend xác thực
        const res = await axios.post('http://localhost:3001/api/auth/google-login', {
            token: idToken
        });

        // 3. Gọi hàm callback của cha để lưu user và token
        console.log("2. Backend xác thực thành công");
        // onLoginSuccess(res.data); // data gồm { user, token }

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Đăng nhập thất bại!");
    }
};