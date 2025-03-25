import {BrowserRouter as Router, Route, Routes} from "react-router";
import NotFound from "./pages/notFound/NotFound";
import RequestNewPassword from "./pages/requestNewPassword/RequestNewPassword";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                {/*<Route path="/about" element={<About/>}/>*/}
                <Route path="*" element={<NotFound/>}/>
                <Route path="/nova-senha" element={<RequestNewPassword/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;