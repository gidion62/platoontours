import PageHeader from '@/components/shared/PageHeader';
import blogPosts from '@/lib/blogPosts';
import CardFolderGrid from './CardFolderGrid';
import styles from './BlogPage.module.css';

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  const FeaturedTag = featured.url ? 'a' : 'div';
  const featuredProps = featured.url ? { href: featured.url, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div className="page" data-page="blog">
      <PageHeader title="The Platoon Journal" />

      <section>
        <div className="section-inner">
          <FeaturedTag className={`${styles.blogFeatured} reveal in`} {...featuredProps}>
            <div
              className={styles.bfMedia}
              style={{
                background: featured.slug
                  ? `url(/images/home/blog-${featured.slug}.jpg) center/cover no-repeat, linear-gradient(150deg, ${featured.grad[0]}, ${featured.grad[1]})`
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
    </div>
  );
}
