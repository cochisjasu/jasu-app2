import { Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import Session from "../components/Session"
import useSync from "../components/Sync/useSync"

const useStyles = makeStyles((theme) => ({
    button: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2, 2),
        fontSize: '1.5rem',
        fontWeight: '700'
    }
}))

export default function SyncView () {

    const classes = useStyles()
    const {
        allMutation,
        fruitCategoryMutation,
        presentationCategoryMutation,
        fruitMutation,
        fruitVarietyMutation,
        presentationMutation,
        productMutation,
        priceMutation,
        harvestMutation,
        loading
    } = useSync()

    return <Session.SessionPanel>
        <Box display='flex' flexDirection='column' margin={2}>
            <Button variant="contained" color='primary' className={classes.button} onClick={allMutation} disabled={loading}>Sincronizar todo</Button>
            {/*<Button variant="outlined" color='primary' className={classes.button} onClick={fruitCategoryMutation} disabled={loading}>Sincronizar Categorias de Frutas</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={presentationCategoryMutation} disabled={loading}>Sincronizar Categorias de Presentación</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={fruitMutation} disabled={loading}>Sincronizar Frutas</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={fruitVarietyMutation} disabled={loading}>Sincronizar Variedades de Fruta</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={presentationMutation} disabled={loading}>Sincronizar Presentaciones</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={productMutation} disabled={loading}>Sincronizar Productos</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={priceMutation} disabled={loading}>Sincronizar Precios</Button>
            <Button variant="outlined" color='primary' className={classes.button} onClick={harvestMutation} disabled={loading}>Sincronizar Cosechas</Button>*/}
        </Box>
  </Session.SessionPanel>
}