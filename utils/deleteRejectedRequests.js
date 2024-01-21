const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const main = async () => {
    await prisma.request.deleteMany({
        where: {
            status: "REJECTED",
        },
    })
}

main()
