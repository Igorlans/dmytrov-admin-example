import Layout from "@/components/adminpanel/Layout";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import prisma from "@/prisma/client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import checkAuth from "@/utils/checkAuth";
import dayjs from "dayjs";
import Image from "next/image";

export async function getServerSideProps() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return {
        props: {
            posts: posts,
        },
    };
}

const BlogPage = ({ posts }) => {
    checkAuth();

    const router = useRouter();
    return (
        <Layout>
            <div className="flex justify-between">
                <TitlePage title={"Блог"} />
                <Button onClick={() => router.push("/blog/create")}>
                    Створити
                </Button>
            </div>
            <div className={"space-y-8"}>
                {posts?.map((post) => (
                    <div
                        key={post.id}
                        className={
                            "card shadow-md bg-gray-100 p-8 cursor-pointer"
                        }
                        onClick={() => router.push(`/blog/${post.id}`)}
                    >
                        <div>
                            {dayjs(Number(post.createdAt)).format("DD.MM.YYYY")}
                        </div>
                        <div className={"flex gap-6 flex-wrap"}>
                            <div>
                                <div className={"relative w-[400px] h-[250px]"}>
                                    <Image
                                        src={post?.image?.url}
                                        fill
                                        alt={`post ${post.id} image`}
                                    />
                                </div>
                            </div>
                            <div>
                                <div
                                    className={
                                        "font-bold text-xl leading-none mb-4"
                                    }
                                >
                                    {post.title}
                                </div>
                                <div>{post.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/*<div>{JSON.stringify(posts)}</div>*/}
        </Layout>
    );
};

export default BlogPage;
