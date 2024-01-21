import Layout from "@/components/adminpanel/Layout";
import checkAuth from "@/utils/checkAuth";
import prisma from "@/prisma/client";
import RoomFurniture from "@/components/adminpanel/Questionnaire/RoomsList/RoomFurniture/RoomFurniture";

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    let room = await prisma.room.findUnique({
        where: {
            id,
        },
        include: {
            RoomFurniture: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });

    if (!room) return { notFound: true };

    return {
        props: {
            room: room,
        },
    };
};

const Rooms = ({ room }) => {
    checkAuth();

    return (
        <Layout>
            <RoomFurniture room={room} />
        </Layout>
    );
};

export default Rooms;
