import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="text-lg">
        In order to check courses please click at the button given below
      </p>
      <Link
        href="/courses"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-4"
      >
        Check Courses
      </Link>
    </main>
  );
}
