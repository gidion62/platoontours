// Renders one schema.org JSON-LD <script> block. A plain server component —
// no visual output, so it's safe to drop into any page or layout.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
