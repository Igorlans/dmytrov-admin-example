"use client"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';

import * as moment from 'moment'

export default function OrderItem({data, update}) {
  const momentObj = moment(data.createAt)
  const newDatetimeString = `${ momentObj.format('YYYY-MM-DD')} ${momentObj.format('HH:mm:ss')}`

  return (
    <Card sx={{ minWidth: 275 }} style={{marginTop: 15}}>
      <CardContent>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Замовлено: {newDatetimeString}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Номер телефону: {data.phone}
            </Typography>
          </div>

          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Статус - {data.status == 'new_order' ? 'Нове замовлення' : data.status == 'approve' ? 'Підтвердежний' : 'Не перевірений'}
          </Typography>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Typography variant="h6" component="div">
                    {data.name} {data.surname}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Тип доставки: {data.shipping_type}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Тип оплати: {data.payment_type}
                </Typography>


                {data.shipping_type != 'address' ? 
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Адреса доставки: {data.address}
                    </Typography>

                    :

                    <>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Місто: {data.city}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Номер відділеня: {data.department}
                        </Typography>
                    </>
                }
                
                <Typography variant="body2">
                Тип замовлення:  {data.payment_type == 'manager_buy' ? 'Через менеджера' : 'Повна оплата'}
                </Typography>
                <Typography variant="h6" component="div">
                Ціна: {data.price}грн
                </Typography>
            </div>
            <div>
                <Typography variant="h6" component="div">
                    {data.name} {data.surname}
                </Typography>
            </div>
        </div>

        

        

      </CardContent>
      <CardActions>
        <Button variant="contained"  onClick={() => update(data.id, "discard")}>
          Переглянути замовлення
        </Button>
        <Button variant="contained" color="success" onClick={() => update(data.id, "approve")}>
          Підтвердити
        </Button>
      </CardActions>
    </Card>
  )
}