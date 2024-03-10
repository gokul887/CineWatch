import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import Movies from "./pages/Movies";

import Detail from "./pages/Detail";
import WatchList from "./pages/WatchList";
import { CookiesProvider, useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { handleGetMovies } from "./util/Util";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const isLoggedIn = cookies.userId !== undefined;
  const dispatch = useDispatch();
  useEffect(() => {
    // const onUnload = async () => {
    //   await saveToDb.then((res) => {dispatch(setLoadedToWatchMovies())})
    // }
    const getMovies = async () => {
      await handleGetMovies(cookies.userId);
    };
    if (isLoggedIn) {
      getMovies();
    }
  }, []);

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <div>
        <Toaster />
      </div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
