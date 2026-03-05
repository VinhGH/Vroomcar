import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Chrome, Mail, Lock, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Register = () => {
    const { register } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(formData);
        setLoading(false);
        if (success) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-[480px]">
                <Card className="border-none shadow-sm rounded-2xl">
                    <CardContent className="p-10 space-y-8">
                        <Button variant="outline" className="w-full h-12 gap-3 font-semibold bg-gray-50 border-gray-300 hover:bg-gray-100 transition-colors rounded-xl">
                            <Chrome className="h-5 w-5" /> Đăng ký với Google
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
                                    <label className="text-sm font-bold text-secondary">Họ và tên</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            name="full_name"
                                            placeholder="Nguyễn Văn A"
                                            className="h-14 bg-gray-50 border-gray-300 pl-12 text-base rounded-xl focus-visible:ring-primary"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
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
                                {loading ? "Đang xử lý..." : "Đăng ký"}
                            </Button>
                        </form>

                        <div className="text-center text-sm font-medium">
                            <span className="text-gray-500">Đã có tài khoản? </span>
                            <Link to="/login" className="text-primary font-bold hover:underline">Đăng nhập</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
