import admin from "firebase-admin";

// Đọc service account từ environment variable (an toàn cho production/Render)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Khởi tạo Firebase Admin bằng service account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;