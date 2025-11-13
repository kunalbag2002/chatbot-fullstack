import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("https://chatbot-fullstack-j8hr.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("✅ Login success:", data);

                // Store user info in localStorage (since no JWT)
                localStorage.setItem("user", JSON.stringify(data));

                // Redirect to /chat
                navigate("/chat");
            } else {
                const err = await res.json();
                setError(err.detail || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#1E1E1E] text-white">
            <form
                onSubmit={handleLogin}
                className="bg-[#2A2A2A] p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded-lg bg-[#1E1E1E] text-white outline-none border border-zinc-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-3 rounded-lg bg-[#1E1E1E] text-white outline-none border border-zinc-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-[#EF4444] py-3 rounded-lg text-white font-semibold hover:bg-[#dc2626] transition"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4 text-gray-400">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#19C37D] hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
