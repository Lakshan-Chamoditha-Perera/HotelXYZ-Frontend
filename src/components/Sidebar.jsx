import React from 'react';
import {Link} from 'react-router-dom';
import {Business, Home, LocalOffer, Payment} from '@mui/icons-material';

const Sidebar = () => {
    return (<div className="w-1/6 h-screen flex border-r flex-col shadow-md gap-8 p-6 md:p-8 lg:p-10 bg-gray-100">
            <div className="text-2xl font-bold mb-6 text-gray-800">StartGlobal</div>
            <ul className="space-y-4">
                <li className="hover:bg-gray-200 rounded-md p-2 transition-all duration-200 hover:shadow-lg">
                    <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-600">
                        <Home className="mr-3 text-gray-600"/> Home
                    </Link>
                </li>
                <li className="hover:bg-gray-200 rounded-md p-2 transition-all duration-200 hover:shadow-lg">
                    <Link to="/customers" className="flex items-center text-gray-700 hover:text-indigo-600">
                        <Business className="mr-3 text-gray-600"/> Customers
                    </Link>
                </li>
                <li className="hover:bg-gray-200 rounded-md p-2 transition-all duration-200 hover:shadow-lg">
                    <Link to="/rooms" className="flex items-center text-gray-700 hover:text-indigo-600">
                        <LocalOffer className="mr-3 text-gray-600"/> Rooms
                    </Link>
                </li>
                <li className="hover:bg-gray-200 rounded-md p-2 transition-all duration-200 hover:shadow-lg">
                    <Link to="/bookings" className="flex items-center text-gray-700 hover:text-indigo-600">
                        <Payment className="mr-3 text-gray-600"/> Bookings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
