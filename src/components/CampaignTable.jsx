const STATUS_COLORS = {
  pending: 'status-pending',
  invoiced: 'status-invoiced',
  paid: 'status-paid',
  overdue: 'status-overdue',
};

const fmt = n => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CampaignTable({ campaigns, onEdit, onDelete, onMarkPaid }) {
  if (campaigns.length === 0) {
    return (
      <div className="empty-state">
        <p>No campaigns yet. Add your first campaign to start tracking!</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Platform</th>
            <th>Deliverable</th>
            <th>Agreed Rate</th>
            <th>Amount Paid</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Paid Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c.id}>
              <td className="brand-cell"><strong>{c.brand}</strong></td>
              <td>{c.platform}</td>
              <td>{c.deliverable || '—'}</td>
              <td className="money">{fmt(c.agreedRate)}</td>
              <td className="money">{c.amountPaid > 0 ? fmt(c.amountPaid) : '—'}</td>
              <td>
                <span className={`status-badge ${STATUS_COLORS[c.status] || ''}`}>
                  {c.status}
                </span>
              </td>
              <td>{c.dueDate || '—'}</td>
              <td>{c.paidDate || '—'}</td>
              <td className="actions-cell">
                {c.status !== 'paid' && (
                  <button className="btn-action btn-paid" onClick={() => onMarkPaid(c.id)} title="Mark as paid">
                    ✓ Paid
                  </button>
                )}
                <button className="btn-action btn-edit" onClick={() => onEdit(c)} title="Edit">
                  Edit
                </button>
                <button className="btn-action btn-delete" onClick={() => onDelete(c.id)} title="Delete">
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
