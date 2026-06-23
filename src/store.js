const STORAGE_KEY = 'ugc_campaigns';

export function loadCampaigns() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCampaigns(campaigns) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
}

export function createCampaign(data) {
  return {
    id: crypto.randomUUID(),
    brand: data.brand,
    platform: data.platform,
    deliverable: data.deliverable,
    agreedRate: parseFloat(data.agreedRate) || 0,
    amountPaid: parseFloat(data.amountPaid) || 0,
    status: data.status || 'pending',
    dueDate: data.dueDate || '',
    paidDate: data.paidDate || '',
    notes: data.notes || '',
    createdAt: new Date().toISOString(),
  };
}
