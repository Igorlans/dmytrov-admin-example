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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function ReviewItem({data, update}) {
  const momentObj = moment(data.createAt)
  const newDatetimeString = `${ momentObj.format('YYYY-MM-DD')} ${momentObj.format('HH:mm:ss')}`

  return (
    <Card sx={{ minWidth: 275 }} style={{marginTop: 15}}>
      <CardContent>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {newDatetimeString} - {data.phone}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Статус - {data.approved == 'discard' ? 'Видалений' : data.approved == 'approve' ? 'Підтвердежний' : 'Не перевірений'}
          </Typography>
        </div>
        
        <div href="#">Перейти на товар</div>
        <Typography variant="h5" component="div">
          {data.name} {data.surname}
        </Typography>

        <Rating name="read-only" value={data.rating} readOnly />

        <Typography variant="body2">
          {data.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="error" onClick={() => update(data.id, "discard")}>
          Видалити
        </Button>
        <Button variant="contained" color="success" onClick={() => update(data.id, "approve")}>
          Підтвердити
        </Button>
      </CardActions>
    </Card>
  )
}