import { Box, IconButton, makeStyles } from "@material-ui/core";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import IsoToLatLong from 'country-iso-to-coordinates';
import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#DCE7E7",
    flex: 1,
    borderRadius: 8,
  },
  buttonBox: {
    position: "absolute",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: theme.palette.white.main,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  }
}))

export default function WorldMap({markers})
{
  const [position, setPosition] = useState({ coordinates: [-100,20], zoom: 1.5 });
  const [scaleFactor, setScaleFactor] = useState(1.5);
  const classes = useStyles();

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    const newZoom = position.zoom * 2;
    setPosition(pos => ({ ...pos, zoom: newZoom }));
    setScaleFactor(newZoom);
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    const newZoom = position.zoom / 2;
    setPosition(pos => ({ ...pos, zoom: newZoom }));
    setScaleFactor(newZoom);
  }

  function handleOnMove(pos)
  {
    setScaleFactor(pos.k);
  }

  function handleMoveEnd(pos) {
    setPosition(pos);
  }

  useEffect(() => {
    if (markers.length > 0){
      setPosition(pos => ({...pos, coordinates: IsoToLatLong[markers[0]].coordinate.slice().reverse()}))
    }
  }, [markers])

  
  return(<>
    <ComposableMap width={400} projection="geoMercator" className={classes.root}>
      <ZoomableGroup minZoom={1} zoom={position.zoom} center={position.coordinates} onMove={handleOnMove} onMoveEnd={handleMoveEnd} translateExtent={[[-250, 30],[700, 550]]}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => <Geography 
              key={geo.rsmKey} 
              geography={geo} 
              fill="#F7F7F4"
              stroke='#CBCAC8'
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />)
          }
        </Geographies>
        {markers.map((countryCode) => (
          <Marker key={countryCode} coordinates={IsoToLatLong[countryCode].coordinate.slice().reverse()}>
            <g key={countryCode} transform={`scale(${1/scaleFactor})`}>
            <circle cx="0" cy="-6" r={12} fill="#FD4A5C"/>
            <circle cx="0" cy="-6" r={11.5} stroke="white"/>
            <circle cx="0" cy="-6" r={29} fill="#FD4A5C" opacity="0.3"/>
            <path d="M 0 -6.3 C -0.3789 -6.3 -0.7422 -6.458 -1.0102 -6.7393 C -1.2781 -7.0206 -1.4286 -7.4022 -1.4286 -7.8 C -1.4286 -8.1978 -1.2781 -8.5794 -1.0102 -8.8607 C -0.7422 -9.142 -0.3789 -9.3 0 -9.3 C 0.3789 -9.3 0.7422 -9.142 1.0102 -8.8607 C 1.2781 -8.5794 1.4286 -8.1978 1.4286 -7.8 C 1.4286 -7.603 1.3916 -7.408 1.3198 -7.226 C 1.248 -7.044 1.1428 -6.8786 1.0102 -6.7393 C 0.8775 -6.6001 0.72 -6.4896 0.5467 -6.4142 C 0.3734 -6.3388 0.1876 -6.3 0 -6.3 V -6.3 Z M 0 -12 C -1.0609 -12 -2.0783 -11.5575 -2.8284 -10.7698 C -3.5786 -9.9822 -4 -8.9139 -4 -7.8 C -4 -4.65 0 0 0 0 C 0 0 4 -4.65 4 -7.8 C 4 -8.9139 3.5786 -9.9822 2.8284 -10.7698 C 2.0783 -11.5575 1.0609 -12 0 -12 V -12 Z" fill="white"/>
        </g>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
    <Box className={classes.buttonBox}>
      <IconButton children={<Add/>} className={classes.button} size='small' onClick={handleZoomIn}/>
      <IconButton children={<Remove/>} className={classes.button} size='small' onClick={handleZoomOut}/>
    </Box>
  </>)
}