import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await fetch("https://chatbot-fullstack-j8hr.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.error) {
                alert(data.error);
            } else {
                alert("✅ Login successful!");
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "/chat";
            }
        } catch (err) {
            alert("⚠️ Could not connect to the server.");
            console.error(err);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[#1E1E1E] text-white">
            <div className="w-[380px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h1 className="text-2xl font-semibold mb-6">Welcome Back</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-2 rounded-md bg-[#2A2A2A] border border-zinc-600 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-1 p-2 rounded-md bg-[#2A2A2A] border border-zinc-600 outline-none pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-sm text-white/60"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#19C37D] text-black font-medium py-2 rounded-md"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#19C37D] hover:underline">
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}
