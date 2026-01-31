import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from '../components/common/Loading'

const Home = lazy(() => import('../pages/Home').then(module => ({ default: module.Home })))
const PetsList = lazy(() => import('../pages/Pets/PetsList').then(module => ({ default: module.PetsList })))
const TutoresList = lazy(() => import('../pages/Tutores/TutoresList').then(module => ({ default: module.TutoresList })))
const Login = lazy(() => import('../pages/Auth/Login').then(module => ({ default: module.Login })))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetsList />} />
          <Route path="/tutores" element={<TutoresList />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
