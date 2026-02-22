const NOTIFY_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${ANON_KEY}`,
  'Apikey': ANON_KEY,
};

export async function sendTelegram(text: string): Promise<void> {
  try {
    await fetch(`${NOTIFY_BASE}/send`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text }),
    });
  } catch {
    // silent
  }
}

export async function getVisitorIP(): Promise<string> {
  try {
    const res = await fetch(`${NOTIFY_BASE}/ip`, { headers });
    const data = await res.json();
    return data.ip ?? 'unknown';
  } catch {
    return 'unknown';
  }
}
