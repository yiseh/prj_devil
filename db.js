// Supabase REST (SDK 없이 fetch만 사용). 아래 두 값만 본인 프로젝트 값으로 교체
const SB_URL = 'https://vepyomymbmqpxgszeuci.supabase.co/rest/v1/';
const SB_KEY = 'sb_publishable_8jqYq0Gjnl0CXWYoNer7OA_SE66zJUQ';
const H = { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' };

// 저장: 성공 시 true
const saveValue = v =>
  fetch(`${SB_URL}/rest/v1/entries`, { method: 'POST', headers: H, body: JSON.stringify({ value: String(v) }) })
    .then(r => r.ok).catch(() => false);

// 호출: 최신순 배열 [{id, value, created_at}]
const getEntries = (limit = 100) =>
  fetch(`${SB_URL}/rest/v1/entries?select=*&order=created_at.desc&limit=${limit}`, { headers: H })
    .then(r => r.json()).catch(() => []);
