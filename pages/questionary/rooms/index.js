import Layout from "@/components/adminpanel/Layout";
import checkAuth from "@/utils/checkAuth";
import RoomsList from "@/components/adminpanel/Questionnaire/RoomsList/RoomsList";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
    let rooms = await prisma.room.findMany({
        orderBy: {
            order: "asc",
        },
    });

    return {
        props: {
            rooms: rooms || [],
        },
    };
};

const Rooms = ({ rooms }) => {
    checkAuth();

    return (
        <Layout>
            <RoomsList rooms={rooms} />
        </Layout>
    );
};

export default Rooms;
