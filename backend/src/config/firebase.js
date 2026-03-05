import admin from "firebase-admin";

// Dùng env var riêng biệt để tránh vấn đề JSON escaping của private_key trên Render
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // replace \\n -> \n vì Render lưu newline trong env var thành literal \n
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
});

export default admin;