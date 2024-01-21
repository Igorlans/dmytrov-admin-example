import Layout from "@/components/adminpanel/Layout";
import checkAuth from "@/utils/checkAuth";
import RoomTables from "@/components/adminpanel/Questionnaire/RoomTables/RoomTables";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
    let tables = await prisma.questionaryRoomOptionTable.findMany({
        orderBy: {
            order: "asc",
        },
        include: {
            Tariffes: {
                select: {
                    id: true,
                },
            },
        },
    });

    tables = tables?.map((table) => {
        const newTable = {
            ...table,
            tariffes: table?.Tariffes?.map((tariff) => tariff?.id),
        };

        return newTable;
    });

    return {
        props: {
            tables: tables || [],
        },
    };
};

const RoomTablesPage = ({ tables }) => {
    checkAuth();

    return (
        <Layout>
            <RoomTables tables={tables} />
        </Layout>
    );
};

export default RoomTablesPage;
