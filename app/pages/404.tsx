import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>404 - Page Not Found</title>
    </Head>
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-lg my-4">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <a className="text-blue-600">Go back to Homepage</a>
      </Link>
    </div>
  </>
);

export default Custom404;
