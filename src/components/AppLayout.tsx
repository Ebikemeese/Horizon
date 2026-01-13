import Layout from "@/pages/root/Layout";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import WebsiteFooter from './WebsiteFooter'

const AppLayout = () => {
    return (
        <div>
            <Helmet>
                <html lang="en"/>
            </Helmet>

            <Layout>
                <Outlet />
            </Layout>

            <WebsiteFooter />
        </div>
        
    )
}

export default AppLayout