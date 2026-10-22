import blogPosts from '@/lib/blogPosts';
import CardFolderGrid from './CardFolderGrid';
import styles from './BlogPage.module.css';

// The original "Platoon Journal" blog content (same markup and styles as the
// old /blog page), shown as a section at the bottom of the Experiences page.
export default function JournalSection() {
  const [featured, ...rest] = blogPosts;
  const FeaturedTag = featured.url ? 'a' : 'div';
  const featuredProps = featured.url ? { href: featured.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <section id="journal" style={{ scrollMarginTop: 100 }}>
      <div className="section-inner">
        <h2 style={{ marginBottom: '2rem' }}>The Platoon Journal</h2>
        <FeaturedTag className={`${styles.blogFeatured} reveal in`} {...featuredProps}>
          <div
            className={styles.bfMedia}
            style={{
              background: featured.slug
                ? `url(/images/home/blog-${featured.slug}.jpg) center/cover no-repeat`
                : `linear-gradient(150deg, ${featured.grad[0]}, ${featured.grad[1]})`,
            }}
          />
          <div className={styles.bfText}>
            <span className={styles.bfTag}>{featured.tag}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
          </div>
        </FeaturedTag>

        <CardFolderGrid posts={rest} />
      </div>
    </section>
  );
}
