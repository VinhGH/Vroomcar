import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Lấy thông tin profile của user đang đăng nhập
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken');
        if (!user) return errorResponse(res, 'Không tìm thấy user', 404);

        return successResponse(res, 'Lấy profile thành công', user);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Cập nhật thông tin profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Bad request
 */
export const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) return errorResponse(res, 'Không tìm thấy user', 404);

        // Cập nhật thông tin cơ bản
        if (name !== undefined) user.name = name;
        if (phone !== undefined) user.phone = phone;
        if (address !== undefined) user.address = address;

        // Xử lý đổi mật khẩu (chỉ áp dụng với user local)
        if (newPassword) {
            if (user.authType === 'google') {
                return errorResponse(res, 'Tài khoản Google không thể đổi mật khẩu', 400);
            }

            if (!currentPassword) {
                return errorResponse(res, 'Vui lòng nhập mật khẩu hiện tại', 400);
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return errorResponse(res, 'Mật khẩu hiện tại không đúng', 400, 'WRONG_PASSWORD');
            }

            if (newPassword.length < 6) {
                return errorResponse(res, 'Mật khẩu mới phải có ít nhất 6 ký tự', 400);
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        return successResponse(res, 'Cập nhật profile thành công', {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar,
            role: user.role,
            authType: user.authType,
        });
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
