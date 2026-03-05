import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Wallet, Landmark, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";

const Checkout = () => {
    const navigate = useNavigate();
    const { selectedCar, user, addBooking } = useApp();
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [days, setDays] = useState(1);
    const [loading, setLoading] = useState(false);

    // Redirect if no car selected
    useEffect(() => {
        if (!selectedCar) {
            navigate("/cars");
        }
    }, [selectedCar, navigate]);

    if (!selectedCar) return null;

    const pricePerDay = selectedCar.price_per_day || selectedCar.price || 0;
    const serviceFee = pricePerDay * 0.05;
    const totalAmount = (pricePerDay * days) + serviceFee;

    const handleCheckout = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để đặt xe");
            navigate("/login");
            return;
        }

        setLoading(true);
        const success = await addBooking({
            price: totalAmount,
            paymentMethod: paymentMethod === "bank" ? "Chuyển khoản" : (paymentMethod === "card" ? "Thẻ tín dụng" : "Ví điện tử")
        });
        setLoading(false);

        if (success) {
            navigate("/orders");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Quay lại danh sách xe</span>
                </button>

                <h1 className="text-3xl font-bold mb-8 text-secondary">Thanh toán</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-6">Thông tin khách hàng</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary">Họ tên *</label>
                                        <Input defaultValue={user?.full_name} className="bg-gray-50 h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary">Email *</label>
                                        <Input defaultValue={user?.email} className="bg-gray-50 h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary">Số điện thoại *</label>
                                        <Input defaultValue={user?.phone || "0901234567"} className="bg-gray-50 h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-secondary">Địa chỉ giao xe</label>
                                        <Input defaultValue={user?.address || "Hà Nội"} className="bg-gray-50 h-11" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Duration */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-6">Thời gian thuê</h3>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-medium text-gray-600">Số ngày thuê:</label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            min="1"
                                            value={days}
                                            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-20 bg-gray-50 h-10 text-center"
                                        />
                                        <span className="text-sm text-gray-500">ngày</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Method */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-6">Phương thức thanh toán</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod("bank")}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <Landmark className="h-5 w-5" />
                                        <span className="text-sm font-bold">Chuyển khoản</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        <span className="text-sm font-bold">Thẻ tín dụng</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod("wallet")}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <Wallet className="h-5 w-5" />
                                        <span className="text-sm font-bold">Ví điện tử</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            className="w-full h-14 text-lg font-bold gap-2"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận thanh toán"} <CheckCircle2 className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="border-none shadow-sm sticky top-24">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-6 text-secondary">Tóm tắt đơn hàng</h3>
                                <div className="space-y-6">
                                    <div className="aspect-[16/10] rounded-lg overflow-hidden">
                                        <img src={selectedCar.image_url} alt={selectedCar.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-1">{selectedCar.name}</h4>
                                        <p className="text-sm text-gray-400">{selectedCar.location_text} • {selectedCar.transmission} • {selectedCar.fuel_type}</p>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-dashed">
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>Giá thuê ({days} ngày)</span>
                                            <span className="font-medium text-secondary">{(pricePerDay * days).toLocaleString()} đ</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>Phí dịch vụ (5%)</span>
                                            <span className="font-medium text-secondary">{serviceFee.toLocaleString()} đ</span>
                                        </div>
                                        <div className="flex justify-between pt-4 border-t border-dashed">
                                            <span className="font-bold text-secondary text-lg">Tổng cộng</span>
                                            <span className="font-bold text-primary text-xl">{totalAmount.toLocaleString()} đ</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
