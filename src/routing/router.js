import { createBrowserRouter } from "react-router-dom"
import Root from "../Root";
import Error from "../page/Error";
import HomePage from "../page/Home";
import DetailPage from "../page/Detail"

const router = createBrowserRouter([
  {
    element: <Root/>,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/detail/:id',
        element: <DetailPage />
      },
      
    ]
    
  }
])

export default router;
