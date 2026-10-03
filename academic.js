'use strict';
// Display-only academic profile. This does not retrieve official student records.
function academicProfile(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei', year: 'numeric', month: 'numeric'
  }).formatToParts(now);
  const year = Number(parts.find(part => part.type === 'year').value);
  const month = Number(parts.find(part => part.type === 'month').value);
  const admissionYear = year - (month < 9 ? 1 : 0);
  const rocYear = admissionYear - 1911;
  const semester = month >= 3 && month <= 8 ? 2 : 1;
  return { rocYear, semester };
}
function updateAcademicProfile() {
  const { rocYear, semester } = academicProfile();
  const fields = {
    'semester-count': String(semester),
    'admission': `入學年月:${rocYear}/09`,
    'approval-date': `核准日期:${rocYear}/09/01`,
    'approval-number': `入學核准文號:${rocYear}-067`,
    'last-registration': `最後註冊:${rocYear}/${semester}`,
    'course-query': `${rocYear}學年度第${semester}學期選課資料查詢(含學雜費繳費&退費資訊)`
  };
  document.querySelectorAll('[data-academic]').forEach(element => {
    element.textContent = fields[element.dataset.academic];
  });
  const registration = document.querySelector('#registration');
  if (registration) {
    const key = `${rocYear}/${semester}`;
    if (registration.dataset.academicKey !== key) {
      registration.replaceChildren();
      for (let term = 1; term <= semester; term++) {
        const option = document.createElement('option');
        option.value = `${rocYear}/${term}`;
        option.textContent = `${String(rocYear).padStart(4, '0')} ${term} 註冊`;
        option.selected = term === semester;
        registration.appendChild(option);
      }
      registration.dataset.academicKey = key;
    }
  }
}
updateAcademicProfile();
window.addEventListener('pageshow', updateAcademicProfile);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateAcademicProfile();
});
setInterval(updateAcademicProfile, 60000);
