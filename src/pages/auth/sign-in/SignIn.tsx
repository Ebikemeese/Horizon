import AuthForm from "@/components/AuthForm"
import Layout from "../layout"

function SignIn() {
    return (
        <Layout>
            <section className="flex-center size-full max-sm:px-6">
                <AuthForm 
                    type="sign-in"
                />
            </section>
        </Layout>
            
    )
}

export default SignIn