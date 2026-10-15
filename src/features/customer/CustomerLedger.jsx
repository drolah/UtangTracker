import React, { useState } from "react";
import { ArrowLeft, Plus, CreditCard } from "lucide-react";
import { PHP, sumItems, sumPayments, balance, prettyDate } from "../../data";
import "./CustomerLedger.css";
export default function CustomerLedger({ customer, onBack, onAddPayment, onAddItem }) {
    const [pay, setPay] = useState(''),
        [item, setItem] = useState({ name: '', qty: 1, price: '' });
    return <section className="ledger">
        <button className="back"
            onClick={onBack}><ArrowLeft />Back
        </button>
        <h1>{customer.name}</h1>
        <p>{customer.contact} · {customer.address}</p>
        <div className="ledger-metrics">
            <article>Total Debt<b>{PHP.format(sumItems(customer))}</b>
            </article><article>Paid<b>{PHP.format(sumPayments(customer))}</b>
            </article><article>Balance<b>{PHP.format(balance(customer))}</b>
            </article>
        </div>
        <div className="ledger-grid">
            <div className="panel">
                <h2>Items</h2>
                {customer.items.map(i => <div className="line" key={i.id}>
                    <span>
                        {prettyDate(i.date)} · {i.name} × {i.qty}
                    </span>
                    <b>
                        {PHP.format(i.qty * i.price)}
                    </b>
                </div>)}
                <form onSubmit={e => {
                    e.preventDefault();
                    onAddItem(item);
                    setItem({ name: '', qty: 1, price: '' })
                }}>
                    <h3>
                        <Plus />Add Item
                    </h3>
                    <input required placeholder="Item" value={item.name}
                        onChange={e =>
                            setItem({ ...item, name: e.target.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })} />
                    <input required min="1" type="number" value={item.qty}
                        onChange={e => setItem({ ...item, qty: e.target.value })} />
                    <input required min="0" type="number" placeholder="Price" value={item.price}
                        onChange={e => setItem({ ...item, price: e.target.value })} />
                    <button>Add Item</button>
                </form>
            </div>
            <div className="panel">
                <h2>Payments</h2>
                {customer.payments.map(p =>
                    <div className="line" key={p.id}>
                        <span>
                            {prettyDate(p.date)}
                        </span>
                        <b>{PHP.format(p.amount)}</b>
                    </div>)}
                <form onSubmit={e => {
                    e.preventDefault();
                    onAddPayment(pay);
                    setPay('')
                }}>
                    <h3><CreditCard />Add Payment</h3>
                    <input required min="1" max={balance(customer)} type="number" value={pay}
                        onChange={e => setPay(e.target.value)} placeholder="Amount" />
                    <button>Add Payment</button>
                </form>
            </div>
        </div>
    </section>
}