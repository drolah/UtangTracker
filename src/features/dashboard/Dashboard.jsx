import React, { useState } from "react";
import { Users, Wallet, Eye, Search } from "lucide-react";
import { PHP, balance, prettyDate, status } from "../../data";
import "./Dashboard.css";
export default function Dashboard({ customers, onSelect }) {
    const [q, setQ] = useState('');
    const open = customers.filter(c => balance(c) > 0);
    const rows = open.filter(c =>
        `${c.name} ${c.address}`.toLowerCase().includes(q.toLowerCase())
    );
    const total = open.reduce((s, c) => s + balance(c), 0);
    return <section className="dashboard">
        <p className="eyebrow">OVERVIEW</p>
        <h1>Dashboard</h1>
        <div className="metrics">
            <article><Users />
                <div>
                    <span>Customers with Debt</span>
                    <b>{open.length}</b>
                </div></article>
            <article>
                <Wallet />
                <div>
                    <span>Total Receivables</span>
                    <b>{PHP.format(total)}</b></div></article></div>
        <div className="panel">
            <div className="panel-head">
                <h2>Customers with Debt</h2>
                <div className="search"><Search />
                    <input value={q} onChange={e =>
                        setQ(e.target.value)}
                        placeholder="Search customer" />
                </div></div><div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Date Utang</th>
                            <th>Balance</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(c =>
                            <tr className = "d-board-table-list" key={c.id} onClick={() => onSelect(c.id)}>
                                <td>
                                    <b>{c.name}
                                    </b>
                                    <small>
                                        {c.address}
                                    </small>
                                </td>
                                <td>
                                    {prettyDate(c.firstDate)}
                                </td>
                                <td>
                                    <b>
                                        {PHP.format(balance(c))}
                                    </b></td><td>
                                    <span className={`badge ${status(c).toLowerCase()}`}>
                                        {status(c)}
                                    </span>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
}