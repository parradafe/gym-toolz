import { Navigate, Route, Routes } from 'react-router'
import { Config } from './components/Config/Config'
import { Land } from './components/Land/Land'
import { AppLayout } from './components/layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Land />} />
        <Route path="discos" element={<Config />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
