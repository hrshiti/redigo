const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';

const urls = [
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard',
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard/data',
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard/today_earnings',
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard/overall_earnings',
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard/cancel_chart',
  'https://taxi-a276.onrender.com/api/v1/admin/zones',
  'https://taxi-a276.onrender.com/api/v1/admin/sos'
];

async function test() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      console.log(`\n\n--- ${url} ---`);
      console.log(JSON.stringify(data).substring(0, 500)); // Print up to 500 chars to avoid truncation
    } catch (e) {
      console.error(url, e.message);
    }
  }
}
test();
