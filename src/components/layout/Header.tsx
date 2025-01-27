import { MenuOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='w-full bg-gray-300 h-[76px]'>
            <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto">
                {/* Logo/Brand */}
                <Link to="/" className="text-lg text-secondary-foreground  font-bold tracking-wide">
                    Book Shop
                </Link>

                {/* Hamburger Menu for Mobile */}
                <button className="bg-red-400 h-10 w-10"> x</button>
              </div>
        </div>
    );
};

export default Header;