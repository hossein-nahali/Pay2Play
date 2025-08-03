import {createBrowserRouter} from "react-router";
import Global from "../layout/global/global.tsx";
import Home from "../pages/home/Home.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Global/>,
        errorElement: <p>error</p>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "profile",
                element: <p>profile</p>
            }
        ]
    }
]);

export default router;