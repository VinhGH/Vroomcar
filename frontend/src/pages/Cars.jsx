import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Fuel, Settings2, Search } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Cars = () => {
    const { cars, setSelectedCar, loading } = useApp();
    const navigate = useNavigate();

    // States for filters
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("Tất cả");
    const [selectedLocation, setSelectedLocation] = useState("Tất cả");
    const [maxPrice, setMaxPrice] = useState("");

    const types = ["Tất cả", "Sedan", "SUV", "Hạng sang", "Bán tải"];

    // Filtering logic
    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());

            // Handle type filtering (checking both direct name or populated category name)
            const carTypeName = car.category_id?.name || car.type || "";
            const matchesType = selectedType === "Tất cả" || carTypeName.toLowerCase() === selectedType.toLowerCase();

            const matchesLocation = selectedLocation === "Tất cả" || car.location_text === selectedLocation;
            const matchesPrice = !maxPrice || car.price_per_day <= parseInt(maxPrice);

            return matchesSearch && matchesType && matchesLocation && matchesPrice;
        });
    }, [cars, search, selectedType, selectedLocation, maxPrice]);

    const handleSelectCar = (car) => {
        setSelectedCar(car);
        navigate("/checkout");
    };

    const resetFilters = () => {
        setSearch("");
        setSelectedType("Tất cả");
        setSelectedLocation("Tất cả");
        setMaxPrice("");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-bold animate-pulse">Đang tải danh sách xe...</p>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Thuê xe</h1>
                    <p className="text-gray-500">Tìm và đặt xe phù hợp với nhu cầu của bạn</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-64 space-y-8 bg-white p-6 rounded-xl border h-fit sticky top-24">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold">Bộ lọc</h3>
                                <button onClick={resetFilters} className="text-xs text-primary font-medium hover:underline">Xóa tất cả</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Tìm kiếm</p>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Tên xe..."
                                            className="pl-9 bg-gray-50 h-9 text-sm"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Loại xe</p>
                                    <div className="flex flex-wrap gap-2">
                                        {types.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedType(type)}
                                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${selectedType === type ? 'bg-primary text-white border-primary' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Địa điểm</p>
                                    <select
                                        className="w-full bg-gray-50 border rounded-md h-9 text-sm px-2 outline-none"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    >
                                        <option>Tất cả</option>
                                        <option>Hà Nội</option>
                                        <option>TP. Hồ Chí Minh</option>
                                        <option>Đà Nẵng</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Giá tối đa (VNĐ/ngày)</p>
                                    <Input
                                        placeholder="VD: 2000000"
                                        className="bg-gray-50 h-9 text-sm"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Car Listing */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-500 text-sm">Tìm thấy <span className="font-bold text-gray-900">{filteredCars.length}</span> xe</p>
                        </div>

                        {filteredCars.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredCars.map((car) => (
                                    <CarCard key={car._id} car={car} onSelect={() => handleSelectCar(car)} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                                <p className="text-gray-400">Không tìm thấy xe nào phù hợp với bộ lọc của bạn.</p>
                                <Button variant="link" onClick={resetFilters}>Xóa bộ lọc</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

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
                    <span className="text-orange-500 text-sm">★ {car.rating}</span>
                    <span>• {car.location_text}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-6 border-b pb-6">
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
                <div className="flex items-center justify-between pt-0">
                    <div>
                        <span className="text-xl font-bold text-primary">{car.price_per_day?.toLocaleString()} đ</span>
                        <span className="text-xs text-gray-400">/ngày</span>
                    </div>
                    <Button onClick={onSelect} size="sm" className="px-6">Đặt xe</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Cars;
