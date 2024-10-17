import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./pages";
import NotFound from "./notFound";
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from "react-redux"
import Store from './redux/store'
import Detailed, { loader } from "./pages/detailed";
import { Root } from "./components/root";


let persistor = persistStore(Store)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                element: <Home />,
                errorElement: <NotFound />,
                index: true
            },
            {
                path: "/:id",
                element: <Detailed />,
                loader: loader,
            }
        ]
    }
])


function App() {
    return (
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router}/>
          </PersistGate>
        </Provider>
    );
}

export default App;
