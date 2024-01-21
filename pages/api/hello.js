// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const getTarrifs = (req, res) => {
  try {
    const data = req.query;

    return res.status(200).json({message: 'good', data: [
      {
        title: "Базовий",
        subtitle: "Технічний проєкт",
        price: "300",
        text: "Для тих, хто має розуміння в ремонті або ж маєте перевірену будівельну бригаду. Підійде для технічно нескладних об'єктів. Містить базовий набір креслення і схем для вашого ремонту.",
        textMob: `Тариф "Базовий" стане в пригоді якщо ви самостійно розумієтеся в ремонті або ж маєте перевірену будівельну бригаду. `,
        link: "../services/basic"
      },
      {
        title: "Стандарт",
        subtitle: "Технічний проєкт",
        price: "500",
        text: "Якщо ви не маєте бажання розбиратись в будівельних тонкощах, але хочете самостійно вибирати колір шпалер чи модель ліжка — тоді цей тариф це ваш варіант. Підійде для будь-яких об'єктів оскільки має в собі всі необхідні креслення та схеми для правильного ремонту.",
        textMob: `Тариф "Стандарт" - якщо ви не маєте бажання розбиратись в будівельних тонкощах. `,
        link: "../services/standart"
      },
      {
        title: "Преміум",
        subtitle: "Технічний + Дизайн проєкт",
        price: "1 000",
        text: "Не маєте бажання і часу ходити по будівельних магазинах та вибирати оздоблювальні матеріали? Залиште це нам. Окрім всіх необхідних технічних креслень ми надамо реалістичну 3D-візуалізацію зі специфікацією всіх матеріалів та предметів інтер'єру.",
        textMob: `Тариф "Преміум" - якщо Ви не маєте бажання і часу займатись ремонтом та ходити по будівельних магазинах. `,
        link: "../services/premium"
      },
    ]})
  } catch (error) {
    throw error
  }
}


export default async function handler(req, res) {
  const method = req.method;

  try {
    switch(method) {
      case 'GET':
        await getTarrifs(req, res);
        break;
      default:
        break;  
    }
  } catch (error) {
    
  }
}



// const getTarifs = (req, res) => {
//   try {
//     const data = req.query


//     return res.status(200).json({message: 'good', responce: [
//       {
//         name: "tafif 1",
//         price: 1400,
//       },
//       {
//         name: "tafif 2",
//         price: 1400,
//       },
//       {
//         name: "tafif 3",
//         price: 1400,
//       }
//     ]})
//   } catch (error) {
//     throw error
//   }
// }


// const postMyName = (req, res) => {
//   try {
//     const data = JSON.parse(req.body)


//     return res.status(200).json({message: 'good', responce: "hello - "+data.name})
//   } catch (error) {
//     throw error 
//   }
// }

// export default async function handler(req, res) {
//   const method = req.method
  
//   try {
//     switch (method) {
//       case 'GET':
//         await getTarifs(req, res)
//         break;
      
//       case 'POST':
//         await postMyName(req, res)
//         break
//       default:
//         break;
//     }
//   } catch (error) {
//     res.status(500).json({ error: error })
//   }  
// }
