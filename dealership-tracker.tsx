import { useState } from "react";

const initialDeals = [
  { id: 1, customerId: 3, customer: "Derek Hollis", vehicle: "2023 Honda Accord Sport", salePrice: 28500, vehicleCost: 24000, tradeIn: 5000, tradeInACV: 4200, pack: 500, reconCost: 320, fiIncome: 1200, holdback: 480, salesperson: "Jenna Park", finance: "Financed", status: "Closed", saleDate: "2026-05-28" },
  { id: 2, customerId: 2, customer: "Priya Nair", vehicle: "2022 Toyota Camry XSE", salePrice: 31200, vehicleCost: 26500, tradeIn: 0, tradeInACV: 0, pack: 500, reconCost: 150, fiIncome: 800, holdback: 520, salesperson: "Tom Bauer", finance: "Cash", status: "Pending F&I", saleDate: "2026-06-05" },
  { id: 3, customerId: 4, customer: "Samantha Cruz", vehicle: "2024 Ford Mustang GT", salePrice: 44900, vehicleCost: 38000, tradeIn: 8000, tradeInACV: 7200, pack: 500, reconCost: 0, fiIncome: 0, holdback: 710, salesperson: "Jenna Park", finance: "Financed", status: "Working", saleDate: null },
  { id: 4, customerId: 1, customer: "Marcus Webb", vehicle: "2023 Audi A4 Premium Plus", salePrice: 52000, vehicleCost: 44000, tradeIn: 12000, tradeInACV: 11200, pack: 500, reconCost: 600, fiIncome: 1800, holdback: 890, salesperson: "Tom Bauer", finance: "Financed", status: "Closed", saleDate: "2026-06-01" },
];

const initialInventory = [
  { id: 1, vin: "1HGCM82633A123456", year: 2023, make: "Honda", model: "Accord", trim: "Sport", color: "Sonic Gray", miles: 12400, price: 28500, cost: 24000, status: "Available", lot: "A12" },
  { id: 2, vin: "2T1BURHE0JC034521", year: 2022, make: "Toyota", model: "Camry", trim: "XSE", color: "Wind Chill Pearl", miles: 8900, price: 31200, cost: 26500, status: "Available", lot: "B04" },
  { id: 3, vin: "1FA6P8CF5L5123789", year: 2024, make: "Ford", model: "Mustang", trim: "GT", color: "Race Red", miles: 2100, price: 44900, cost: 38000, status: "Reserved", lot: "C01" },
  { id: 4, vin: "3VWFE21C04M000001", year: 2021, make: "Volkswagen", model: "Jetta", trim: "SE", color: "Deep Black", miles: 31200, price: 19800, cost: 16500, status: "Available", lot: "A07" },
  { id: 5, vin: "WAUENAF40JN009871", year: 2023, make: "Audi", model: "A4", trim: "Premium Plus", color: "Glacier White", miles: 5500, price: 52000, cost: 44000, status: "Sold", lot: "D02" },
];

const initialCustomers = [
  { id: 1, name: "Marcus Webb", email: "m.webb@email.com", phone: "555-0192", city: "Austin", status: "Active", interest: "SUV", source: "Walk-in", lastContact: "2026-06-03" },
  { id: 2, name: "Priya Nair", email: "priya.nair@mail.com", phone: "555-0347", city: "Round Rock", status: "Hot Lead", interest: "Sedan", source: "Website", lastContact: "2026-06-05" },
  { id: 3, name: "Derek Hollis", email: "dhollis@webco.com", phone: "555-0521", city: "Cedar Park", status: "Purchased", interest: "Truck", source: "Referral", lastContact: "2026-05-28" },
  { id: 4, name: "Samantha Cruz", email: "s.cruz@gmail.com", phone: "555-0784", city: "Austin", status: "Follow-up", interest: "Coupe", source: "Social Media", lastContact: "2026-06-01" },
];

