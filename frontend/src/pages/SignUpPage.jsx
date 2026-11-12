import { useState } from "react";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { isLoading, signUpUser } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      signUpUser: state.signUpUser,
    })),
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signUpUser({ name, email, password });

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
          <legend className="fieldset-legend">Sign up</legend>

          <label htmlFor="name" className="label">
            Name
          </label>

          <input
            id="name"
            type="text"
            className="input w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-3"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
