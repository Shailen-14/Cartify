import { useShallow } from "zustand/react/shallow";
import { Palette, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../stores/useAuthStore";
import { useThemeStore } from "../stores/useThemeStore";

import { daisyuiThemes } from "../daisyuiThemes";

const Navbar = () => {
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
    <div className="flex justify-between items-center px-8 md:px-10 py-3 sticky top-0 z-50 border-b border-base-content/30 bg-base-200 shadow-md">
      <Link to={"/"}>
        <h1 className="font-bold tracking-tight text-xl md:text-2xl">
          Cartify
        </h1>
      </Link>

      <div className="flex gap-4 items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="cursor-pointer">
            <Palette className="size-6" />
          </div>

          <div
            tabIndex={-1}
            className="dropdown-content bg-base-100 rounded-box z-50 w-56 p-2 shadow-lg max-h-80 overflow-y-auto"
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

                  <div className="flex items-center gap-1 shrink-0">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
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
          <div className="flex gap-4 items-center">
            <Link to={"/cart"}>
              <ShoppingCart className="size-6" />
            </Link>
            <button
              className="btn btn-primary btn-md h-8 ml-3"
              onClick={() => signOutUser()}
              disabled={isLoading}
            >
              sign out
            </button>
            <div className="avatar avatar-placeholder">
              <div className="bg-primary text-white w-9 rounded-full">
                <span className="text-md">{user.name[0]}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to={"/sign-in"} className="hover:underline">
              sign in
            </Link>
            <Link to={"/sign-up"}>
              <button className="btn btn-primary btn-md h-8">sign up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
