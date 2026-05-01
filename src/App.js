import React from "react";
import "./styles.css";

// import Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Component
import Header from "./component/Header";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import BackgroundMusic from "./component/BackgroundMusic";
import { MusicProvider } from "./context/MusicContext";
import { LanguageProvider } from "./context/LanguageContext";

// import Pages
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";


function App() {
  return (
    <React.StrictMode>
      <LanguageProvider>
        <Router>
          <MusicProvider>
            <BackgroundMusic />
            <Header />
            <ScrollToTop>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects" component={Projects} />
              </Switch>
            </ScrollToTop>
            <Footer />
          </MusicProvider>
        </Router>
      </LanguageProvider>
    </React.StrictMode>
  );
}

export default App;
