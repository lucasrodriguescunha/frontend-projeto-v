import {Route, Routes} from "react-router";
import NotFound from "./pages/notFound/NotFound";
import RequestNewPassword from "./pages/requestNewPassword/RequestNewPassword";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Container from "./pages/container/Container";
import Upload from "./pages/upload/Upload";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            {/*<Route path="/about" element={<About/>}/>*/}
            <Route path="*" element={<NotFound/>}/>
            <Route path="/redefinir-senha" element={<RequestNewPassword/>}/>
            <Route path="/home" element={<Container/>}/>
            <Route path="/upload" element={<Upload/>}/>
        </Routes>
    );
};

export default AppRoutes;