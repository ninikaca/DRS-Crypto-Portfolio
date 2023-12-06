import { useEffect, useState } from "react"
import { proveri_sesiju, zavrsi_sesiju } from "../../session/session-manager"
import axios from "axios";

const Navbar = () => {
    const [trenutni, setTrenutni] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true)
        async function proveri() {
            try {
                let korisnik = proveri_sesiju()
                if(korisnik == null)
                    return false
                setTrenutni(korisnik)
                const response = await axios.post('http://localhost:5000/api/korisnici/prijava', {email:korisnik.email, lozinka:korisnik.lozinka}, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 201)
                    return true
                else
                    return false
            }
            catch (error) {
                return false
            }
        }

        proveri()
        setLoading(false)
    }, [])
    return (
        <div>
            {!loading && 
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img
                            src="logo.png"
                            width={40}
                            height={50}
                            alt=""
                        />
                    </a>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        href="# "
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">Home</a>
                        <a className="navbar-item">Documentation</a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">More</a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item">About</a>
                                <a className="navbar-item">Jobs</a>
                                <a className="navbar-item">Contact</a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item">Report an issue</a>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {trenutni == null ?

                                <div className="buttons">
                                    <a href="/registracija" className="button is-primary">
                                        <strong>Registracija</strong>
                                    </a>
                                    <a href="/prijava" className="button is-light">Prijavi se</a>
                                </div>
                                : 
                                <div>
                                    <div className="buttons">
                                    <h1>Dobrodošli, {trenutni.email}</h1>
                                    <button onClick={() => {zavrsi_sesiju(); window.location.href = "/"}} className="button is-danger ml-2">
                                        <strong>Odjavi se</strong>
                                    </button>
                                    </div>
                                    </div>}
                        </div>
                    </div>
                </div>
            </nav>
            }
        </div>
    )
}

export default Navbar