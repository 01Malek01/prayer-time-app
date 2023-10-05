
import './App.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MainContent from './components/MainContent';
import { Container } from '@mui/material';
function App() {
  return (
    <div  style={{
      width:'92vw',
      display:'flex',
      justifyContent:'center',
 
    }}>
      <Container maxWidth="xl">

    <MainContent />
      </Container>
    </div>
  )
}

export default App
