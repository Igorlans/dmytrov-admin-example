import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import { Button } from "@mui/material"
import SeoTable from "@/components/adminpanel/Seo/SeoTable"
import checkAuth from "@/utils/checkAuth"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import SeoTabs from "@/components/adminpanel/Seo/SeoTabs"

const Seo = ({ seo }) => {
    checkAuth()

    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState("")

    const filteredSeo = useMemo(() => {
        const regex = new RegExp(eval(searchQuery))
        return seo.filter((item) => regex.test(item?.page))
    }, [searchQuery])

    return (
        <div>
            <div className="flex justify-between items-center">
                <TitlePage title="SEO" />
                <Button onClick={() => router.push("/seo/create")}>
                    Створити
                </Button>
            </div>
            <SeoTabs value={searchQuery} setValue={setSearchQuery} />
            <SeoTable seo={filteredSeo} />
        </div>
    )
}

export default Seo
