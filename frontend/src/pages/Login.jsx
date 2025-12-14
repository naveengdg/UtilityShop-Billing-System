import { useState } from "react";

function Login(){
    
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    

    if(!email || !password){
        setError("All fields are required");
        return;
    }

    if(!email.includes("@")){
        setError("Please enter a valid email");
        return;
    }

    setError("");
    console.log("Login data: ",{email , password});
};
 
    return(
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-96 p-6 border rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold">Login</h2>

                {
                    error && (
                        <p className="text-red-500 text-sm mb-2">
                            {error}
                        </p>
                    )
                }

                <input 
                type="email" 
                placeholder="Email"
                className="w-full mt-4 p-2 border rounded"
                value = { email }
                onChange = { (e) => setEmail (e.target.value)}
                />


                <input 
                type="password"
                placeholder="Password"
                className="w-full mt-3 p-2 border rounded"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;