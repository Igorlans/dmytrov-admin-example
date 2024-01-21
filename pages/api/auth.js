import prisma from "@/prisma/client"

import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const signIn = async (req, res) => {
  const body = JSON.parse(req.body)

  try {
    const resData = await prisma.User.create({
      data: {
        surname:    body.surname,
        name:       body.name,
        father_name:     body.nameth,
        phone:       body.phone,
        email:       body.email,
        skype:       body.skype,
        password:    body.password,
      }
    })
    res.status(200).json({msg: 'good', data: resData})
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
        await runMiddleware(req, res, cors);
        await signIn(req, res)
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