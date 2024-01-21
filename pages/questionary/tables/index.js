import Layout from "@/components/adminpanel/Layout";
import checkAuth from "@/utils/checkAuth";
import Tables from "@/components/adminpanel/Questionnaire/Tables/Tables";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
    let tables = await prisma.questionaryOptionTable.findMany({
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

const TablesPage = ({ tables }) => {
    checkAuth();

    return (
        <Layout>
            <Tables tables={tables} />
        </Layout>
    );
};

export default TablesPage;
