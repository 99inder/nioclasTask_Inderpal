import { Route, Routes } from "react-router-dom"
import Navbar from "./components/common/Navbar"
import LandingPage from "./components/core/LandingPage"
import TestPage from "./components/core/TestPage"
import ResultPage from "./components/core/ResultPage"
import { Toaster } from "react-hot-toast"

const App = () => {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden">
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App