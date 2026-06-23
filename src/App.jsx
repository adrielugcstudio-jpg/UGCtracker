import { useState, useEffect } from 'react';
import { loadCampaigns, saveCampaigns, createCampaign } from './store';
import CampaignForm from './components/CampaignForm';
import CampaignTable from './components/CampaignTable';
import StatsBar from './components/StatsBar';
import './App.css';

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCampaigns(loadCampaigns());
  }, []);

  function persist(updated) {
    setCampaigns(updated);
    saveCampaigns(updated);
  }

  function handleSubmit(data) {
    if (editing) {
      persist(campaigns.map(c => c.id === editing.id
        ? { ...editing, ...data, agreedRate: parseFloat(data.agreedRate) || 0, amountPaid: parseFloat(data.amountPaid) || 0 }
        : c));
      setEditing(null);
    } else {
      persist([createCampaign(data), ...campaigns]);
    }
    setShowForm(false);
  }

  function handleDelete(id) {
    if (confirm('Delete this campaign?')) persist(campaigns.filter(c => c.id !== id));
  }

  function handleEdit(campaign) {
    setEditing(campaign);
    setShowForm(true);
  }

  function handleMarkPaid(id) {
    persist(campaigns.map(c => c.id === id
      ? { ...c, status: 'paid', paidDate: c.paidDate || new Date().toISOString().slice(0, 10), amountPaid: c.amountPaid || c.agreedRate }
      : c));
  }

  const filtered = campaigns.filter(c => {
    const matchStatus = filter === 'all' || c.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !search || c.brand.toLowerCase().includes(q) || c.platform.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo-area">
            <span className="logo-icon">💰</span>
            <h1>UGC Earnings Tracker</h1>
          </div>
          <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
            + Add Campaign
          </button>
        </div>
      </header>

      <main className="main">
        <StatsBar campaigns={campaigns} />

        <div className="controls">
          <input
            className="search"
            placeholder="Search brand or platform..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="filter-tabs">
            {['all', 'pending', 'invoiced', 'paid', 'overdue'].map(s => (
              <button
                key={s}
                className={`tab ${filter === s ? 'active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <CampaignTable
          campaigns={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkPaid={handleMarkPaid}
        />
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) { setShowForm(false); setEditing(null); } }}>
          <CampaignForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}
    </div>
  );
}
