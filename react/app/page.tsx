import "./globals.scss";
import Profile from "./_components/Profile";

export default async function Home() {
  return (
    <>
      <h1>Profile (protected by Middleware)</h1>
      <Profile />
    </>
  );
}
