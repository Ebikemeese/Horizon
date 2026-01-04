import AuthForm from "@/components/AuthForm";
import Layout from "../Layout";

const SignUp = () => {
   
    return (
        <Layout>
            <section className="flex-center size-full max-sm:px-6">
                <AuthForm 
                    type="sign-up"
                />
            </section>
        </Layout>
    )
}

export default SignUp

