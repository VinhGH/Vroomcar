import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Vroom<span className="text-primary">Car</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Dịch vụ thuê xe uy tín hàng đầu Việt Nam. Đa dạng dòng xe, giá cả hợp lý, phục vụ 24/7.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Liên kết</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
                            <li><Link to="/cars" className="hover:text-primary transition-colors">Thuê xe</Link></li>
                            <li><Link to="/offers" className="hover:text-primary transition-colors">Ưu đãi</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Liên hệ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Loại xe</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/cars?type=Sedan" className="hover:text-primary transition-colors">Sedan</Link></li>
                            <li><Link to="/cars?type=SUV" className="hover:text-primary transition-colors">SUV</Link></li>
                            <li><Link to="/cars?type=Luxury" className="hover:text-primary transition-colors">Hạng sang</Link></li>
                            <li><Link to="/cars?type=Pickup" className="hover:text-primary transition-colors">Bán tải</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Liên hệ</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 1900 1234</li>
                            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@vroomcar.vn</li>
                            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> 123 Nguyễn Huệ, Q.1, TP.HCM</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    <p>© 2026 VroomCar. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
