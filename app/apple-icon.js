import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Same logo as app/icon.js, rendered larger for iOS "Add to Home Screen".
export default function AppleIcon() {
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff8ed',
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          width={size.width}
          height={size.height}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
