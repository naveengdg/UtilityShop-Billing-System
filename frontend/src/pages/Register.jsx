import {useState} from "react";


function Register(){

    const [name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[error , setError] = useState("");


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!name || !email || !password || !confirmPassword){
            setError("All fields are required");
            return;
        }

        if(!email.includes("@")){
            setError("Please enter a valid email");
            return;
        }

        if(password != confirmPassword){
            setError("passwords do not match");
            return;
        }

        setError("");

        console.log("Register data: ",{
            name ,
            email ,
            password, 
            confirmPassword,
        });
    };

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-96 p-6 border rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold">Register</h2>

                {error && (
                    <p className="text-red-500 text-sm mb-2">
                        {error}
                    </p>
                )
                 }

                <input 
                type="text"
                placeholder="Name"
                className="w-full mt-4 p-2 border rounded"
                value={name}
                onChange = {(e)=> setName(e.target.value)}
                />


                <input type="email"
                placeholder="Email"
                className="w-full mt-4 p-2 border rounded"
                value={email}
                onChange = {(e)=> setEmail(e.target.value)}
                 />

                 <input type="password"
                 placeholder="Password"
                 className="w-full mt-4 p-2 border rounded"
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 />

                 <input type="password"
                 placeholder="confirm Password"
                 className="w-full mt-3 p-2 border rounded"
                 value={confirmPassword}
                 onChange={(e)=> setConfirmPassword(e.target.value)}/>

                 <button className="w-full mt-4 bg-green-600 text-white py-2 rounded">Register</button>

            </form>
        </div>
    );
}

export default Register;