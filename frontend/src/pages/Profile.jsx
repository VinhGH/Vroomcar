import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { userAPI } from "@/services/api";

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useApp();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // Cập nhật thông tin cơ bản
    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await userAPI.updateProfile({
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
            });

            const updatedUser = res.data.data;

            // Cập nhật lại localStorage và context
            const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, user: updatedUser }));
            setUser(updatedUser);

            alert("Đã cập nhật thông tin hồ sơ!");
        } catch (error) {
            alert(error.response?.data?.message || "Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };

    // Đổi mật khẩu
    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }
        setPwLoading(true);
        try {
            await userAPI.updateProfile({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            alert("Đổi mật khẩu thành công!");
        } catch (error) {
            alert(error.response?.data?.message || "Đổi mật khẩu thất bại!");
        } finally {
            setPwLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Quay lại</span>
                </button>

                <h1 className="text-3xl font-bold mb-10">Hồ sơ cá nhân</h1>

                {/* Thông tin cơ bản */}
                <Card className="border-none shadow-sm overflow-hidden mb-6">
                    <CardContent className="p-10">
                        <div className="flex flex-col items-center mb-12">
                            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold border-4 border-white shadow-md relative group cursor-pointer overflow-hidden">
                                {user?.avatar && user.avatar !== 'default.jpg' ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    formData.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"
                                )}
                            </div>
                            <p className="text-sm font-semibold mt-3 text-secondary">{formData.name}</p>
                            <p className="text-xs text-gray-400">{formData.email}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Họ tên</label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nguyễn Văn A"
                                    className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Email</label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="h-12 bg-gray-100 border-gray-200 px-4 rounded-xl text-gray-400 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-400">Email không thể thay đổi</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Số điện thoại</label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0912 345 678"
                                    className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Địa chỉ</label>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Đường ABC, TP.HCM"
                                    className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                />
                            </div>

                            <Button
                                onClick={handleSave}
                                disabled={loading}
                                className="w-full h-12 gap-2 text-base font-bold rounded-xl"
                            >
                                <Save className="h-5 w-5" />
                                {loading ? "Đang lưu..." : "Lưu thay đổi"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Đổi mật khẩu — Ẩn với tài khoản Google */}
                {user?.authType !== 'google' && (
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardContent className="p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">Đổi mật khẩu</h2>
                                    <p className="text-sm text-gray-400">Cập nhật mật khẩu để bảo mật tài khoản</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary">Mật khẩu hiện tại</label>
                                    <Input
                                        name="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary">Mật khẩu mới</label>
                                    <Input
                                        name="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Tối thiểu 6 ký tự"
                                        className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-secondary">Xác nhận mật khẩu mới</label>
                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Nhập lại mật khẩu mới"
                                        className="h-12 bg-gray-50 border-gray-200 px-4 rounded-xl"
                                    />
                                </div>

                                <Button
                                    onClick={handleChangePassword}
                                    disabled={pwLoading}
                                    variant="outline"
                                    className="w-full h-12 gap-2 text-base font-bold rounded-xl border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <Lock className="h-5 w-5" />
                                    {pwLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;
