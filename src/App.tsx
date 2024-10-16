import { Route, Routes } from "react-router-dom";
import Home from "./pages";
import NotFound from "./notFound";
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from "react-redux"
import Store from './redux/store'


let persistor = persistStore(Store)


function App() {
    return (
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
              <Home />
          </PersistGate>
        </Provider>
    );
}

export default App;
