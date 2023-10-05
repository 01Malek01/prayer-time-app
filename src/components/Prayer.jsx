import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Prayer({name,time,image}) {
  return (
    <>
    <Card sx={{width: 260 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="fajr prayer"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {name}
        </Typography>
        <Typography variant="h4" color="text.secondary">
{time}        
</Typography>
      </CardContent>
     
    </Card>
    </>
  );
}