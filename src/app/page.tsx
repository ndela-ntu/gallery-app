import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1>T-Shirt Gallery</h1>
      <Link href="/gallery">View Gallery</Link>
    </main>
  );
}
