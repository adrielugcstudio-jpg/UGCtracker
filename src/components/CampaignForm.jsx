import { useState } from 'react';

const PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'YouTube Shorts', 'Pinterest', 'Facebook', 'Twitter/X', 'Snapchat', 'Other'];
const STATUSES = ['pending', 'invoiced', 'paid', 'overdue'];

export default function CampaignForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    brand: initial?.brand || '',
    platform: initial?.platform || '',
    deliverable: initial?.deliverable || '',
    agreedRate: initial?.agreedRate ?? '',
    amountPaid: initial?.amountPaid ?? '',
    status: initial?.status || 'pending',
    dueDate: initial?.dueDate || '',
    paidDate: initial?.paidDate || '',
    notes: initial?.notes || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.brand.trim()) return alert('Brand name is required');
    if (!form.agreedRate || isNaN(form.agreedRate)) return alert('Agreed rate must be a number');
    onSubmit(form);
  }

  return (
    <div className="modal">
      <h2>{initial ? 'Edit Campaign' : 'Add Campaign'}</h2>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-row">
          <label>
            Brand *
            <input value={form.brand} onChange={e => set('brand', e.target.value)} placeholder="e.g. Nike" required />
          </label>
          <label>
            Platform
            <select value={form.platform} onChange={e => set('platform', e.target.value)}>
              <option value="">Select platform</option>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Deliverable
            <input value={form.deliverable} onChange={e => set('deliverable', e.target.value)} placeholder="e.g. 1 video, 3 photos" />
          </label>
          <label>
            Status
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Agreed Rate ($) *
            <input type="number" min="0" step="0.01" value={form.agreedRate} onChange={e => set('agreedRate', e.target.value)} placeholder="0.00" required />
          </label>
          <label>
            Amount Paid ($)
            <input type="number" min="0" step="0.01" value={form.amountPaid} onChange={e => set('amountPaid', e.target.value)} placeholder="0.00" />
          </label>
        </div>

        <div className="form-row">
          <label>
            Due Date
            <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
          </label>
          <label>
            Paid Date
            <input type="date" value={form.paidDate} onChange={e => set('paidDate', e.target.value)} />
          </label>
        </div>

        <label className="full-width">
          Notes
          <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Contract terms, contact info, deliverable specs..." rows={3} />
        </label>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary">{initial ? 'Save Changes' : 'Add Campaign'}</button>
        </div>
      </form>
    </div>
  );
}
