import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Chrome, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { handleGoogleLogin } from "@/components/GoogleLogin";

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin } = useApp();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(formData);
        setLoading(false);
        if (success) navigate("/");
    };

    const onGoogleClick = async () => {
        setGoogleLoading(true);
        await handleGoogleLogin(googleLogin, navigate);
        setGoogleLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-[480px]">
                <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-10 space-y-8">
                        <Button
                            onClick={onGoogleClick}
                            disabled={googleLoading}
                            variant="outline"
                            className="w-full h-12 gap-3 font-semibold bg-gray-50 border-gray-300 hover:bg-gray-100 transition-colors rounded-xl"
                        >
                            <Chrome className="h-5 w-5" />
                            {googleLoading ? "Đang xử lý..." : "Tiếp tục với Google"}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs font-bold uppercase">
                                <span className="bg-white px-4 text-gray-400">HOẶC</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="email@example.com"
                                            className="h-14 bg-gray-50 border-gray-300 pl-12 text-base rounded-xl focus-visible:ring-primary"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary">Mật khẩu</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="h-14 bg-gray-50 border-gray-300 pl-12 text-base rounded-xl focus-visible:ring-primary"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Đăng nhập"}
                            </Button>
                        </form>

                        <div className="text-center text-sm font-medium">
                            <span className="text-gray-500">Chưa có tài khoản? </span>
                            <Link to="/register" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
