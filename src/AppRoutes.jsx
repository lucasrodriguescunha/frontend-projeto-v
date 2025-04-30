import {Route, Routes} from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import RequestNewPassword from "./pages/RequestNewPassword/RequestNewPassword";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Base from "./pages/Base/Base";
import Upload from "./pages/Upload/Upload";
import Report from "./pages/Report/Report";
import Admin from "./pages/Admin/Admin";
import DataTableHistoric from "./components/DataTableHistoric/DataTableHistoric";

const appRoutes = [
    {path: "/app/home", element: <Base/>},
    {path: "/app/upload", element: <Upload/>},
    {path: "/app/report", element: <Report/>},
    {path: "/app/admin", element: <Admin/>},
    {path: "/app/table", element: <DataTableHistoric/>},
    //...
];

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/redefinir-senha" element={<RequestNewPassword/>}/>
            {appRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element}/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRoutes;
