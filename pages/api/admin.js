import prisma from "@/prisma/client";

const getUser = async (req, res) => {
  const body = req.query;
  try {
    const data = await prisma.Admin.findMany({
      orderBy: {id: 'asc'},
      where: {id: {in: [1, 2, 3]}}
    });
    res.status(200).json({msg: 'good', data: data})
  } catch (error) {
    throw error;
  }
}

const updateUserPassword = async (req, res) => {
  const body = JSON.parse(req.body);
  try {
    const data = await prisma.Admin.update({
      where: {
        id: body.id
      },
      data: {
        password: body.password,
      }
    })
    res.status(200).json({msg: 'good', data: data})
  } catch (error) {
    throw error
  }
}

export default async function handler(req, res) {
  const requestMethod = req.method
  try {
    switch (requestMethod) {
      case 'GET':
        await getUser(req, res)
        break;
      case 'PUT':
        await updateUserPassword(req, res)
        break;  
      default:
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'error',error: error})
  } 
}