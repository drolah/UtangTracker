import React, { useState } from "react";
import { NAMEOFSTORE } from "../../data";
import { Store } from "lucide-react"; import "./Login.css";
export default function Login({ onLogin }) {
    const [error, setError] = useState("");
    function submit(e) {
        e.preventDefault();
        const f = new FormData(e.currentTarget); if (!f.get('username') || !f.get('password')) return setError('Enter your username and password.'); onLogin()
    }
    return <main className="login">
        <section className="login-hero">
            <Store /><h1>{NAMEOFSTORE}<br />Utang Tracker</h1>
            <p>Utang mo, Ilista ko, pero bayri lang sad😎</p>
        </section><form className="login-card" onSubmit={submit}>
            <small>OWNER ACCESS</small><h2>Welcome back</h2>
            <p>Sign in to manage your store records.</p>
            <label>Username<input name="username" placeholder="Enter username" />
            </label><label>Password<input name="password" type="password" placeholder="Enter password" />
            </label>{error && <div className="error">{error}</div>}
            <button type="submit">LOGIN</button>
        </form>
    </main>
}