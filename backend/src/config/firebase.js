import admin from "firebase-admin";

// Đọc service account từ environment variable (an toàn cho production/Render)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// Fix: Render lưu \n trong env var thành \\n, cần convert lại thành newline thật để parse PEM key
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// Khởi tạo Firebase Admin bằng service account
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;