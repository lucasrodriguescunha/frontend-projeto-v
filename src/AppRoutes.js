import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import RequestNewPassword from "./pages/requestNewPassword/RequestNewPassword";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                {/*<Route path="/about" element={<About/>}/>*/}
                <Route path="*" element={<NotFound/>}/>
                <Route path="/novasenha" element={<RequestNewPassword/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;