const initialService = [
  { id: 1, customer: "Lena Okafor", vehicle: "2020 Toyota RAV4", vin: "2T3P1RFV3LW001234", advisor: "Mike Torres", type: "Oil Change + Tire Rotation", status: "Completed", dateIn: "2026-06-07", eta: "2026-06-07", estimate: 95, total: 95, mileage: 44200 },
  { id: 2, customer: "James Whitfield", vehicle: "2019 Honda CR-V", vin: "2HKRW2H55KH601234", advisor: "Sarah Kim", type: "Brake Service", status: "In Progress", dateIn: "2026-06-07", eta: "2026-06-07", estimate: 580, total: null, mileage: 61800 },
  { id: 3, customer: "Aiko Tanaka", vehicle: "2021 Ford F-150", vin: "1FTFW1E80MFC12345", advisor: "Mike Torres", type: "Transmission Diagnostic", status: "Waiting Parts", dateIn: "2026-06-06", eta: "2026-06-09", estimate: 1200, total: null, mileage: 38500 },
  { id: 4, customer: "Carlos Reyes", vehicle: "2022 Chevrolet Silverado", vin: "1GCUDDED9NZ123456", advisor: "Sarah Kim", type: "AC Recharge", status: "Scheduled", dateIn: "2026-06-08", eta: "2026-06-08", estimate: 220, total: null, mileage: 22100 },
];

// Profit calculation
const calcProfit = d => {
  const frontEnd = d.salePrice - d.vehicleCost - d.pack - d.reconCost + (d.tradeInACV - d.tradeIn);
  const backEnd = d.fiIncome + d.holdback;
  const total = frontEnd + backEnd;
  return { frontEnd, backEnd, total };
};

const TABS = ["Inventory", "Sales & Deals", "Customers", "Service"];

const statusColor = {
  Available: "#22c55e", Reserved: "#f59e0b", Sold: "#6b7280",
  "Hot Lead": "#ef4444", Active: "#3b82f6", Purchased: "#22c55e", "Follow-up": "#f59e0b",
  Closed: "#22c55e", "Pending F&I": "#f59e0b", Working: "#3b82f6",
  Completed: "#22c55e", "In Progress": "#3b82f6", "Waiting Parts": "#f59e0b", Scheduled: "#a855f7",
};

const Badge = ({ label }) => (
  <span style={{
    background: (statusColor[label] || "#6b7280") + "22",
    color: statusColor[label] || "#6b7280",
    border: `1px solid ${statusColor[label] || "#6b7280"}44`,
    padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap"
  }}>{label}</span>
);

const fmt$ = v => v == null ? "—" : (v < 0 ? "-$" + Math.abs(v).toLocaleString() : "$" + Number(v).toLocaleString());
const fmtN = v => v == null ? "—" : Number(v).toLocaleString();
const pct = (a, b) => b ? ((a / b) * 100).toFixed(1) + "%" : "—";

// Mini bar for profit breakdown
function ProfitBar({ front, back }) {
  const total = front + back;
  if (total <= 0) return <span style={{ color: "#ef4444", fontSize: 12 }}>{fmt$(total)}</span>;
  const fp = Math.round((front / total) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 120 }}>
      <div style={{ display: "flex", height: 6, borderRadius: 99, overflow: "hidden", gap: 1 }}>
        <div style={{ width: fp + "%", background: "#6366f1", borderRadius: "99px 0 0 99px" }} />
        <div style={{ flex: 1, background: "#22c55e", borderRadius: "0 99px 99px 0" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6b7280" }}>
        <span style={{ color: "#818cf8" }}>F {fmt$(front)}</span>
        <span style={{ color: "#22c55e" }}>B {fmt$(back)}</span>
      </div>
    </div>
  );
}

