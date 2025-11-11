import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileDock from "./components/MobileDock";
import LegalModal from "./modals/LegalModal";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("tos");

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-neutral-50 text-neutral-900 [--primary:#00c7ae]">
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 - 라우팅 */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* 푸터 */}
        <Footer setLegalOpen={setLegalOpen} setLegalTab={setLegalTab} />

        {/* 약관 모달 */}
        <LegalModal 
          open={legalOpen} 
          onClose={() => setLegalOpen(false)} 
          activeTab={legalTab} 
          setActiveTab={setLegalTab} 
        />

        {/* 모바일 Dock */}
        <MobileDock />
      </div>
    </BrowserRouter>
  );
}
