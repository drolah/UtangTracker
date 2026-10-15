export const TODAY = new Date().toISOString().split("T")[0];
export const NAMEOFSTORE = "Virgie/Roel Store";
export const initialCustomers = [
    {
        id: 1,
        name: "Juan Dela Cruz",
        contact: "09123456789",
        address: "Purok 3, Barangay San Roque",
        firstDate: "2026-10-10",
        dueDate: "2026-11-10",
        notes: "Pays every payday.",
        items: [{
            id: 1,
            date: "2026-10-10",
            name: "Sardines", qty: 3,
            price: 30
        },
        {
            id: 2,
            date: "2026-10-10",
            name: "Rice 1kg",
            qty: 2, price: 55
        }],
        payments: [{
            id: 1,
            date: "2026-10-13",
            amount: 100,
            remarks: "Partial payment"
        }]
    },
    {
        id: 2,
        name: "Pedro Reyes",
        contact: "09171112222",
        address: "Purok 1, Barangay Luz",
        firstDate: "2026-09-01",
        dueDate: "2026-09-30",
        notes: "Follow up requested.",
        items: [{
            id: 7,
            date: "2026-09-01",
            name: "Groceries",
            qty: 1, price: 980
        }],
        payments: []
    }];
export const PHP = new Intl.NumberFormat("en-PH",
    {
        style: "currency", currency: "PHP"

    });
export const sumItems = c => c.items.reduce(
    (s, i) => s + Number(i.qty) * Number(i.price), 0);
export const sumPayments = c => c.payments.reduce(
    (s, p) => s + Number(p.amount), 0);
export const balance = c => Math.max(sumItems(c) - sumPayments(c), 0);
export const status = c => balance(c) === 0 ? "Paid" : sumPayments(c) > 0 ? "Partial" : "Unpaid";
export const prettyDate = d =>
    new Date(`${d}T00:00:00`).toLocaleDateString("en-US",
        { month: "short", day: "numeric", year: "numeric" });