import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const Profile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useApp();
    const [formData, setFormData] = useState({
        full_name: user?.full_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...user, ...formData });
        alert("Đã cập nhật thông tin hồ sơ!");
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Trang chủ</span>
                </button>

                <h1 className="text-3xl font-bold mb-10">Hồ sơ cá nhân</h1>

                <Card className="border-none shadow-sm overflow-hidden">
                    <CardContent className="p-10">
                        <div className="flex flex-col items-center mb-12">
                            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold border-4 border-white shadow-md relative group cursor-pointer">
                                {formData.full_name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] text-white">Thay đổi</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Nhấn vào ảnh để thay đổi</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Email</label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12 bg-gray-50 border-none px-4"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Họ tên</label>
                                <Input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="h-12 bg-gray-50 border-none px-4"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Số điện thoại</label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="h-12 bg-gray-50 border-none px-4"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-secondary">Địa chỉ</label>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="h-12 bg-gray-50 border-none px-4"
                                />
                            </div>

                            <Button
                                onClick={handleSave}
                                className="w-full h-12 gap-2 text-base font-bold"
                            >
                                <Save className="h-5 w-5" /> Lưu thay đổi
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