function ProfitModal({ deal, onClose }) {
  const p = calcProfit(deal);
  const margin = pct(p.total, deal.salePrice);

  const rows = [
    { label: "Sale Price", value: deal.salePrice, color: "#e2e4ed" },
    { label: "Vehicle Cost", value: -deal.vehicleCost, color: "#ef4444" },
    { label: "Pack", value: -deal.pack, color: "#f59e0b" },
    { label: "Recon Cost", value: -deal.reconCost, color: deal.reconCost > 0 ? "#f59e0b" : "#6b7280" },
    { label: "Trade-In Allowance", value: -deal.tradeIn, color: "#ef4444" },
    { label: "Trade-In ACV", value: deal.tradeInACV, color: "#22c55e" },
  ];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000aa", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#13141e", border: "1px solid #2a2c40", borderRadius: 18, padding: "32px", width: 460, maxWidth: "95vw" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Profit Breakdown</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#c7cadd" }}>{deal.vehicle}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{deal.customer} · {deal.salesperson} · {deal.saleDate || "In Progress"}</div>
        </div>

        {/* Front-end section */}
        <div style={{ background: "#0d0e1488", border: "1px solid #1e2030", borderRadius: 12, padding: 16, marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Front-End Gross</div>
          {rows.map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #1a1c28" }}>
              <span style={{ fontSize: 13, color: "#9096b0" }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: r.value < 0 ? "#ef4444" : r.color }}>{fmt$(r.value)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, fontWeight: 700 }}>
            <span style={{ fontSize: 13, color: "#c7cadd" }}>Front-End Gross</span>
            <span style={{ fontSize: 15, color: p.frontEnd >= 0 ? "#818cf8" : "#ef4444" }}>{fmt$(p.frontEnd)}</span>
          </div>
        </div>

        {/* Back-end section */}
        <div style={{ background: "#0d0e1488", border: "1px solid #1e2030", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Back-End Gross</div>
          {[{ label: "F&I Income", value: deal.fiIncome }, { label: "Holdback", value: deal.holdback }].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #1a1c28" }}>
              <span style={{ fontSize: 13, color: "#9096b0" }}>{r.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{fmt$(r.value)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, fontWeight: 700 }}>
            <span style={{ fontSize: 13, color: "#c7cadd" }}>Back-End Gross</span>
            <span style={{ fontSize: 15, color: "#22c55e" }}>{fmt$(p.backEnd)}</span>
          </div>
        </div>

        {/* Total */}
        <div style={{ background: p.total >= 0 ? "#22c55e11" : "#ef444411", border: `1px solid ${p.total >= 0 ? "#22c55e33" : "#ef444433"}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>Total Gross Profit</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Margin: {margin}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: p.total >= 0 ? "#22c55e" : "#ef4444", letterSpacing: "-0.02em" }}>{fmt$(p.total)}</div>
        </div>

        <button onClick={onClose} style={{ marginTop: 20, width: "100%", background: "#1e2030", border: "none", borderRadius: 10, padding: "11px", color: "#9096b0", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>Close</button>
      </div>
    </div>
  );
}

function ProfitSummary({ deals }) {
  const closed = deals.filter(d => d.status === "Closed" || d.status === "Pending F&I");
  const byPerson = {};
  closed.forEach(d => {
    const p = calcProfit(d);
    if (!byPerson[d.salesperson]) byPerson[d.salesperson] = { deals: 0, front: 0, back: 0, total: 0 };
    byPerson[d.salesperson].deals++;
    byPerson[d.salesperson].front += p.frontEnd;
    byPerson[d.salesperson].back += p.backEnd;
    byPerson[d.salesperson].total += p.total;
  });
  const totalProfit = closed.reduce((s, d) => s + calcProfit(d).total, 0);
  const avgProfit = closed.length ? Math.round(totalProfit / closed.length) : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
      {/* MTD Summary */}
      <div style={{ background: "#10111a", border: "1px solid #1e2030", borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>MTD Profit Summary</div>
        {[
          { label: "Total Gross Profit", value: fmt$(totalProfit), color: "#22c55e" },
          { label: "Avg Per Deal", value: fmt$(avgProfit), color: "#818cf8" },
          { label: "Total Front-End", value: fmt$(closed.reduce((s, d) => s + calcProfit(d).frontEnd, 0)), color: "#818cf8" },
          { label: "Total Back-End", value: fmt$(closed.reduce((s, d) => s + calcProfit(d).backEnd, 0)), color: "#22c55e" },
          { label: "Deals Counted", value: closed.length, color: "#e2e4ed" },
        ].map(r => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1a1c28" }}>
            <span style={{ fontSize: 13, color: "#9096b0" }}>{r.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* By Salesperson */}
      <div style={{ background: "#10111a", border: "1px solid #1e2030", borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Profit by Salesperson</div>
        {Object.entries(byPerson).sort((a, b) => b[1].total - a[1].total).map(([name, s]) => (
          <div key={name} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#c7cadd", fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#22c55e" }}>{fmt$(s.total)}</span>
            </div>
            <div style={{ display: "flex", gap: 8, fontSize: 11, color: "#6b7280", marginBottom: 5 }}>
              <span>{s.deals} deals</span>
              <span>·</span>
              <span style={{ color: "#818cf8" }}>F: {fmt$(s.front)}</span>
              <span>·</span>
              <span style={{ color: "#22c55e" }}>B: {fmt$(s.back)}</span>
            </div>
            <div style={{ height: 4, borderRadius: 99, background: "#1e2030", overflow: "hidden" }}>
              <div style={{ height: "100%", width: pct(s.total, totalProfit), background: "linear-gradient(90deg, #6366f1, #22c55e)", borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DealershipTracker() {
  const [tab, setTab] = useState("Inventory");
  const [inventory] = useState(initialInventory);
  const [customers] = useState(initialCustomers);
  const [deals] = useState(initialDeals);
  const [service] = useState(initialService);
  const [search, setSearch] = useState("");
  const [profitDeal, setProfitDeal] = useState(null);
  const [modal, setModal] = useState(null);

  const totalInventoryValue = inventory.filter(v => v.status !== "Sold").reduce((s, v) => s + v.price, 0);
  const closedProfit = deals.filter(d => d.status === "Closed").reduce((s, d) => s + calcProfit(d).total, 0);
  const openServiceJobs = service.filter(s => s.status !== "Completed").length;
  const hotLeads = customers.filter(c => c.status === "Hot Lead").length;

  const stats = [
    { label: "Inventory Value", value: fmt$(totalInventoryValue), sub: `${inventory.filter(v => v.status === "Available").length} units available`, color: "#6366f1" },
    { label: "Gross Profit (MTD)", value: fmt$(closedProfit), sub: `${deals.filter(d => d.status === "Closed").length} closed deals`, color: "#22c55e" },
    { label: "Hot Leads", value: hotLeads, sub: `${customers.length} total customers`, color: "#ef4444" },
    { label: "Open ROs", value: openServiceJobs, sub: `${service.filter(s => s.status === "Completed").length} completed today`, color: "#f59e0b" },
  ];

  const s = search.toLowerCase();

  return (
    <div style={{ minHeight: "100vh", background: "#0d0e14", color: "#e2e4ed", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ borderBottom: "1px solid #1e2030", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#10111a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏎️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>RMT Motorsports LLC</div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>Dealership Management</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Sunday, June 7, 2026</div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {stats.map(st => (
            <div key={st.label} style={{ background: "#16172299", border: "1px solid #1e2030", borderRadius: 14, padding: "18px 20px", borderTop: `3px solid ${st.color}` }}>
              <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{st.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: st.color, letterSpacing: "-0.02em" }}>{st.value}</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{st.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#13141e", borderRadius: 12, padding: 4, width: "fit-content" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => { setTab(t); setSearch(""); }}
              style={{ padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                background: tab === t ? "#6366f1" : "transparent", color: tab === t ? "#fff" : "#6b7280" }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 18 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab.toLowerCase()}...`}
            style={{ background: "#13141e", border: "1px solid #1e2030", borderRadius: 10, padding: "9px 16px", color: "#e2e4ed", fontSize: 13, width: 280, outline: "none" }} />
        </div>

        {tab === "Inventory" && (
          <Table cols={["Year/Make/Model", "VIN", "Color", "Miles", "Cost", "Price", "Margin", "Lot", "Status"]}
            rows={inventory.filter(v => `${v.year} ${v.make} ${v.model} ${v.vin} ${v.status}`.toLowerCase().includes(s))}
            renderRow={v => [
              <b style={{ color: "#c7cadd" }}>{v.year} {v.make} {v.model} <span style={{ color: "#6b7280", fontWeight: 400 }}>{v.trim}</span></b>,
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>{v.vin}</span>,
              v.color, fmtN(v.miles), fmt$(v.cost), fmt$(v.price),
              <span style={{ color: "#22c55e" }}>{fmt$(v.price - v.cost)}</span>,
              <span style={{ background: "#1e2030", borderRadius: 6, padding: "2px 8px", fontSize: 11 }}>{v.lot}</span>,
              <Badge label={v.status} />
            ]}
            addLabel="+ Add Vehicle" onAdd={() => setModal({ type: "addVehicle" })} />
        )}

        {tab === "Sales & Deals" && (
          <>
            <ProfitSummary deals={deals} />
            <Table
              cols={["Customer", "Vehicle", "Sale Price", "Finance", "Salesperson", "Date", "Front-End / Back-End", "Total Profit", "Margin", "Status", ""]}
              rows={deals.filter(d => `${d.customer} ${d.vehicle} ${d.status}`.toLowerCase().includes(s))}
              renderRow={d => {
                const p = calcProfit(d);
                const hasProfit = d.status !== "Working";
                return [
                  <b style={{ color: "#c7cadd" }}>{d.customer}</b>,
                  d.vehicle, fmt$(d.salePrice), d.finance, d.salesperson,
                  d.saleDate || "—",
                  hasProfit ? <ProfitBar front={p.frontEnd} back={p.backEnd} /> : <span style={{ color: "#6b7280", fontSize: 12 }}>Pending</span>,
                  hasProfit ? <span style={{ color: p.total >= 0 ? "#22c55e" : "#ef4444", fontWeight: 700 }}>{fmt$(p.total)}</span> : "—",
                  hasProfit ? <span style={{ color: "#6b7280" }}>{pct(p.total, d.salePrice)}</span> : "—",
                  <Badge label={d.status} />,
                  <button onClick={() => setProfitDeal(d)}
                    style={{ background: "#1e2030", border: "none", borderRadius: 7, padding: "4px 12px", color: "#818cf8", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    Details
                  </button>
                ];
              }}
              addLabel="+ New Deal" onAdd={() => setModal({ type: "addDeal" })} />
          </>
        )}

        {tab === "Customers" && (
          <Table cols={["Name", "Phone", "Email", "City", "Interest", "Source", "Last Contact", "Status"]}
            rows={customers.filter(c => `${c.name} ${c.email} ${c.status} ${c.interest}`.toLowerCase().includes(s))}
            renderRow={c => [
              <b style={{ color: "#c7cadd" }}>{c.name}</b>,
              c.phone, c.email, c.city, c.interest, c.source, c.lastContact, <Badge label={c.status} />
            ]}
            addLabel="+ Add Customer" onAdd={() => setModal({ type: "addCustomer" })} />
        )}

        {tab === "Service" && (
          <Table cols={["Customer", "Vehicle", "Advisor", "Type", "Date In", "ETA", "Mileage", "Estimate", "Total", "Status"]}
            rows={service.filter(s2 => `${s2.customer} ${s2.vehicle} ${s2.type} ${s2.status}`.toLowerCase().includes(s))}
            renderRow={ro => [
              <b style={{ color: "#c7cadd" }}>{ro.customer}</b>,
              ro.vehicle, ro.advisor, ro.type, ro.dateIn, ro.eta, fmtN(ro.mileage), fmt$(ro.estimate),
              ro.total ? <span style={{ color: "#22c55e" }}>{fmt$(ro.total)}</span> : <span style={{ color: "#6b7280" }}>Pending</span>,
              <Badge label={ro.status} />
            ]}
            addLabel="+ New RO" onAdd={() => setModal({ type: "addRO" })} />
        )}
      </div>

      {profitDeal && <ProfitModal deal={profitDeal} onClose={() => setProfitDeal(null)} />}

      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "#00000088", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#16172a", border: "1px solid #2a2c40", borderRadius: 16, padding: "36px 40px", minWidth: 340, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚧</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Form Coming Soon</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>Full add/edit forms can be built for each section.</div>
            <button onClick={() => setModal(null)} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 9, padding: "10px 28px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Table({ cols, rows, renderRow, addLabel, onAdd }) {
  return (
    <div style={{ background: "#10111a", border: "1px solid #1e2030", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #1e2030" }}>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{rows.length} record{rows.length !== 1 ? "s" : ""}</span>
        <button onClick={onAdd} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{addLabel}</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#13141e" }}>
              {cols.map(c => <th key={c} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={cols.length} style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>No records found</td></tr>}
            {rows.map((row, i) => (
              <tr key={row.id ?? i} style={{ borderTop: "1px solid #1a1c28", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#16172a"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {renderRow(row).map((cell, ci) => (
                  <td key={ci} style={{ padding: "11px 16px", color: "#b0b3c6", verticalAlign: "middle", whiteSpace: "nowrap" }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
