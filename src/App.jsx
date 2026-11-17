import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import { MenuProvider } from './context/MenuProvider.jsx'
import RequireAdmin from './components/auth/RequireAdmin.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import CustomerLayout from './layouts/CustomerLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import QRManagement from './pages/admin/QRManagement.jsx'
import Categories from './pages/admin/Categories.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'
import BarProfile from './pages/admin/BarProfile.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import Welcome from './pages/customer/Welcome.jsx'
import CustomerMenu from './pages/customer/Menu.jsx'
import CategoryPage from './pages/customer/Category.jsx'
import About from './pages/customer/About.jsx'
import Contact from './pages/customer/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return <BrowserRouter><AuthProvider><MenuProvider><Routes>
    <Route path="/" element={<Navigate to="/admin" replace />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route element={<RequireAdmin />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="qr" element={<QRManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="profile" element={<BarProfile />} />
      </Route>
    </Route>
    <Route path="/menu/:slug" element={<CustomerLayout />}>
      <Route index element={<Welcome />} />
      <Route path="items" element={<CustomerMenu />} />
      <Route path="category/:categoryId" element={<CategoryPage />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes></MenuProvider></AuthProvider></BrowserRouter>
}
