import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './assets/ScrollTop';
import { AllReview } from './components/review/AllReview';
import { AllNews } from './components/news/AllNews';
import { Faq } from './components/home/acardion/AllFaq';
import { Footer } from './components/footer/Footer';
import { Service } from './components/service/Service';
import { DetailNews } from './components/news/detailNews/Detail';
import { Rules } from './components/ rules/Rules';
import { Contacts } from './components/contacts/Contacts';
import { Home } from './components/home/Home';
import { PaymentStep } from './components/payment/Payment';
import { Register } from './components/loginpersonalprofile/register/Register';
import Profile from './components/profiles/profile/Profil';
import Aplications from './components/profiles/applications/Applications';
import History from './components/profiles/history/History';
import { Login } from './components/loginpersonalprofile/Login';
import { Forgot_Password } from './components/loginpersonalprofile/Forgot_Password';
import { New_Password } from './components/loginpersonalprofile/New_Password';
import Rulesconfident from './components/Termsservice';
import PrivacyPolicy from './components/PrivacyPolicy';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components/loginpersonalprofile/auth/ProtectedRoute';
import { PublicRoute } from './components/loginpersonalprofile/auth/PublicRoute';
import NotFound from './assets/NotFound';
import { Payment_two } from './components/payment/Payment_two';
import { LegalEntity } from './components/profiles/verificationLegalEntity/VerificationLegalEntity';
import { DataLoading } from './components/profiles/verificationLegalEntity/DataLoading';
import { PhotoDostup } from './components/profiles/verificationLegalEntity/PhotoDostup';
import { VerificationPhone } from './components/profiles/verificationLegalEntity/VerificationPhone';
import { DoctypeVerificate } from './components/profiles/verificationLegalEntity/DoctypeVerificate';
import { Pasport } from './components/profiles/verificationLegalEntity/Pasport';

const hideHeaderRoutes = [
  '/exchanger002',
  '/payment_step',
  '/registration',
  '/profile',
  '/applications',
  '/operations',
  '/login',
  '/forgot_your_password',
  '/new_password',
  '/register'
];

function App() {
  const location = useLocation();

  const definedRoutes = [
    '/',
    '/all_review',
    '/all_news',
    '/news/:slug',
    '/faq',
    '/service',
    '/exchange_rules',
    '/contacts',
    '/payment_step',
    '/login',
    '/register',
    '/forgot_your_password',
    '/new_password',
    '/terms-of-service',
    '/privacy-policy',
    '/applications',
    '/operations',
    '/profile'
  ];

  // Проверяем, является ли текущий путь одним из hideHeaderRoutes или неопределённым (404)
  const shouldHideFooter = hideHeaderRoutes.includes(location.pathname) ||
    !definedRoutes.some(route => 
      route.includes(':slug') 
        ? location.pathname.match(route.replace(':slug', '[^/]+')) 
        : location.pathname === route
    );

  return (
    <>
      <div>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all_review" element={<AllReview />} />
          <Route path="/all_news" element={<AllNews />} />
          <Route path="/news/:slug" element={<DetailNews />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/service" element={<Service />} />
          <Route path="/exchange_rules" element={<Rules />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/payment_step" element={<PaymentStep />} />
          <Route path="/payment_step_two" element={<Payment_two />} />
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
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Aplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verification"
            element={
              <ProtectedRoute>
                <LegalEntity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-loading"
            element={
              <ProtectedRoute>
                <DoctypeVerificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo-access"
            element={
              <ProtectedRoute>
                <PhotoDostup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/phone"
            element={
              <ProtectedRoute>
                <VerificationPhone />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pasport"
            element={
              <ProtectedRoute>
                <Pasport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  );
}

export default App
