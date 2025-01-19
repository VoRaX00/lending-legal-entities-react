import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/main/main";
import LoginPage from "./pages/login/login";
import PaymentsPage from "./pages/payments/payments";
import CreditsPage from "./pages/credits/credits";
import RequestPage from "./pages/request/request";
import { AuthProvider, useAuth } from "./context/auth";
import Navbar from "./components/navbar/navbar";
import AddCreditProductForm from "./pages/credits/addCredits";
import RequestsAllPage from "./pages/request/requestAll";
import PaymentsAdminPage from "./pages/payments/paymentsAdmin";
import RegistrationPage from "./pages/registration/registration";
import UsersPage from "./pages/users/users";

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return element;
};

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute element={<MainPage />} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                    <Route path="/payments" element={<ProtectedRoute element={<PaymentsPage />} />} />
                    <Route path="/admin/payments" element={<ProtectedRoute element={<PaymentsAdminPage />} />} />
                    <Route path="/admin/credits" element={<ProtectedRoute element={<CreditsPage />} />} />
                    <Route path="/admin/addCredits" element={<ProtectedRoute element={<AddCreditProductForm />} />} />
                    <Route path="/admin/requests" element={<ProtectedRoute element={<RequestsAllPage />} />} />
                    <Route path="/request" element={<ProtectedRoute element={<RequestPage />} />} />
                    <Route path="/admin/users" element={<ProtectedRoute element={<UsersPage />}></ProtectedRoute> }/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
