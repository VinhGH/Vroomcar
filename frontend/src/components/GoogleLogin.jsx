import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

/**
 * Trigger Firebase Google popup → lấy ID token → gọi AppContext.googleLogin → redirect
 *
 * @param {Function} googleLoginFn  - hàm googleLogin từ useApp()
 * @param {Function} navigate       - hàm navigate từ useNavigate()
 */
export const handleGoogleLogin = async (googleLoginFn, navigate) => {
    try {
        // Bước 1: Mở Google popup qua Firebase
        const result = await signInWithPopup(auth, googleProvider);

        // Bước 2: Lấy Firebase ID Token
        const idToken = await result.user.getIdToken();

        // Bước 3: Gửi ID token lên Backend để xác thực, lưu user + JWT vào context
        const success = await googleLoginFn(idToken);

        // Bước 4: Redirect về trang chủ nếu thành công
        if (success) {
            navigate('/');
        }
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') return;
        console.error('Google login error:', error);
        alert('Đăng nhập bằng Google thất bại!');
    }
};