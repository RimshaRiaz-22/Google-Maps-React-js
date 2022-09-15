import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Select,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import React, {  useState ,useEffect} from 'react'
import axios from 'axios'
import { 
  useJsApiLoader,
   GoogleMap,
    Marker,
     Autocomplete ,
     DirectionsRenderer
    } from '@react-google-maps/api'
const center = { lat: 56.002716, lng: -4.580081 }
function App() {
  useEffect(() => {
    setMarkers(
      {
        lat:56.002716,
        lng:-4.580081
      }
    )
    setMarkersB(
      {
        lat:56.00387929999999,
        lng:-4.576957
      }
    )

}, []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk",
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
 const [directionsResponse,setDirectionsResponse]= useState(null)
 const [distance,setDistance]= useState('')
 const [duration,setDuration]= useState('')
 const [markers, setMarkers] = React.useState([]);
 const [markersB, setMarkersB] = React.useState([]);
 const [APlace,setAPlace]= useState('')
 const [BPlace,setBPlace]= useState('')
 const [modeTravel,setmodeTravel]= useState('')


  if (!isLoaded) {
    return <SkeletonText />
  }
  async function calculateRoute(){
   
    console.log(APlace)
    // if(originRef.geometry.place_id=== '' || destinationRef.current.value=== ''){
    //   return 
    // }
      //eslint-disable-next-line no-undef
    const directionsService=new google.maps.DirectionsService()

    const results=await directionsService.route({
      origin:APlace,
      destination:BPlace,
      //eslint-disable-next-line no-undef
      travelMode:google.maps.TravelMode[modeTravel]
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }
  function clearRoute(){
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setAPlace('')
    setBPlace('')

  }
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      bgColor='blue.200'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box  */}
        <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true
          }}
          onLoad={(map) => { setMap(map) }}
        >
          {/* Displaying Markers or directions */}
          <Marker key="added"  position={{ lat: markers.lat, lng: markers.lng }} label="A Marker" draggable={true} onDragEnd={(e) => {
          
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
          .then((response) => {
              const allData = response.data.results[0];
              console.log(allData);
              setMarkers(
                {
                  lat: response.data.results[0].geometry.location.lat,
                  lng:response.data.results[0].geometry.location.lng
                }
              )
              setAPlace(response.data.results[0].formatted_address)
           
          })
          .catch(error => console.error(`Error:${error}`));
          // )
          // console.log(markers.lat)
          // console.log(markers.lng)
        }}/>
        <Marker key="addedB"  position={{ lat: markersB.lat, lng: markersB.lng }} label="B Marker" draggable={true} onDragEnd={(e) => {
          
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=true&key=AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk`)
          .then((response) => {
              const allData = response.data.results[0];
              console.log(allData);
              setMarkersB(
                {
                  lat: response.data.results[0].geometry.location.lat,
                  lng:response.data.results[0].geometry.location.lng
                }
              )
              setBPlace(response.data.results[0].formatted_address)

           
          })
          .catch(error => console.error(`Error:${error}`));
          // )
          // console.log(markers.lat)
          // console.log(markers.lng)
        }}/>
          {/* <Marker position={center} /> */}

          {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}

        </GoogleMap>

      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={3}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={4}>
          <Autocomplete>
            <Input style={{ backgroundColor: 'white' }} type='text' placeholder='Origin' value={APlace} disabled />

          </Autocomplete>
          <Autocomplete>
            <Input type='text' placeholder='Destination' value={BPlace} disabled/>
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              nClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance:{distance} </Text>
          <Text>Duration:{duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
        <HStack spacing={4}>
        <Text>Mode: </Text>

<Select value={modeTravel} onChange={(e)=>{setmodeTravel(e.target.value)}} placeholder='Select Mode of Travel'>
<option value='DRIVING'>Driving </option>
<option value='WALKING'>Walking</option>
<option value='BICYCLING'>Bicycling</option>
<option value='TRANSIT'>Transit</option>

</Select>
</HStack>
       
      </Box>
    </Flex>
  )
}

export default App
