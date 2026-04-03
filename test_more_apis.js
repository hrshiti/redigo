const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';

const urls = [
  'https://taxi-a276.onrender.com/api/v1/admin/wallet/withdrawals',
  'https://taxi-a276.onrender.com/api/v1/admin/driver-subscriptions/plans/list',
  'https://taxi-a276.onrender.com/api/v1/admin/dashboard/stats'
];

async function test() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      console.log(`\n\n--- ${url} ---`);
      console.log(JSON.stringify(data).substring(0, 500));
    } catch (e) {
      console.error(url, e.message);
    }
  }
}
test();
