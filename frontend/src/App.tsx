import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./pages/public/Home";
import { About } from "./pages/public/About";
import { Notices } from "./pages/public/Notices";
import { NoticeDetail } from "./pages/public/NoticeDetail";
import { Products } from "./pages/public/Products";
import { ProductDetail } from "./pages/public/ProductDetail";
import { Gallery } from "./pages/public/Gallery";
import { Contact } from "./pages/public/Contact";
import { Location } from "./pages/public/Location";
import { AuctionResults } from "./pages/public/AuctionResults";

import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { CompanyInfoEditor } from "./pages/admin/CompanyInfoEditor";
import { NoticesAdmin } from "./pages/admin/NoticesAdmin";
import { ProductsAdmin } from "./pages/admin/ProductsAdmin";
import { GalleryAdmin } from "./pages/admin/GalleryAdmin";
import { InquiriesAdmin } from "./pages/admin/InquiriesAdmin";
import { AuctionResultsAdmin } from "./pages/admin/AuctionResultsAdmin";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:id" element={<NoticeDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/auction-results" element={<AuctionResults />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="company-info" element={<CompanyInfoEditor />} />
            <Route path="notices" element={<NoticesAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="gallery" element={<GalleryAdmin />} />
            <Route path="inquiries" element={<InquiriesAdmin />} />
            <Route path="auction-results" element={<AuctionResultsAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
