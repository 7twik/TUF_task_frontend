import React from 'react'
import CodeForm from './CodeForm'
import Show from './Show'
import NavigationBar from './Navbar'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<CodeForm />} />
        <Route path="/history" element={<Show />} />
      </Routes>
      {/* <CodeForm />
      <Show /> */}
    </>
  )
}

export default App
