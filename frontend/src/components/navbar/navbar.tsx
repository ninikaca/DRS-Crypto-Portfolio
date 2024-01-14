import { useEffect, useState } from "react"
import { check_session, end_session } from "../../session/session-manager";
import axios from "axios";
import LoginData from "../../interfaces/ILogin";
import React from "react";

const Navbar = () => {
    const [current, setCurrent] = useState<LoginData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        async function check() {
            try {
                const user: LoginData | null = check_session();
                if (user == null)
                    return false
                setCurrent(user)
                const response = await axios.post('http://localhost:5000/api/users/login', { email: user.email, password: user.password }, {
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

        check()
        setLoading(false)
    }, [])
    return (
        <div>
            {!loading &&
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <img
                                src="regis.png"
                                width={35}
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
                            <a href="/" className="navbar-item">Home</a>
                            <a href="/portfolio" className="navbar-item">My Portfolio</a>

                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                {current == null ?

                                    <div className="buttons">
                                        <a href="/registration" className="button is-primary">
                                            <strong>Register</strong>
                                        </a>
                                        <a href="/login" className="button is-light">Log In</a>
                                    </div>
                                    :
                                    <div>
                                        <div className="buttons">
                                            <h1>Welcome, {current.email} &emsp;</h1>
                                            
                                            <button onClick={() => { window.location.href = "/edit" }} className="button is-info is-outlined" >
                                                Edit profile
                                            </button>
                                            <button onClick={() => { end_session(); window.location.href = "/" }} className="button is-danger">
                                                <strong>Log Out</strong>
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