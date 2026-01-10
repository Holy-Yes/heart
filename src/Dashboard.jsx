import { Slider, Typography, Card, CardContent, Box, Chip, Button } from '@mui/material'
import { useStore } from './store.js'

export default function Dashboard() {
  const store = useStore()
  
  return (
    <div className="dashboard" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
      <Card sx={{ 
        maxWidth: 400, 
        backdropFilter: 'blur(20px)', 
        background: 'rgba(0,10,20,0.95)', 
        border: '1px solid rgba(255,64,129,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        <CardContent>
          {/* HEADER - Matches your screenshot */}
          <Typography variant="h4" sx={{ 
            color: '#ff4081', 
            mb: 3, 
            textAlign: 'center', 
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(255,64,129,0.5)'
          }}>
            💓 DIGITAL HEART PARAMETERS
          </Typography>
          
          {/* 8 INPUT SLIDERS - EACH NEW LINE + LIVE ML */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Age</Typography>
            <Slider 
              value={store.age} 
              onChange={(_, v) => store.setAge(v)}
              onChangeCommitted={store.predictRisk}  // LIVE UPDATE!
              min={20} max={80} step={1}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>BP</Typography>
            <Slider 
              value={store.bp} 
              onChange={(_, v) => store.setBP(v)}
              onChangeCommitted={store.predictRisk}
              min={90} max={200}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Cholesterol</Typography>
            <Slider 
              value={store.cholesterol} 
              onChange={(_, v) => store.setCholesterol(v)}
              onChangeCommitted={store.predictRisk}
              min={100} max={500}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Max HR</Typography>
            <Slider 
              value={store.max_hr} 
              onChange={(_, v) => store.setMaxHR(v)}
              onChangeCommitted={store.predictRisk}
              min={60} max={200}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>ST Depression</Typography>
            <Slider 
              value={store.st_depression} 
              onChange={(_, v) => store.setSTDepression(v)}
              onChangeCommitted={store.predictRisk}
              min={0} max={5} step={0.1}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Vessels</Typography>
            <Slider 
              value={store.vessels} 
              onChange={(_, v) => store.setVessels(v)}
              onChangeCommitted={store.predictRisk}
              min={0} max={4} step={1}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Thallium</Typography>
            <Slider 
              value={store.thallium} 
              onChange={(_, v) => store.setThallium(v)}
              onChangeCommitted={store.predictRisk}
              min={1} max={7}
              sx={{ color: '#ff4081' }}
            />
            
            <Typography sx={{ color: 'white', mb: 1, fontWeight: 500 }}>Exercise Angina</Typography>
            <Slider 
              value={store.exercise_angina} 
              onChange={(_, v) => store.setExerciseAngina(v)}
              onChangeCommitted={store.predictRisk}
              min={0} max={1} step={1}
              sx={{ color: '#ff4081' }}
            />
          </Box>

          {/* PREDICT BUTTON */}
          <Button 
            onClick={store.predictRisk} 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ 
              my: 2, 
              background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)', 
              boxShadow: '0 6px 20px rgba(211,47,47,0.4)',
              fontSize: '1.1em', 
              fontWeight: 'bold',
              '&:hover': { background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)' }
            }}
          >
            🎯 PREDICT HEART RISK → Animate 3D Heart
          </Button>

          {/* 6 ML OUTPUTS - Vertical chips */}
          <Typography variant="h6" sx={{ color: '#ff4081', mb: 2, fontWeight: 'bold' }}>
            ML Predictions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Chip 
              label={`Artery Narrowing: ${store.artery_narrowing.toFixed(3)}`} 
              color="error" 
              variant="filled"
              sx={{ fontSize: '0.85em' }}
            />
            <Chip 
              label={`Wall Thickness: ${store.wall_thickness.toFixed(3)}`} 
              color="warning" 
              variant="filled"
              sx={{ fontSize: '0.85em' }}
            />
            <Chip 
              label={`Ischemia Level: ${store.ischemia_level.toFixed(3)}`} 
              color="warning" 
              variant="filled"
              sx={{ fontSize: '0.85em' }}
            />
            <Chip 
              label={`Stress Response: ${store.stress_response?.toFixed(3) || '0.000'}`} 
              variant="outlined"
              sx={{ color: 'white', borderColor: '#ff4081', fontSize: '0.85em' }}
            />
            <Chip 
              label={`Elasticity: ${store.elasticity.toFixed(3)}`} 
              variant="outlined"
              sx={{ color: 'white', borderColor: '#ff4081', fontSize: '0.85em' }}
            />
            <Chip 
              label={`Overall Risk: ${(store.overall_risk * 100).toFixed(1)}%`} 
              color="error" 
              variant="filled"
              sx={{ fontSize: '1em', fontWeight: 'bold' }}
            />
          </Box>

          {/* HEART STATE */}
          <Box sx={{ mt: 3, p: 2, background: 'rgba(255,64,129,0.1)', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#ff4081', mb: 1 }}>Live Heart State</Typography>
            <Typography sx={{ color: 'white' }}>
              Rate: <strong style={{ color: '#ff4081' }}>{Math.round(store.heart_rate)}</strong> bpm | 
              Dilation: <strong style={{ color: '#ff4081' }}>{(store.dilation * 100).toFixed(0)}%</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
