import Layout from "@/components/adminpanel/Layout";
import checkAuth from "@/utils/checkAuth";
import PostForm from "@/components/adminpanel/PostForm/PostForm";

const BlogCreatePage = () => {
    checkAuth();

    return (
        <Layout>
            <PostForm />
        </Layout>
    );
};

export default BlogCreatePage;
