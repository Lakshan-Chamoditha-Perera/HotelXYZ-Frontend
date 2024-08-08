import React from 'react';
import { Link } from 'react-router-dom';
import { Business, Home, LocalOffer, Payment } from '@mui/icons-material';

const Sidebar = () => {
    return (
        <div className="w-1/6 bg-blue-200 h-screen p-5">
            <div className="text-2xl font-bold mb-5">StartGlobal</div>
            <ul className="space-y-4 p-4">
                <li className="hover:cursor-pointer">
                    <Link to="/" className="flex items-center">
                        <Home className="mr-2" /> Home
                    </Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link to="/customers" className="flex items-center">
                        <Business className="mr-2" /> Customers
                    </Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link to="/rooms" className="flex items-center">
                        <LocalOffer className="mr-2" /> Rooms
                    </Link>
                </li>
                <li className="hover:cursor-pointer">
                    <Link to="/payments" className="flex items-center">
                        <Payment className="mr-2" /> Payments
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
