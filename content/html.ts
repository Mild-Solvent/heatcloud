// Helpers for the authored HTML fragments inside the legal documents and the
// service intros. These strings are written by us in this repo, never from user
// input, and are rendered with dangerouslySetInnerHTML.

export const esc = (s: unknown): string => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export const slugify = (s: string): string => s.toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

type Head = string | { t: string; num?: boolean };

/** Renders a table with the same markup the styled `.prose` blocks expect. */
export const table = (head: Head[], rows: string[][]): string => `
  <div class="tbl">
    <table>
      <thead><tr>${head.map((h) => {
        const t = typeof h === 'object' ? h.t : h;
        const num = typeof h === 'object' && h.num;
        return `<th${num ? ' class="num"' : ''}>${t}</th>`;
      }).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c, i) => {
        const h = head[i];
        const num = typeof h === 'object' && h.num;
        return `<td${num ? ' class="num"' : ''}>${c}</td>`;
      }).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>`;
