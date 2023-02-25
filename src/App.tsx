import { useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import Routes from "./Routes";
import { Alert } from "./components/Alert";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Alert />
          <Navbar />
          <Routes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
