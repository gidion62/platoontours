import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Real favicon, generated from the actual Platoon Tours logo (public/images/logo.png)
// — replaces the earlier placeholder "P" monogram. Reads the logo file directly
// (rather than fetching it over HTTP) and embeds it as a base64 data URI, which
// next/og's ImageResponse can render straight into the generated icon.
export default function Icon() {
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${logoBase64}`}
        width={size.width}
        height={size.height}
        style={{ objectFit: 'contain' }}
      />
    ),
    { ...size }
  );
}
