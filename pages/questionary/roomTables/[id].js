import TableOptions from "@/components/adminpanel/Questionnaire/TableOptions/TableOptions";
import prisma from "@/prisma/client";
import Layout from "@/components/adminpanel/Layout";

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    let table = await prisma.questionaryRoomOptionTable.findUnique({
        where: {
            id,
        },
        include: {
            options: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });

    if (!table) return { notFound: true };

    return {
        props: {
            table: table,
        },
    };
};

const OptionsPage = ({ table }) => {
    return (
        <Layout>
            <TableOptions table={table} isRoomTable={true} />
        </Layout>
    );
};

export default OptionsPage;
