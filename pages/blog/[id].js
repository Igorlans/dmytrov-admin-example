import Layout from "@/components/adminpanel/Layout";
import prisma from "@/prisma/client";
import checkAuth from "@/utils/checkAuth";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import PostForm from "@/components/adminpanel/PostForm/PostForm";

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });

    return {
        props: {
            post: post,
        },
    };
}

const BlogEditPage = ({ post }) => {
    checkAuth();

    return (
        <Layout>
            <TitlePage title={`Змінити пост "${post.title}"`} />
            <PostForm post={post} />
        </Layout>
    );
};

export default BlogEditPage;
