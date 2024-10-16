import Head from "next/head";

const NoteHead = ({ title, description, url, image }) => {
  return (
    <Head>
      {/* Basic SEO Tags */}
      <meta
        name="google-site-verification"
        content="I8T0zL0kRPOYLnRgjkdFnyF_ClfJQDpWbTTr_f8i9yU"
      />
      <title>{title ? title : "Something Sharing the Notes"}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : "A simple app for sharing notes, HTML content, or text with friends. Generate a shareable link, and allow others to easily view and copy the content."
        }
      />
      <meta
        name="keywords"
        content="share notes, share html, copy content, share link, notes app"
      />
      <meta name="author" content="Something Sharing the Notes" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta
        property="og:title"
        content={title ? title : "Share Notes with Friends"}
      />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "Generate and share a link to your notes or HTML content with friends. They can easily view and copy the shared content."
        }
      />
      <meta
        property="og:url"
        content={url ? url : "https://your-app-url.com"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={image ? image : "https://your-app-url.com/default-image.png"}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={title ? title : "Something Sharing the Notes"}
      />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : "Share notes, text, or HTML content with a simple link. Friends can copy the content easily."
        }
      />
      <meta
        name="twitter:image"
        content={image ? image : "https://your-app-url.com/default-image.png"}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={url ? url : "https://your-app-url.com"} />
    </Head>
  );
};

export default NoteHead;
