import { useShallow } from "zustand/react/shallow";
import { Palette, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { daisyuiThemes } from "../daisyuiThemes";

import { useAuthStore } from "../stores/useAuthStore";
import { useThemeStore } from "../stores/useThemeStore";

const Navbar = () => {
  const { pathname } = useLocation();

  const { user, signOutUser, isLoading } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      signOutUser: state.signOutUser,
      isLoading: state.isLoading,
    })),
  );

  const { selectedTheme, setTheme } = useThemeStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
      setTheme: state.setTheme,
    })),
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-base-content/30 bg-base-200 px-3 py-2 shadow-md sm:px-6 sm:py-3 md:px-10">
      <Link to="/" className="shrink-0">
        <h1 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
          Cartify
        </h1>
      </Link>

      <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
        <div className="dropdown dropdown-start sm:dropdown-end">
          <button
            type="button"
            aria-label="Choose theme"
            className="btn btn-ghost btn-circle btn-sm shrink-0"
          >
            <Palette className="size-5 sm:size-6" />
          </button>

          <div
            tabIndex={-1}
            className="dropdown-content z-50 max-h-[30vh] md:max-h-[40vh] w-56 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-box bg-base-100 p-2 shadow-lg max-sm:fixed max-sm:left-auto max-sm:right-4 max-sm:top-16"
          >
            <div className="flex flex-col gap-1">
              {daisyuiThemes.map((theme) => (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => setTheme(theme.name)}
                  className={`w-full flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer ${
                    theme.name === selectedTheme
                      ? "bg-base-300"
                      : "hover:bg-base-200"
                  }`}
                >
                  <span className="capitalize whitespace-nowrap">
                    {theme.name}
                  </span>

                  <div className="flex items-center gap-1">
                    {theme.colors.map((color) => (
                      <div
                        key={color}
                        className="size-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {user ? (
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="btn btn-ghost btn-circle btn-sm"
            >
              <ShoppingCart
                className="size-5 sm:size-6"
                fill={pathname === "/cart" ? "white" : "none"}
              />
            </Link>
            <button
              className="btn btn-primary btn-sm h-8 whitespace-nowrap px-2 sm:px-3"
              onClick={() => signOutUser()}
              disabled={isLoading}
            >
              Sign out
            </button>
            <div className="avatar avatar-placeholder">
              <div className="w-8 rounded-full bg-primary text-white sm:w-9">
                <span className="text-sm">{user.name?.[0] ?? "?"}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link to="/sign-in" className="whitespace-nowrap hover:underline">
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="btn btn-primary btn-sm h-8 whitespace-nowrap px-2 sm:px-3"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
