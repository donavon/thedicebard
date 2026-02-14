import { siteUrl } from "../data/site";

type BlogPostJsonLdPost = {
  author: string;
  imageUrl: string;
  lastModified?: string;
  publishedDate: string;
  slug: string;
  synopsis: string;
  title: string;
};

type BlogPostJsonLdProps = {
  post: BlogPostJsonLdPost;
};

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const {
    author,
    imageUrl,
    lastModified,
    publishedDate,
    slug,
    synopsis,
    title,
  } = post;
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const resolvedImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : new URL(imageUrl, siteUrl).toString();
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: synopsis,
    datePublished: publishedDate,
    dateModified: lastModified ?? publishedDate,
    author: {
      "@type": "Person",
      name: author,
    },
    image: [resolvedImageUrl],
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
    />
  );
}
