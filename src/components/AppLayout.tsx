import Layout from "@/pages/root/Layout";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Helmet>
                <html lang="en"/>
            </Helmet>

            <Layout>
                <Outlet />
            </Layout>
        </div>
        
    )
}

export default AppLayout