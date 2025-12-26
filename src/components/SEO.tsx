import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({
  title = 'Afferent Technologies Pvt Ltd | Internships, Projects & IT Solutions',
  description = 'Afferent Technologies offers internships in AI, Cybersecurity, Data Science, IoT, and more. We provide final year projects, web development, app development, and automation solutions.',
  keywords = 'internships, AI, cybersecurity, data science, IoT, web development, app development, automation, IT solutions, projects',
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href="https://afferenttechnologies.com" />
    </Helmet>
  );
};

export default SEO;
