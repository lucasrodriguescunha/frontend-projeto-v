import {Route, Routes} from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import RequestNewPassword from "./pages/RequestNewPassword/RequestNewPassword";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Base from "./pages/Base/Base";
import Upload from "./pages/Upload/Upload";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            {/*<Route path="/about" element={<About/>}/>*/}
            <Route path="*" element={<NotFound/>}/>
            <Route path="/redefinir-senha" element={<RequestNewPassword/>}/>
            <Route path="/app" element={<Base/>}/>
            <Route path="/upload" element={<Upload/>}/>
        </Routes>
    );
};

export default AppRoutes;