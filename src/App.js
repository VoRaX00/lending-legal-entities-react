import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/main";
import LoginPage from "./pages/login/login";
import PaymentsPage from "./pages/payments/payments";
import CreditsPage from "./pages/credits/credits";
import RequestPage from "./pages/request/request";
import {AuthProvider} from "./context/auth";
import Navbar from "./components/navbar/navbar";
import AddCreditProductForm from "./pages/credits/addCredits";
import RequestsAllPage from "./pages/request/requestAll";
import PaymentsAdminPage from "./pages/payments/paymentsAdmin";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/*<Route path="/registration" element={<RegistrationPage />}></Route>*/}
                <Route path="/payments" element={<PaymentsPage />}></Route>
                <Route path="/admin/payments" element={<PaymentsAdminPage/>}></Route>
                <Route path="/admin/credits" element={<CreditsPage></CreditsPage>}></Route>
                <Route path="/admin/addCredits" element={<AddCreditProductForm></AddCreditProductForm>}></Route>
                <Route path="/admin/requests" element={<RequestsAllPage></RequestsAllPage>}></Route>
                <Route path="/request" element={<RequestPage />}></Route>
            </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
