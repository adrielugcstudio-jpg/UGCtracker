export default function StatsBar({ campaigns }) {
  const totalEarned = campaigns.filter(c => c.status === 'paid').reduce((s, c) => s + c.amountPaid, 0);
  const totalOwed = campaigns.filter(c => c.status !== 'paid').reduce((s, c) => s + c.agreedRate, 0);
  const totalAgreed = campaigns.reduce((s, c) => s + c.agreedRate, 0);
  const paidCount = campaigns.filter(c => c.status === 'paid').length;
  const pendingCount = campaigns.filter(c => c.status === 'pending').length;
  const overdueCount = campaigns.filter(c => c.status === 'overdue').length;

  const fmt = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="stats-bar">
      <div className="stat-card green">
        <span className="stat-label">Total Earned</span>
        <span className="stat-value">{fmt(totalEarned)}</span>
        <span className="stat-sub">{paidCount} paid campaigns</span>
      </div>
      <div className="stat-card yellow">
        <span className="stat-label">Outstanding</span>
        <span className="stat-value">{fmt(totalOwed)}</span>
        <span className="stat-sub">{pendingCount} pending</span>
      </div>
      <div className="stat-card blue">
        <span className="stat-label">Total Contracted</span>
        <span className="stat-value">{fmt(totalAgreed)}</span>
        <span className="stat-sub">{campaigns.length} campaigns total</span>
      </div>
      <div className="stat-card red">
        <span className="stat-label">Overdue</span>
        <span className="stat-value">{overdueCount}</span>
        <span className="stat-sub">need follow-up</span>
      </div>
    </div>
  );
}
