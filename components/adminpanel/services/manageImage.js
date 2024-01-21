import SupabaseFileService from "@/components/Services/SupabaseFileService"
import { STORAGE_URL } from "@/config"

export const manageServiceImages = async (
    newContent,
    content,
    mainImage,
    oldImage,
    alts
) => {
    try {
        const imagesToDelete = content
            ?.filter((oldImage) => {
                return !newContent.some(
                    (newImage) =>
                        newImage?.image?.name === oldImage?.image?.name
                )
            })
            .map((image) => image?.image?.name)

        console.log("DELETED ====== ", imagesToDelete)
        const newImagesNames = []

        let uploadedContent =
            (await Promise.all(
                newContent?.map(async (item) => {
                    if ("text" in item) return item

                    if (!item?.image?.url) {
                        const { path } = await SupabaseFileService.uploadFile(
                            item.image,
                            "images",
                            item.image.name,
                            "serviceImages"
                        )
                        newImagesNames.push(item.image.name)

                        return {
                            ...item,
                            image: {
                                name: item.image.name,
                                url: `${STORAGE_URL}/${path}`,
                                alt: item?.image?.alt,
                                alt_ru: item?.image?.alt_ru,
                            },
                        }
                    } else {
                        return {
                            ...item,
                            image: {
                                ...item.image,
                                alt: item?.image?.alt,
                                alt_ru: item?.image?.alt_ru,
                            },
                        }
                    }
                })
            )) || []

        console.log("UPLOADED ====== ", uploadedContent)

        await Promise.all(
            imagesToDelete.map(async (item) => {
                await SupabaseFileService.removeFile(
                    "images",
                    `serviceImages/${item}`
                )
            })
        )

        let newMainImage

        if (!mainImage?.url && !!mainImage) {
            if (!mainImage) return
            const { path } = await SupabaseFileService.uploadFile(
                mainImage,
                "images",
                mainImage.name,
                "serviceImages"
            )
            newMainImage = {
                name: mainImage.name,
                url: `${STORAGE_URL}/${path}`,
                alt: alts?.alt,
                alt_ru: alts?.alt_ru,
            }
            if (oldImage?.name) {
                await SupabaseFileService.removeFile(
                    "images",
                    `serviceImages/${oldImage.name}`
                )
            }
        } else {
            newMainImage = {
                ...mainImage,
                alt: alts?.alt,
                alt_ru: alts?.alt_ru,
            }
        }

        return [uploadedContent, newMainImage, newImagesNames]
    } catch (e) {
        throw e
    }
}
