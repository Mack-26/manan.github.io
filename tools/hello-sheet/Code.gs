/**
 * manan-arora.com/hi → Google Sheet + emails.
 *
 * Paste into the Sheet's Extensions → Apps Script, set the two Script Properties
 * (SECRET, MY_EMAIL), then Deploy → Web app. Setup steps: README.md beside this file.
 *
 * Each "send me your links" submission:
 *   1. appends a row to the "Hellos" tab,
 *   2. emails the visitor your links (from your Gmail, replies come to you),
 *   3. emails you a notification with their email and note.
 */

const SHEET_NAME = 'Hellos';
const DAILY_CAP = 80; // Gmail allows ~100/day on a personal account; leave headroom.
const COOLDOWN_SECONDS = 600; // one email per address per 10 minutes

const LINKS = [
  ['manan-arora.com', 'https://www.manan-arora.com'],
  ['LinkedIn', 'https://www.linkedin.com/in/mananarora2611/'],
  ['GitHub', 'https://github.com/Mack-26'],
  ['Résumé (PDF)', 'https://www.manan-arora.com/assets/Manan_Arora_Resume.pdf'],
];
const TOUR_URL = 'https://www.manan-arora.com/#explore';

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad request' });
  }
  if (!data || !props.getProperty('SECRET') || data.secret !== props.getProperty('SECRET')) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  const email = String(data.email || '').trim().slice(0, 254);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json_({ ok: false, error: 'bad email' });
  const note = String(data.note || '').slice(0, 500);
  const event = String(data.event || '').slice(0, 80);
  const me = props.getProperty('MY_EMAIL');

  const cache = CacheService.getScriptCache();
  const key = 'sent:' + email.toLowerCase();
  const alreadySent = cache.get(key) !== null;

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet_().appendRow([new Date(), safe_(email), safe_(note), safe_(event), safe_(String(data.userAgent || '').slice(0, 200)), alreadySent ? 'repeat' : 'emailed']);
  } finally {
    lock.releaseLock();
  }

  // Already emailed recently or over today's cap: the row is logged, no new email.
  if (alreadySent || !underDailyCap_()) return json_({ ok: true });
  cache.put(key, '1', COOLDOWN_SECONDS);

  const where = event ? ' at ' + event : '';
  const quoted = note ? '\n\nYou mentioned: “' + note + '”. I’d like to keep that conversation going.' : '';
  const text =
    'Hi there,\n\nThanks for saying hi' + where + '.' + quoted + '\n\nHere’s where to find me:\n' +
    LINKS.map(function (l) { return '• ' + l[0] + ': ' + l[1]; }).join('\n') +
    '\n\nIf you have a minute, watch my RL agents learn to pass: ' + TOUR_URL +
    '\n\nI’ll follow up in the next day or two. You can also just reply here.\n\nManan\n\n' +
    'You got this because you typed your email on manan-arora.com/hi. Nothing else will be sent.';
  const html =
    '<div style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.6;color:#1C1C1C;max-width:560px">' +
    '<p>Hi there,</p><p>Thanks for saying hi' + esc_(where) + '.' +
    (note ? ' You mentioned <i>“' + esc_(note) + '”</i>. I’d like to keep that conversation going.' : '') + '</p>' +
    '<p>Here’s where to find me:</p><div style="background:#E0E7D7;border-radius:12px;padding:14px 18px">' +
    LINKS.map(function (l) { return '<div><a href="' + l[1] + '" style="color:#1C1C1C">' + esc_(l[0]) + '</a></div>'; }).join('') +
    '</div><p>If you have a minute, <a href="' + TOUR_URL + '" style="color:#1C1C1C">watch my RL agents learn to pass</a>. ' +
    'It’s the quickest way to see what I build.</p><p>I’ll follow up in the next day or two. You can also just reply here.</p>' +
    '<p>Manan<br><span style="color:#555">AI engineer · MS ECE, University of Michigan</span></p>' +
    '<p style="font-size:12px;color:#777">You got this because you typed your email on manan-arora.com/hi. Nothing else will be sent.</p></div>';

  MailApp.sendEmail({
    to: email,
    replyTo: me || undefined,
    name: 'Manan Arora',
    subject: 'Good to meet you' + where + ' (Manan)',
    body: text,
    htmlBody: html,
  });

  if (me) {
    MailApp.sendEmail({
      to: me,
      name: 'manan-arora.com/hi',
      subject: 'New hello' + where + ': ' + email,
      body:
        'Email: ' + email + '\nYou talked about: ' + (note || '(no note)') + '\nWhere: ' + (event || '(no event in link)') +
        '\nWhen: ' + new Date().toString() + '\n\nAll contacts: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });
  }

  return json_({ ok: true });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['When', 'Email', 'What we talked about', 'Event', 'Device', 'Status']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// A cell starting with = + - @ would be evaluated as a formula; force it to plain text.
function safe_(value) {
  const s = String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function underDailyCap_() {
  const props = PropertiesService.getScriptProperties();
  const today = Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
  const count = props.getProperty('day') === today ? Number(props.getProperty('count') || 0) : 0;
  if (count >= DAILY_CAP) return false;
  props.setProperties({ day: today, count: String(count + 1) });
  return true;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run once from the editor to approve permissions and create the tab.
function setup() {
  getSheet_();
}
