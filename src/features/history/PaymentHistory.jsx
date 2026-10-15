import React from "react";
import { PHP, prettyDate } from "../../data"; import "./PaymentHistory.css"; export default function PaymentHistory({ customers }) {
    const rows = customers.flatMap(c =>
        c.payments.map(p => ({ ...p, customer: c.name }))).sort((a, b) =>
            new Date(b.date) - new Date(a.date));
    return <section className="history">
        <p className="eyebrow">COLLECTIONS</p>
        <h1>Payment Histories</h1>
        <div className="history-total">Total Collected <b>{PHP.format(rows.reduce((s, p) =>
            s + p.amount, 0))}</b>
        </div>
        <div className="panel">
            <table><thead><tr>
                <th>Customer</th>
                <th>Date Paid</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>
            </thead>
                <tbody>{rows.map(p =>
                    <tr key={p.id}>
                        <td>{p.customer}</td>
                        <td>{prettyDate(p.date)}</td>
                        <td>{PHP.format(p.amount)}</td>
                        <td>{p.remarks}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </section>
}