import React from "react";
import { Store, LayoutDashboard, History, PlusCircle, LogOut } from "lucide-react";
import { NAMEOFSTORE } from "../data";
import "./Header.css";
export default function Header({ page, onGo, onLogout }) {
    return <header><div className="brand">
        <Store /> <b>{NAMEOFSTORE}</b>
    </div>
        <nav>
            <button className={page === 'dashboard' ? 'active' : ''}
                onClick={() => onGo('dashboard')}><LayoutDashboard />
                Dashboard</button>
            <button className={page === 'history' ? 'active' : ''}
                onClick={() => onGo('history')}>
                <History />
                Histories
            </button>
            <button className={page === 'add' ? 'active' : ''}
                onClick={() => onGo('add')}><PlusCircle />
                Add Credit
            </button>
            <button className="logout"
                onClick={onLogout}>
                <LogOut />Logout
            </button>
        </nav>
    </header>
}