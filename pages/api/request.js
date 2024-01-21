import prisma from "@/prisma/client"

const addRequest = async (req, res) => {
  const body = JSON.parse(req.body)

  try {
    await prisma.Request.create({
      data: {
        tariff: body.tariff,
        square: body.square,
        type: body.type,
        address: body.address,
        street: body.street,
        homeNumber: body.homeNumber,
        date: body.date,
        comment: body.comment,
      }
    })
    res.status(200).json({msg: 'good', data: body})
  } catch (error) {
    throw error
  }
}

const getAllRequest = async (req, res) => {
  const body = req.query;
  try {
    const data = await prisma.Request.findMany({});
    res.status(200).json({msg: 'good', data: data})
  } catch (error) {
    throw error
  }
}

const updateRequest = async (req, res) => {
  const body = JSON.parse(req.body);
  try {
    const data = await prisma.Request.update({
      where: {
        id: body.id
      },
      data: {
        tariff: body.tariff,
        square: body.square,
        type: body.type,
        address: body.address,
        street: body.street,
        homeNumber: body.homeNumber,
        date: body.date,
        comment: body.comment,
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
      case 'POST':
        await addRequest(req, res)
        break;
      case 'GET':
        await getAllRequest(req, res)
        break;
      case 'PUT':
        await updateRequest(req, res)
        break;  
      default:
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'error',error: error})
  }
  
}