import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import CustomersView from "./views/CustomersView";
import Home from "./views/Home";

function Layout({ children }) {
    return (
        <div className="flex">
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
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
