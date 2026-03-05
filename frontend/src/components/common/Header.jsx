import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { User, ClipboardList, LogOut } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useApp();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky text-white top-0 z-50 w-full border-b bg-[#1C2A47] backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Vroom<span className="text-primary">Car</span></span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link to="/" className="transition-colors hover:text-primary">Trang chủ</Link>
                    <Link to="/cars" className="transition-colors hover:text-primary">Thuê xe</Link>
                    <Link to="/offers" className="transition-colors hover:text-primary">Ưu đãi</Link>
                    <Link to="/contact" className="transition-colors hover:text-primary">Liên hệ</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link to="/orders">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                            <ClipboardList className="h-5 w-5" />
                        </Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2 ">
                            <Link to="/profile" className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                    {user.avatar ? <img src={user.avatar} alt="avatar" /> : <User className="h-5 w-5 text-gray-600" />}
                                </div>
                                <span className="hidden lg:inline text-sm font-medium">{user.full_name}</span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-white/10 text-white ml-2"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary">Đăng nhập</Button>
                        </Link>
                    )}

                    <Link to="/cars" className="hidden sm:block">
                        <Button size="sm">Đặt xe ngay</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
