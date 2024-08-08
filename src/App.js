import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar";
import CustomersView from "./views/CustomersView";
import Home from "./views/Home";
import RoomsView from "./views/RoomsView";
import BookingsView from "./views/BookingsView";

function Layout({ children }) {
    return (
        <div className="flex">
            <ToastContainer />
            <Sidebar />
            <main className="w-5/6 p-5">{children}</main>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers" element={<CustomersView />} />
                    <Route path="/rooms" element={<RoomsView/>}/>
                    <Route path="/bookings" element={<BookingsView/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
