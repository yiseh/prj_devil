// Supabase REST. 아래 두 값만 본인 프로젝트 값으로 교체
const SB_URL = 'https://vepyomymbmqpxgszeuci.supabase.co';   // 끝에 / 나 /rest/v1 붙이지 말 것
const SB_KEY = 'sb_publishable_8jqYq0Gjnl0CXWYoNer7OA_SE66zJUQ';               // anon(eyJ...) 또는 publishable(sb_publishable_...) 키

const H = { apikey: SB_KEY, 'Content-Type': 'application/json' };
if (!SB_KEY.startsWith('sb_')) H.Authorization = 'Bearer ' + SB_KEY;   // 새 sb_ 키는 JWT가 아니므로 Bearer 금지

// 저장: 성공 시 true, 실패 시 오류 메시지 문자열
const saveValue = v =>
  fetch(`${SB_URL}/rest/v1/entries`, { method: 'POST', headers: H, body: JSON.stringify({ value: String(v) }) })
    .then(async r => r.ok ? true : `${r.status} ${await r.text()}`)
    .catch(e => '네트워크 오류: ' + e.message);

// 조회: 성공 시 배열, 실패 시 { error: 메시지 }
const getEntries = (limit = 100) =>
  fetch(`${SB_URL}/rest/v1/entries?select=*&order=created_at.desc&limit=${limit}`, { headers: H })
    .then(async r => r.ok ? r.json() : { error: `${r.status} ${await r.text()}` })
    .catch(e => ({ error: '네트워크 오류: ' + e.message }));
