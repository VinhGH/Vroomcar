import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Fuel, Settings2, MapPin, Calendar, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const Home = () => {
    const { cars, setSelectedCar, loading } = useApp();
    const navigate = useNavigate();

    // Show top 3 rated cars as featured
    const featuredCars = [...cars].sort((a, b) => b.rating - a.rating).slice(0, 3);

    const handleQuickSearch = () => {
        navigate("/cars");
    };

    const handleSelectCar = (car) => {
        setSelectedCar(car);
        navigate("/checkout");
    };

    if (loading && cars.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-bold animate-pulse text-secondary">VroomCar đang khởi động...</p>
        </div>
    );

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container relative z-10 px-4 text-center md:text-left">
                    <Badge variant="outline" className="mb-4 bg-orange-500/10 text-orange-500 border-none px-3 py-1 font-bold">
                        🇻🇳 Dịch vụ thuê xe #1 Việt Nam
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Hành trình của bạn,<br />
                        <span className="text-primary">Xe chúng tôi lo</span>
                    </h1>
                    <p className="text-gray-200 text-lg mb-8 max-w-2xl">
                        Đa dạng dòng xe từ tiết kiệm đến hạng sang. Giá tốt nhất, bảo hiểm toàn diện, giao xe tận nơi 24/7.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-12">
                        <Link to="/cars">
                            <Button size="lg" className="h-12 px-8 font-bold">Đặt ngay</Button>
                        </Link>
                        <Link to="/cars">
                            <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent text-white border-white hover:bg-white hover:text-black font-bold">Xem xe</Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-4xl border border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg text-white">
                                <Settings2 className="h-5 w-5 opacity-70" />
                                <span className="text-sm">Tất cả xe</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg text-white">
                                <MapPin className="h-5 w-5 opacity-70" />
                                <span className="text-sm">Chọn địa điểm</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg text-white">
                                <Calendar className="h-5 w-5 opacity-70" />
                                <span className="text-sm">mm/dd/yyyy</span>
                            </div>
                            <Button className="w-full gap-2 font-bold" onClick={handleQuickSearch}>
                                <Search className="h-4 w-4" /> Tìm xe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "500+", sub: "Xe cho thuê" },
                        { label: "100%", sub: "Bảo hiểm" },
                        { label: "24/7", sub: "Hỗ trợ" },
                        { label: "50K+", sub: "Khách hàng" }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Fuel className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{stat.label}</h3>
                                <p className="text-gray-500 text-sm">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">XE NỔI BẬT</p>
                            <h2 className="text-3xl font-bold">Xe phổ biến nhất</h2>
                        </div>
                        <Link to="/cars">
                            <Button variant="link" className="text-primary font-bold">Xem tất cả →</Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car) => (
                            <CarCard key={car._id} car={car} onSelect={() => handleSelectCar(car)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Offers Section */}
            <section className="py-20 bg-[#0a1128] text-white overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">ƯU ĐÃI</p>
                        <h2 className="text-3xl font-bold">Ưu đãi đặc biệt</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Giảm 20% cuối tuần", desc: "Thuê xe vào thứ 7 & CN được giảm 20% mọi dòng xe" },
                            { title: "Thuê dài hạn -30%", desc: "Thuê từ 7 ngày trở lên, giảm ngay 30% tổng giá" },
                            { title: "Khách mới -15%", desc: "Đăng ký lần đầu và nhận ngay ưu đãi 15%" }
                        ].map((offer, i) => (
                            <Card key={i} className="bg-white/5 border-white/10 text-white">
                                <CardContent className="pt-6">
                                    <div className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center text-primary mb-4">
                                        <Fuel className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{offer.title}</h4>
                                    <p className="text-gray-400 text-sm">{offer.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Sẵn sàng cho chuyến đi tiếp theo?</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Chỉ vài bước đơn giản để sở hữu chiếc xe ưng ý và bắt đầu hành trình của bạn.</p>
                    <Link to="/cars">
                        <Button size="lg" className="rounded-full h-12 px-10 font-bold">Thuê xe ngay</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

// Helper Component for Car Card
const CarCard = ({ car, onSelect }) => {
    return (
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[16/10]">
                <img src={car.image_url} alt={car.name} className="object-cover w-full h-full" />
                <Badge className="absolute top-4 left-4 rounded-sm uppercase">{car.category_id?.name || car.type}</Badge>
            </div>
            <CardContent className="p-5">
                <h3 className="text-xl font-bold mb-1">{car.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <span className="text-orange-500">★ {car.rating}</span>
                    <span>• {car.location_text}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-6 font-medium">
                    <div className="flex flex-col items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{car.seats} chỗ</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Fuel className="h-4 w-4" />
                        <span>{car.fuel_type}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <Settings2 className="h-4 w-4" />
                        <span>{car.transmission}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                        <span className="text-xl font-bold text-primary">{car.price_per_day?.toLocaleString()} đ</span>
                        <span className="text-xs text-gray-400">/ngày</span>
                    </div>
                    <Button onClick={onSelect} size="sm" className="font-bold">Đặt xe</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Home;
