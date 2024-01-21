import prisma from "@/prisma/client";

const getAllTariffPlan = async (req, res) => {

  try {
    const tariffes = await prisma.Tariffes.findMany({
      where: {
        id: {in: [1,2,3]}
      },
      include: { TariffPlan: true },
    });

    if (!tariffes) {
      return res.status(404).json({ msg: 'Tariffes not found' });
    }

    res.status(200).json({ msg: 'TariffPlan found', data: tariffes });
  } catch (error) {
    console.error(`Error getting tariff plan: ${error}`);
    res.status(500).json({ msg: 'Server error' });
  }
};

const addTariffPlan = async (req, res) => {
  const body = JSON.parse(req.body)
  try {
    await prisma.TariffPlans.create({
      // where: {
      //   id: body.id,
      // },
      data: {
          title: body.title,
          description: body.description,
          idTariffs: body.idTariffs
      }
    })
    res.status(200).json({msg: 'good', data: body})
  } catch (error) {
    throw error
  }
}

const updateTariffPlan = async (req, res) => {
  const body = JSON.parse(req.body);
  try {
    const data = await prisma.TariffPlans.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          description: body.description,
          image: body.image,
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
        await addTariffPlan(req, res)
        break;
      case 'GET':
        await getAllTariffPlan(req, res)
        break;
      case 'PUT':
        await updateTariffPlan(req, res)
        break;  
      case 'DELETE':
        await deleteTariffPlan(req, res)
        break;  
      default:
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'error',error: error})
  }
  
}