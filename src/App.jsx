import React, { useState } from "react";
import Login from "./features/login/Login";
import Dashboard from "./features/dashboard/Dashboard";
import AddCredit from "./features/add-credit/AddCredit";
import PaymentHistory from "./features/history/PaymentHistory";
import CustomerLedger from "./features/customer/CustomerLedger";
import Header from "./components/Header";
import { initialCustomers, TODAY, balance } from "./data";

export default function App() {
  const [logged, setLogged] = useState(false),
    [page, setPage] = useState('dashboard'),
    [customers, setCustomers] = useState(initialCustomers),
    [selectedId, setSelectedId] = useState(null);
  if (!logged) return <Login onLogin={() => setLogged(true)} />;
  const selected = customers.find(c => c.id === selectedId);
  const go = p => { setPage(p); setSelectedId(null) };
  function saveCredit(f) {
    const existing = customers.find(c => c.name.toLowerCase() === f.name.toLowerCase());
    const items = f.items.map(i => ({
      ...i, id: Date.now() + Math.random(),
      date: f.date, qty: Number(i.qty), price: Number(i.price)
    }));
    setCustomers(cs => existing ? cs.map(c => c.id === existing.id ?
      { ...c, items: [...c.items, ...items] } : c) : [...cs,
      { ...f, id: Date.now(), firstDate: f.date, items, payments: [] }]);
    go('dashboard')
  }
  function addPayment(amount) {
    setCustomers(cs =>
      cs.map(c => c.id === selectedId ? {
        ...c, payments: [...c.payments, {
          id: Date.now(),
          date: TODAY, amount: Math.min(Number(amount), balance(c)),
          remarks: Number(amount) >= balance(c) ? 'Full payment' : 'Partial payment'
        }]
      } : c))
  }
  function addItem(i) {
    setCustomers(cs => cs.map(c => c.id === selectedId ? {
      ...c, items: [...c.items,
      { ...i, id: Date.now(), date: TODAY, qty: Number(i.qty), price: Number(i.price) }]
    } : c))
  } return <><Header page={page} onGo={go} onLogout={() =>
    setLogged(false)} /><main className="app-main">
      {selected ? <CustomerLedger customer={selected}
        onBack={() => setSelectedId(null)}
        onAddPayment={addPayment} onAddItem={addItem} /> : page === 'dashboard' ?
        <Dashboard customers={customers} onSelect={setSelectedId} />
        : page === 'add' ? <AddCredit onSave={saveCredit} /> :
          <PaymentHistory customers={customers} />}</main></>
}

