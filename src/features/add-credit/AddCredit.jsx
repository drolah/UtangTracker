import React, { useState } from "react";
import { TODAY, PHP } from "../../data";
import "./AddCredit.css";

export default function AddCredit({ onSave }) {
    const [f, setF] = useState({
        name: '',
        contact: '',
        address: '',
        date: TODAY,
        dueDate: '',
        notes: '',
        items: [{
            name: '',
            qty: 1,
            price: ''
        }]
    });
    const updateItem = (i, k, v) =>
        setF({
            ...f, items: f.items.map((x, n) =>
                n === i ? { ...x, [k]: v } : x)
        });
    const total = f.items.reduce((s, i) =>
        s + Number(i.qty || 0) * Number(i.price || 0), 0);
    return <section className="add-credit">
        <p className="eyebrow">NEW TRANSACTION</p>
        <h1>Add Credit</h1>
        <form onSubmit={e => { e.preventDefault(); onSave(f) }}>
            <div className="panel form-grid">
                <h2>Customer Information</h2>
                <label>Name *<input className="input-name" required value={f.name} onChange={e =>
                    setF({ ...f, name: e.target.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })} />
                </label>
                <label>Contact No.<input type="number" value={f.contact}
                    onChange={e => setF({ ...f, contact: e.target.value })} />
                </label>
                <label className="wide">Address *<input className="input-address" required value={f.address}
                    onChange={e => setF({ ...f, address: e.target.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) })} />
                </label></div><div className="panel">
                <div className="form-title">
                    <h2>Items Purchased</h2>
                    <button type="button" className="outline"
                        onClick={() =>
                            setF({
                                ...f,
                                items: [...f.items, {
                                    name: '',
                                    qty: 1,
                                    price: ''
                                }]
                            })}>
                        Add More Item</button>
                </div>{f.items.map((x, i) =>
                    <div className="item-row" key={i}>
                        <input required placeholder="Item name" value={x.name}
                            onChange={e => updateItem(i, 'name', e.target.value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()))} />
                        <input required min="1" type="number" value={x.qty}
                            onChange={e => updateItem(i, 'qty', e.target.value)} />
                        <input required min="0" type="number" placeholder="Price" value={x.price}
                            onChange={e => updateItem(i, 'price', e.target.value)} />
                        <b>{PHP.format(Number(x.qty || 0) * Number(x.price || 0))}</b>
                    </div>)}
                <div className="grand">Grand Total <b>{PHP.format(total)}</b>
                </div>
            </div>
            <div className="panel form-grid">
                <h2>Credit Information</h2><label>Date<input type="date" value={f.date}
                    onChange={e => setF({ ...f, date: e.target.value })} />
                </label><label>Due Date<input type="date" value={f.dueDate}
                    onChange={e => setF({ ...f, dueDate: e.target.value })} />
                </label>
                <label className="wide">Notes<textarea rows="3" value={f.notes}
                    onChange={e => setF({ ...f, notes: e.target.value })} />
                </label>
            </div>
            <button className="save" type="submit">SAVE CREDIT</button>
        </form>
    </section>
}