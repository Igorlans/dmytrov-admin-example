import Layout from "@/components/adminpanel/Layout";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import TableComponent from "@/components/adminpanel/users/table";
import checkAuth from "@/utils/checkAuth";
import prisma from "@/prisma/client";

export async function getServerSideProps(context) {
    let users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            Request: true,
            ServicesRequest: {
                include: {
                    Services: true,
                },
            },
        },
    });
    users = JSON.parse(JSON.stringify(users));
    return {
        props: {
            data: users,
        },
    };
}

const SearchPage = ({ data }) => {
    console.log(data);
    checkAuth();
    // const data = [
    //   { id: 1, name: 'John', surname: 'Doe', status: true },
    //   { id: 2, name: 'Jane', surname: 'Doe',status: false  },
    //   { id: 3, name: 'Bob', surname: 'Smith', status: true  },
    //   { id: 4, name: 'Alice', surname: 'Johnson', status: true  },
    //   { id: 5, name: 'Michael', surname: 'Smith', status: true },
    //   { id: 6, name: 'Laura', surname: 'Williams', status: false  },
    //   { id: 7, name: 'David', surname: 'Jones', status: true  },
    //   { id: 8, name: 'Julia', surname: 'Brown', status: true },
    //   { id: 9, name: 'Daniel', surname: 'Davis', status: true  },
    //   { id: 10, name: 'Elizabeth', surname: 'Miller', status: false  },
    // ];

    return (
        <Layout>
            <TitlePage title="Користувачі" />
            <TableComponent data={data} />
        </Layout>
    );
};

export default SearchPage;
