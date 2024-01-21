import { Button, TableCell, TableRow } from "@mui/material"
import { useRouter } from "next/navigation"
import truncate from "@/utils/truncate"

const SeoTableItem = ({ seoItem }) => {
    const router = useRouter()

    return (
        <>
            <TableRow
                style={{
                    background: seoItem.edited
                        ? "unset"
                        : "rgba(248,127,67,0.54)",
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{seoItem?.page}</TableCell>
                <TableCell>{seoItem?.title}</TableCell>
                <TableCell>
                    {seoItem?.description && truncate(seoItem?.description, 50)}
                </TableCell>
                <TableCell>
                    {seoItem?.keywords && truncate(seoItem?.keywords, 50)}
                </TableCell>
                {/*<TableCell align="center">*/}
                {/*    <Button onClick={() => router.push(`/seo.js/${seoItem.id}`)}>*/}
                {/*        Наповнення*/}
                {/*    </Button>*/}
                {/*</TableCell>*/}
                <TableCell align="right">
                    <Button onClick={() => router.push(`/seo/${seoItem.id}`)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    )
}

export default SeoTableItem
