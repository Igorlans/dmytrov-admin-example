"use client"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const LeadCard = ({id, name, phone, update}) => {

  return (
    <Card sx={{ minWidth: 275 }} style={{marginTop: 15}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => update(id)}>Виконана</Button>
      </CardActions>
    </Card>
  )
}

export default LeadCard