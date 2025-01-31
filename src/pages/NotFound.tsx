import { Link } from "react-router-dom";
import TButton from "../components/buttons/TButton";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f2f6f7] text-[#081e1f]">
            <h1 className="text-9xl font-bold text-[#44cad2]">404</h1>
            <h2 className="text-2xl font-semibold mt-4 text-[#555a5a]">Page Not Found</h2>
            <p className="mt-2 mb-6 text-lg text-[#5ab1b6]">Oops! The page you are looking for doesn't exist.</p>
            <Link  to="/">
                <TButton
                    text=' Go Home'
                    className="mt-6 bg-[#44cad2] border-none hover:bg-[#5ab1b6] text-white px-6 py-2 text-lg rounded-lg shadow-lg"
                >

                </TButton>
            </Link>
        </div>
    );
}
