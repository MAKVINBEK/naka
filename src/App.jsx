import "./assets/Bootsrap.min.css"
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from './assets/ScrollTop';
import { AllReview } from "./components/review/AllReview";
import { AllNews } from "./components/news/AllNews";
import { Faq } from "./components/home/acardion/AllFaq";
import { Footer } from "./components/footer/Footer";
import { Service } from "./components/service/Service";
import { Exchanger_Two } from "./components/home/exchanger/Exchanger_two";
import { DetailNews } from "./components/news/detailNews/Detail";
import { Rules } from "./components/ rules/Rules";
import { Contacts } from "./components/contacts/Contacts";
import { Home } from "./components/home/Home";
import { PaymentStep } from "./components/payment/Payment";
import { Register } from "./components/loginpersonalprofile/register/Register";
import Profile from "./components/profiles/profile/Profil";
import Aplications from "./components/profiles/applications/Applications";
import History from "./components/profiles/history/History";
import { Login } from "./components/loginpersonalprofile/Login";
import { Forgot_Password } from "./components/loginpersonalprofile/Forgot_Password";
import { New_Password } from "./components/loginpersonalprofile/New_Password";
import Rulesconfident from "./components/Termsservice";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/loginpersonalprofile/auth/ProtectedRoute";
import { PublicRoute } from "./components/loginpersonalprofile/auth/PublicRoute";


function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/exchanger002', '/payment_step', '/registration', '/profile', '/applications', '/operations', '/login', '/forgot_your_password', '/new_password'];
  return (

    <>
      <div>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/all_review' element={<AllReview />} />
          <Route path='/all_news' element={<AllNews />} />
          <Route path='/news/:id' element={<DetailNews />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/service' element={<Service />} />
          <Route path='/exchanger002' element={<Exchanger_Two />} />
          <Route path='/exchange_rules' element={<Rules />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/payment_step' element={<PaymentStep />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/forgot_your_password" element={<Forgot_Password />} />
          <Route path="/new_password" element={<New_Password />} />
          <Route path="/terms-of-service" element={<Rulesconfident />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/applications" element={<ProtectedRoute><Aplications /></ProtectedRoute>} />
          <Route path='/operations' element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  )
}

export default App
