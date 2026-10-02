# /hi → Google Sheet setup (about 5 minutes)

The optional "send me your links" form on `manan-arora.com/hi` posts to `/api/hello`, which forwards it
to a Google Apps Script attached to a Sheet. The script logs each contact, emails them your links from
your Gmail, and emails you a notification. "Save my contact" works without any of this.

1. **Create the Sheet.** sheets.new → name it `Hellos from manan-arora.com`.
2. **Add the script.** Extensions → Apps Script → replace the editor contents with `Code.gs` → Save.
3. **Set two Script Properties.** Project Settings (gear) → Script Properties → add:
   - `SECRET` — a long random string (generate one with `openssl rand -hex 24`)
   - `MY_EMAIL` — where notifications go, e.g. your Gmail
4. **Approve permissions.** Select the `setup` function → Run → approve (it needs Sheets and "send email as you").
5. **Deploy.** Deploy → New deployment → type **Web app** → Execute as **Me**, Who has access **Anyone** → Deploy → copy the Web app URL.
6. **Tell the site.** In Vercel → project → Settings → Environment Variables (Production), add:
   - `HELLO_WEBHOOK_URL` — the Web app URL from step 5
   - `HELLO_WEBHOOK_SECRET` — the same string as `SECRET`
   Then redeploy (Deployments → ⋯ → Redeploy).
7. **Test.** Open `manan-arora.com/hi?e=Test` on your phone, submit your own email. You should get both emails and see a row.

**QR code:** point it at `https://www.manan-arora.com/hi?e=<Event%20Name>` so the page greets people by event.

**Changing the script later:** Deploy → Manage deployments → edit → Version: New version. The URL stays the same.

**Limits built in:** 1 email per address per 10 minutes, 80 emails per day (Gmail's personal cap is ~100),
spreadsheet-formula injection blocked, and the shared secret means only your site can write to the Sheet.
