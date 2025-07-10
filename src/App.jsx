import "./assets/Bootsrap.min.css"
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from './component/home/Home';
import ScrollToTop from './assets/ScrollTop';
import { AllReview } from "./component/review/AllReview";
import { AllNews } from "./component/news/AllNews";
import { Faq } from "./component/home/acardion/AllFaq";
import { Footer } from "./component/footer/Footer";
import { Service } from "./component/service/Service";
import { Exchanger_Two } from "./component/home/exchanger/Exchanger_two";
import { DetailNews } from "./component/news/detailNews/Detail";
import { Rules } from "./component/ rules/Rules";
import { Contacts } from "./component/contacts/Contacts";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/exchanger002'];
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
          </Routes>
          {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
      </div>
    </>
  )
}

export default App
