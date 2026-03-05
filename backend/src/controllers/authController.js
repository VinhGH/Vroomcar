import User from "../models/User.js";
import admin from "../config/firebase.js";
import { successResponse, errorResponse } from "../utils/response.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_SECRET || 'access_secret',
        { expiresIn: process.env.JWT_ACCESS_EXPIRE || '1h' }
    );
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
    );
    return { accessToken, refreshToken };
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

/**
 * @swagger
 * /api/auth/google-login:
 *   post:
 *     summary: Login with Google Firebase token
 *     tags: [Auth]
 */
export const googleLoginController = async (req, res) => {
    try {
        const { token: idToken } = req.body;

        if (!idToken) {
            return errorResponse(res, "Token is required", 400, "TOKEN_REQUIRED");
        }

        const tokenParts = idToken.split(".");
        if (tokenParts.length !== 3) {
            return errorResponse(
                res,
                "Invalid token format. Firebase ID token must have 3 parts.",
                400,
                "INVALID_TOKEN_FORMAT"
            );
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = uid;
                user.avatar = picture || user.avatar;
                user.authType = "google";
                await user.save();
            }
        } else {
            const randomPassword = Math.random().toString(36).slice(-8);

            user = await User.create({
                googleId: uid,
                email,
                name: name || email.split('@')[0],
                avatar: picture,
                authType: "google",
                password: await bcrypt.hash(randomPassword, 10),
            });
        }

        // Generate standard JWT tokens
        const tokens = generateToken(user._id);

        await User.findByIdAndUpdate(user._id, {
            refreshToken: tokens.refreshToken,
        });

        res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

        return successResponse(res, "Đăng nhập thành công", {
            accessToken: tokens.accessToken,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
            },
        });
    } catch (error) {
        console.log("🚀 ~ googleLoginController ~ error:", error);

        if (error.code === "auth/argument-error") {
            return errorResponse(
                res,
                "Invalid Firebase ID token format",
                400,
                "INVALID_TOKEN_FORMAT"
            );
        }

        if (error.code === "auth/id-token-expired") {
            return errorResponse(
                res,
                "Firebase ID token has expired",
                401,
                "TOKEN_EXPIRED"
            );
        }

        return errorResponse(res, "Authentication failed", 401, "AUTH_FAILED");
    }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Auth user & get token
 *     tags: [Auth]
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const tokens = generateToken(user._id);

            await User.findByIdAndUpdate(user._id, {
                refreshToken: tokens.refreshToken,
            });

            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

            return successResponse(res, "Đăng nhập thành công", {
                accessToken: tokens.accessToken,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role,
                },
            });
        } else {
            return errorResponse(res, 'Email hoặc mật khẩu không đúng', 401);
        }
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return errorResponse(res, 'Email đã được sử dụng', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            const tokens = generateToken(user._id);

            await User.findByIdAndUpdate(user._id, {
                refreshToken: tokens.refreshToken,
            });

            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);

            return successResponse(res, "Đăng ký thành công", {
                accessToken: tokens.accessToken,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role,
                },
            }, 201);
        } else {
            return errorResponse(res, 'Dữ liệu không hợp lệ', 400);
        }
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
