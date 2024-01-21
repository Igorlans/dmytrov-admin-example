import SupabaseFileService from "@/components/Services/SupabaseFileService"
import { STORAGE_URL } from "@/config"

export const manageImages = async (file, tariff, tariffPlans, alts) => {
    try {
        console.log("Tariff Plans", tariffPlans)
        console.log("Tariff Plans222", tariff?.TariffPlan?.items)
        let imagesToDelete =
            tariff?.TariffPlan?.items?.reduce((acc, item) => {
                const isPresent = tariffPlans.find(
                    (tplan) => tplan?.image?.name === item?.image?.name
                )
                if (!isPresent) {
                    console.log(acc)
                    if (acc?.length) {
                        return [...acc, item?.image?.name]
                    } else {
                        return [item?.image?.name]
                    }
                }
            }, []) || []

        let newTariffPlans =
            (await Promise.all(
                tariffPlans.map(async (item) => {
                    if (
                        item?.image?.url &&
                        typeof item?.image?.url === "object"
                    ) {
                        const { path } = await SupabaseFileService.uploadFile(
                            item.image.url,
                            "images",
                            item.image.url.name,
                            "tariffesImages"
                        )
                        return {
                            ...item,
                            image: {
                                name: item.image.name,
                                url: `${STORAGE_URL}/${path}`,
                            },
                        }
                    } else {
                        return item
                    }
                })
            )) || []

        let tariffImage
        if (file) {
            const { path } = await SupabaseFileService.uploadFile(
                file,
                "images",
                file.name,
                "tariffesImages"
            )
            tariffImage = {
                name: file.name,
                url: `${STORAGE_URL}/${path}`,
                alt: alts?.alt,
                alt_ru: alts?.alt_ru,
            }
            if (tariff?.image?.url) {
                imagesToDelete.push(tariff?.image?.name)
            }
        } else {
            tariffImage = {
                ...tariff.image,
                alt: alts?.alt,
                alt_ru: alts?.alt_ru,
            }
        }

        await Promise.all(
            imagesToDelete.map(async (item) => {
                await SupabaseFileService.removeFile(
                    "images",
                    `tariffesImages/${item}`
                )
            })
        )

        //UPLOAD

        console.log("OLD IMAGES", imagesToDelete)
        console.log("NEW IMAGES", newTariffPlans)

        return {
            tariffImage: tariffImage,
            newTariffPlans: newTariffPlans,
        }
    } catch (e) {
        throw e
    }
}
