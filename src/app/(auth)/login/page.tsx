import { LoginForm } from "@/features/auth/components/login-form"
import { requireUnAuth } from "@/lib/auth-utils";
import Image from "next/image";
import Link from "next/link";

const Login = async () => {
    // await requireUnAuth();
    return (
        <LoginForm />
    )
}

export default Login;