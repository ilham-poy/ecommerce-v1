import Link from "next/link";
// import styles from './Login.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
const LoginViews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push, query } = useRouter();
    const callBackUrl: any = query.callBackUrl || '/';

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('')
        setIsLoading(true)

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callBackUrl
            })

            if (!res?.error) {
                setIsLoading(false);
                push(callBackUrl);
            } else {
                setIsLoading(false);
                setError(res.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            setError(error);

        }


    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans p-8">
                <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg text-center border-t-4 border-pink-400">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">Login</h1>
                    {error && (<p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mb-6 text-sm"> {error} </p>)}
                    <form onSubmit={handleSubmit}>
                        <div className="text-left mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2" > Email </label>
                            <input type="email" id="email" name="email" className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" /> </div>
                        <div className="text-left mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2" > Password </label>
                            <input type="password" id="password" name="password" className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400" />
                        </div>
                        <button type="submit" disabled={isLoading} className={`w-full p-3 text-lg font-semibold text-white rounded-lg transition-colors 
                            ${isLoading ? "bg-pink-200 cursor-not-allowed" : "bg-pink-400 hover:bg-pink-500"}`} > {isLoading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-500"> Don't have an Account? Sign Up{" "} <Link href="/auth/register" className="text-pink-500 font-bold hover:underline"> here </Link> </p>
                </div>
            </div>
        </>
    );

};

export default LoginViews;