import { readFile } from 'node:fs/promises';
import path from 'node:path';

// "Save my contact": a vCard the phone opens straight into its add-contact sheet.
// Built at deploy time so the avatar can be read from /public.
export const dynamic = 'force-static';

const CONTACT = {
  first: 'Manan',
  last: 'Arora',
  title: 'AI Engineer & Researcher',
  org: 'University of Michigan',
  email: 'aromanan@umich.edu',
  site: 'https://www.manan-arora.com',
  linkedin: 'https://www.linkedin.com/in/mananarora2611/',
  github: 'https://github.com/Mack-26',
  note: 'AI engineer and researcher, University of Michigan. Open to AI engineering roles from 2027.',
};

// vCard lines longer than 75 octets must be folded (RFC 6350 §3.2).
function fold(line) {
  const out = [];
  for (let i = 0; i < line.length; i += 74) out.push((i ? ' ' : '') + line.slice(i, i + 74));
  return out.join('\r\n');
}

export async function GET() {
  let photo = '';
  try {
    const jpg = await readFile(path.join(process.cwd(), 'public/assets/avatar.jpg'));
    photo = `PHOTO;ENCODING=b;TYPE=JPEG:${jpg.toString('base64')}`;
  } catch {
    // Contact card still works without a photo.
  }

  const c = CONTACT;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${c.last};${c.first};;;`,
    `FN:${c.first} ${c.last}`,
    `TITLE:${c.title}`,
    `ORG:${c.org}`,
    `EMAIL;TYPE=INTERNET:${c.email}`,
    `URL:${c.site}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${c.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${c.github}`,
    `NOTE:${c.note}`,
    photo,
    'END:VCARD',
  ]
    .filter(Boolean)
    .map(fold);

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Manan-Arora.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
