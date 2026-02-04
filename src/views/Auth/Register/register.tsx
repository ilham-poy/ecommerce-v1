import Link from "next/link";
// import styles from './Register.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
const RegisterViews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push } = useRouter();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('')
        setIsLoading(true)
        const data = {
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value,
        };
        const results = await fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (results.status === 200) {
            event.target.reset();
            setIsLoading(false);
            push('/auth/login')
        } else {
            setIsLoading(false);
            setError(results.status === 400 ? 'Email Already Exists' : '')

        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans p-8">
                <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg text-center border-t-4 border-pink-400">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">Register</h1>
                    {error && (<p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mb-6 text-sm"> {error} </p>)}
                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2" >
                                Email
                            </label>
                            <input type="email" id="email" name="email" className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" />
                        </div>
                        <div className="text-left mb-6">
                            <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2" >
                                Full Name
                            </label>
                            <input type="text" id="fullname" name="fullname" className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" />
                        </div>
                        <div className="text-left mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2" >
                                Password
                            </label>
                            <input type="password" id="password" name="password" className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" />
                        </div>
                        <button type="submit" disabled={isLoading}
                            className={`w-full p-3 text-lg font-semibold text-white rounded-lg transition-colors ${isLoading ? "bg-pink-200 cursor-not-allowed" : "bg-pink-400 hover:bg-pink-500"}`} >
                            {isLoading ? "Loading..." : "Register"}
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-500"> Have an Account? Sign In{" "}
                        <Link href="/auth/login" className="text-pink-400 font-bold hover:underline"> here </Link>
                    </p>
                </div>
            </div>

        </>
    );

};

export default RegisterViews;