import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

// 48 x 48 is a multiple of 48, which is what Google asks for so the logo shows
// in search results as well as in the browser tab.
export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

// Site favicon, made from the Platoon Tours logo. The picture is pre-sized in
// public/images/icons/icon-48.png (transparent background) so it stays sharp at
// this small size. It is read straight from disk and embedded as a base64
// data URI, which next/og's ImageResponse can render into the generated icon.
export default function Icon() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'icons', 'icon-48.png');
  const iconBase64 = fs.readFileSync(iconPath).toString('base64');
  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${iconBase64}`}
        width={size.width}
        height={size.height}
        style={{ objectFit: 'contain' }}
      />
    ),
    { ...size }
  );
}
