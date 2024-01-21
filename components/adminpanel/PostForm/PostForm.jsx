import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import Button from "@mui/material/Button"
import Input from "@/components/UI/Input/Input"
import { useFieldArray, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { apiRequest } from "@/utils/apiRequest"
import { useRouter } from "next/navigation"
import ContentBlock from "@/components/adminpanel/ContentBlock/ContentBlock"
import Cropper from "@/components/Cropper/Cropper"
import { managePostImages } from "@/components/adminpanel/PostForm/manageImage"

const PostForm = ({ post }) => {
    const isUpdate = !!post

    const router = useRouter()

    const postValues = {
        title: post?.title,
        title_ru: post?.title_ru,
        description: post?.description,
        description_ru: post?.description_ru,
        content: post?.content,
        image: post?.image,
        alt: post?.image?.alt,
        alt_ru: post?.image?.alt_ru,
    }

    const initialValues = {
        title: "",
        title_ru: "",
        content: { items: [] },
        image: null,
        alt: "",
        alt_ru: "",
        description: "",
        description_ru: "",
    }

    const defaultValues = isUpdate ? postValues : initialValues

    const methods = useForm({
        mode: "onBlur",
        defaultValues: defaultValues,
    })
    console.log("VALUES ========", methods.watch())

    const {
        fields: blocks,
        append,
        remove,
    } = useFieldArray({
        name: "content.items",
        control: methods.control,
    })

    const handleDelete = async () => {
        const request = async () => {
            try {
                await managePostImages(
                    [],
                    post?.content?.items || [],
                    undefined,
                    post?.image
                )
                // const imagesToDelete = methods
                //     .watch("content.items")
                //     ?.map((block) => block?.image?.name);
                // await Promise.all(
                //     [...imagesToDelete, methods.watch("image")?.name].map(
                //         async (item) => {
                //             await SupabaseFileService.removeFile(
                //                 "images",
                //                 `blogImages/${item}`
                //             );
                //         }
                //     )
                // );
                await apiRequest(
                    `/api/post?id=${post?.id}`,
                    undefined,
                    "DELETE"
                )
            } catch (e) {
                throw e
            }
        }
        try {
            await toast.promise(request(), {
                loading: "Видалення статті...",
                success: () => {
                    router.push("/blog")
                    return "Стаття видалена"
                },
                error: "Помилка видалення статті",
            })
        } catch (e) {
            console.error(e)
        }
    }

    const submitHandler = async (data) => {
        try {
            if (!data?.image) return toast.error("Завантажте фото")

            const request = async () => {
                try {
                    const [contentWithImages, mainImage] =
                        await managePostImages(
                            data?.content?.items || [],
                            post?.content?.items || [],
                            data?.image,
                            post?.image,
                            {
                                alt: data.alt,
                                alt_ru: data.alt_ru,
                            }
                        )

                    const formData = {
                        ...data,
                        id: post?.id,
                        content: { items: contentWithImages },
                        image: mainImage,
                    }

                    return apiRequest(
                        "/api/post",
                        formData,
                        isUpdate ? "PUT" : "POST"
                    )
                } catch (e) {
                    throw e
                }
            }

            await toast.promise(request(), {
                loading: isUpdate
                    ? "Оновлення статті..."
                    : "Створення статті...",
                success: () => {
                    router.push("/blog")
                    return isUpdate ? "Стаття оновлена" : "Стаття створена"
                },
                error: isUpdate
                    ? "Помилка оновлення статті"
                    : "Помилка створнення статті",
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <TitlePage
                    title={isUpdate ? "Редагування статті" : "Створення статті"}
                />
                <Button
                    onClick={methods.handleSubmit(submitHandler)}
                    variant={"contained"}
                >
                    Зберегти
                </Button>
            </div>
            <div className={"flex flex-col gap-11 mt-4"}>
                <div className={"grid grid-cols-2 gap-20"}>
                    <Input
                        label={"Заголовок"}
                        name={"title"}
                        control={methods.control}
                        error={!!methods.formState.errors?.title?.message}
                    />
                    <Input
                        label={"Заголовок RU"}
                        name={"title_ru"}
                        control={methods.control}
                        error={!!methods.formState.errors?.title_ru?.message}
                    />
                </div>

                <div className={"grid grid-cols-1 gap-20 2xl:grid-cols-2 "}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={"text-xl mb-4"}>Фото</div>
                        <Cropper
                            width={800}
                            height={500}
                            file={
                                methods.watch("image")?.url === post?.image?.url
                                    ? null
                                    : methods.watch("image")
                            }
                            setFile={(image) =>
                                methods.setValue(`image`, image)
                            }
                            placeholder={post?.image?.url || undefined}
                            aspect={8 / 5}
                        />
                        <Input
                            className={"w-1/2"}
                            name={"alt"}
                            control={methods.control}
                            error={methods.formState.errors?.["alt"]?.message}
                            label={"Alt"}
                        />
                        <Input
                            className={"w-1/2"}
                            name={"alt_ru"}
                            control={methods.control}
                            error={
                                methods.formState.errors?.["alt_ru"]?.message
                            }
                            label={"Alt RU"}
                        />
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <div className={"text-xl mb-4"}>Опис</div>
                        <Input
                            label={"Опис"}
                            name={"description"}
                            multiline={true}
                            rows={15}
                            control={methods.control}
                            error={
                                !!methods.formState.errors?.description?.message
                            }
                        />

                        <div className={"text-xl mb-4"}>Опис RU</div>
                        <Input
                            label={"Опис RU"}
                            name={"description_ru"}
                            multiline={true}
                            rows={15}
                            control={methods.control}
                            error={
                                !!methods.formState.errors?.description_ru
                                    ?.message
                            }
                        />
                    </div>
                </div>

                <h2 className={"text-3xl"}>Блоки статті:</h2>
                {blocks?.map((block, index) => (
                    <ContentBlock
                        key={index}
                        number={index + 1}
                        isUpdate={isUpdate}
                        remove={() => remove(index)}
                        setValue={methods.setValue}
                        name={`content.items.${index}`}
                        watch={methods.watch}
                        control={methods.control}
                    />
                ))}
                <div className={"flex w-full gap-12 justify-center"}>
                    <Button onClick={() => append({ image: null })}>
                        Додати фото
                    </Button>
                    <Button onClick={() => append({ text: "", text_ru: "" })}>
                        Додати текст
                    </Button>
                </div>

                <div className={"flex justify-between items-center"}>
                    <Button
                        variant={"contained"}
                        onClick={methods.handleSubmit(submitHandler)}
                    >
                        Зберегти
                    </Button>
                    {isUpdate && (
                        <Button
                            color={"error"}
                            variant={"contained"}
                            onClick={handleDelete}
                        >
                            Видалити
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostForm
