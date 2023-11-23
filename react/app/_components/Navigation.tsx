import { getSession } from "@auth0/nextjs-auth0";

export default async function Navigation() {
    const session = await getSession();
    return (
      <nav>
        <ul className="nav-list">
          {session?.user ? (
            <li className="nav-item">
              <a className="nav-item-trigger" href="/api/auth/logout">
                Logout
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <a className="nav-item-trigger" href="/api/auth/login">
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
}