import { useState } from "react";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const res = await fetch("https://chatbot-fullstack-j8hr.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Account created successfully!");
                window.location.href = "/login";
            } else {
                alert(data.detail || "Registration failed!");
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert("⚠️ Could not connect to the server.");
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[#1E1E1E] text-white">
            <div className="w-[380px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full mt-1 p-2 rounded-md bg-[#2A2A2A] border border-zinc-600 outline-none"
                        />
                    </div>

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
                        className="w-full bg-[#19C37D] text-black font-medium py-2 rounded-md hover:bg-[#16a34a]"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#19C37D] hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
}
