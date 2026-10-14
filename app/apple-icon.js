import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Same logo as app/icon.js, rendered larger for iOS "Add to Home Screen".
// iOS has no transparency, so this version sits on the site's cream colour
// (already baked into public/images/icons/apple-icon-180.png).
export default function AppleIcon() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'icons', 'apple-icon-180.png');
  const iconBase64 = fs.readFileSync(iconPath).toString('base64');
  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${iconBase64}`}
        width={size.width}
        height={size.height}
      />
    ),
    { ...size }
  );
}
