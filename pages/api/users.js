import prisma from "@/prisma/client";

const getAllUsers = async (req, res) => {
  const body = req.query;
  try {
    const data = await prisma.User.findMany();
    res.status(200).json({msg: 'good', data: data})
  } catch (error) {
    throw error;
  }
}

const addTariff = async (req, res) => {
  const body = JSON.parse(req.body)
  try {
    await prisma.Tariffes.create({
      data: {
        id: body.id,
        title: body.title,
        subTitle: body.subTitle,
        price: body.price,
        text: body.text,
        textMob: body.textMob,
        activated: body.activated,
      }
    })
    res.status(200).json({msg: 'good', data: body})
  } catch (error) {
    throw error
  }
}

const updateTariff = async (req, res) => {
  const body = JSON.parse(req.body);
  try {
    const data = await prisma.Tariffes.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        subTitle: body.subTitle,
        price: body.price,
        text: body.text,
        activated: body.activated,
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
        await addTariff(req, res)
        break;
      case 'GET':
        await getAllUsers(req, res)
        break;
      case 'PUT':
        await updateTariff(req, res)
        break;  
      default:
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'error',error: error})
  }
  
}