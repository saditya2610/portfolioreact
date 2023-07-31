import React from "react";
function Header() {
  return (
    <React.StrictMode>
      <div className="menubar">
        <div className="menubar-content">
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  <div className="site-title">
                    <a href="/#home" style={{ textDecoration: "none" }}>
                      <h3>Sadit Aditya</h3>
                    </a>
                  </div>
                </div>
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="col-md-9 col-sm-9 navbar-style">
                  <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                  >
                    <ul className="nav navbar-nav">
                      <li>
                        <a href="/#home" className="active">
                          Beranda
                        </a>
                      </li>
                      <li>
                        <a href="/#about">Tentang</a>
                      </li>
                      <li>
                        <a href="/#profil">Profil</a>
                      </li>
                      <li>
                        <a href="/#skill">Kemampuan</a>
                      </li>
                      <li>
                        <a href="/#resume">Pendidikan</a>
                      </li>
                      <li>
                        <a href="/#project">Project</a>
                      </li>
                      <li>
                        <a href="/#contact">Kontak</a>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
  
    </React.StrictMode>
  );
}

export default Header;
