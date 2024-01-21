import Compose from "@/components/adminpanel/compose/compose"
import Layout from "@/components/adminpanel/Layout"
import TariffItem from "@/components/adminpanel/tariffs/TariffItem/TariffItem"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import checkAuth from "@/utils/checkAuth"
import { useState } from "react"
import prisma from "@/prisma/client"

export async function getServerSideProps(context) {
    let tariffs = await prisma.tariffes.findMany({
        orderBy: {
            order: "asc",
        },
    })
    let tariffComparison = await prisma.tariffComparison.findUnique({
        where: {
            id: "clhkcfohv000007xdwjd9wdew",
        },
    })
    tariffComparison = JSON.parse(JSON.stringify(tariffComparison))
    tariffs = JSON.parse(JSON.stringify(tariffs))
    return {
        props: {
            tariffs: tariffs,
            table: tariffComparison?.table?.rows || null,
        },
    }
}

const Tariffs = ({ tariffs: initialTariffs, table }) => {
    checkAuth()

    const [tariffs, setTariffs] = useState(initialTariffs)

    return (
        <Layout>
            <TitlePage title="Тарифи" />

            <section className="rates">
                <div className="container">
                    <div className="rates__wrapper">
                        <div className="rates__items">
                            {tariffs.map((tariff, idx) => (
                                <TariffItem
                                    tariffs={tariffs}
                                    setTariffs={setTariffs}
                                    tariff={tariff}
                                    key={idx}
                                />
                            ))}
                        </div>
                        <Compose data={table} tariffs={tariffs} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Tariffs
