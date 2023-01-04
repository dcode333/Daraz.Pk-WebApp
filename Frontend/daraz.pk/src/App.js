import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux_Store/Store";
import Routes from "./Routes/App";
import NavBar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <Routes />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
