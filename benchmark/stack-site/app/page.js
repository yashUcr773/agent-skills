import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <img
        className="hero"
        src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=4000&q=100"
        alt="A shelf of houseplants"
      />
      <h1>Fernway Care Club</h1>
      <p>Keep notes on your plants, set reminders, and swap care tips with other members.</p>
      <p>
        <Link href="/login">Join the club</Link>
      </p>
    </div>
  );
}
