import { permanentRedirect } from 'next/navigation';

// The blog page has become "Experiences" — keep old /blog links (Google,
// bookmarks, social posts) working by sending them to the new page.
export default function Page() {
  permanentRedirect('/experiences');
}
