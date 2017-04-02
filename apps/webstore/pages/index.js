import Link from 'next/link';

export default () => (
  <main className="container">
    <h1>Welcome</h1>
    <p>
      Click <Link href="/products"><a>here</a></Link> for product listing.
    </p>
  </main>
);
