import { useState } from "react";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "../stores/useAuthStore";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, signInUser } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      signInUser: state.signInUser,
    })),
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signInUser({ email, password });

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="px-5 py-20">
      <div className="md:px-20 lg:px-80">
        <Link to="/" className="flex gap-2 btn btn-sm btn-ghost w-fit">
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>

      <form className="max-w-xl mx-auto mt-2" onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-5">
          <legend className="fieldset-legend">Sign in</legend>

          <label htmlFor="email" className="label">
            Email
          </label>

          <input
            id="email"
            type="email"
            className="input w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="label">
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="input w-full pr-12"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeClosed className="size-5" />
              )}
            </button>
          </div>

          <div className="mt-2">
            <p className="text-xs">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-3"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
