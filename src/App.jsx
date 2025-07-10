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

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/exchanger002','/payment_step'];
  return (

    <>
      <div>
        <ScrollToTop/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/all_review' element={<AllReview/>} />
            <Route path='/all_news' element={<AllNews/>} />
            <Route path='/news/:id' element={<DetailNews/>} />
            <Route path='/faq' element={<Faq/>} />
            <Route path='/service' element={<Service/>} />
            <Route path='/exchanger002' element={<Exchanger_Two/>}/>
            <Route path='/exchange_rules' element={<Rules/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/payment_step' element={<PaymentStep/>}/>
          </Routes>
          {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  )
}

export default App
