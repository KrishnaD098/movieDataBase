import Link from 'next/link';

const Custom404 = () => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center">
    <h1 className="text-4xl font-bold">Page Not Found</h1>
    <p className="text-lg my-4">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
    <Link href="/" className="text-blue-600">
      Go back to Homepage
    </Link>
  </div>
);

export default Custom404;
