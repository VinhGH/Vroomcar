import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XCircle, Calendar, MapPin, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Orders = () => {
    const navigate = useNavigate();
    const { bookings, cancelBooking } = useApp();

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Trang chủ</span>
                </button>

                <h1 className="text-3xl font-bold mb-10 text-secondary">Lịch sử đơn hàng</h1>

                <div className="space-y-4">
                    {bookings.map((order) => (
                        <Card key={order.id} className="border-none shadow-sm group">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-secondary">{order.carName}</h3>
                                            <Badge variant="secondary" className={`
                                                font-medium border-none
                                                ${order.status === 'Đã hủy' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}
                                            `}>
                                                {order.status}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{order.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{order.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{order.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                        <div className="text-right">
                                            <span className="text-xl font-bold text-primary">{order.price.toLocaleString()} đ</span>
                                            <p className="text-xs text-gray-400 mt-1">{order.paymentMethod}</p>
                                        </div>
                                        {order.status !== 'Đã hủy' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 gap-2"
                                                onClick={() => cancelBooking(order.id)}
                                            >
                                                <XCircle className="h-4 w-4" /> Huỷ đơn
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {bookings.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl">
                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary">Chưa có đơn hàng nào</h3>
                            <p className="text-gray-400 mb-6">Bạn chưa có lịch sử đặt xe tại VroomCar.</p>
                            <Link to="/cars">
                                <Button>Khám phá các dòng xe</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
