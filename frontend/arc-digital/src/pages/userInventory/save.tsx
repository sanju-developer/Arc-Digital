import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Masterdata } from './types';
import { Box, CircularProgress, Typography } from '@mui/material';
import Store from '../../store';
import { toastOption } from '../../constant';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';

interface SaveProps {
    masterData: Masterdata
    type: string;
}

function Save(props: SaveProps) {
    const { masterData, type } = props
    const { isLoading, selectedUser, updateInventory } = Store
    const { updateInventory: isLoadingUpdateInventory } = isLoading
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!comment) {
            toast.error('Please add your entires', { ...toastOption, position: "bottom-center" })
            return
        }

        // create payload and url
        const fruits = masterData.fruits.filter((f) => f.taken)
        const stationary = masterData.stationary.filter((f) => f.taken)
        let payload, url = 'add_order'
        if (type === 'fruits') {
            const fruitsPayload = fruits.map((f) => ({ name: f.name, id: f.id }))
            payload = { items: fruitsPayload, ordered_by: selectedUser?.user_id, comment }
        } else {
            const stationaryPayload = stationary.map((f) => ({ name: f.name, id: f.id }))
            payload = { items: stationaryPayload, ordered_by: selectedUser?.user_id, comment }
        }

        try {
            const result: any = await updateInventory(payload, url)
            if (result.success) {
                toast.success(result.success, { ...toastOption, position: "bottom-center" })
            } else {
                toast.error(result.error, { ...toastOption, position: "bottom-center" })
            }
            handleClose()
            setComment('')
        } catch (err) {
            // @ts-ignore
            toast.error(err, { ...toastOption, position: "bottom-center" })
            handleClose()
            setComment('')
        }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Save
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => placeOrder(event)
                }}
            >
                <DialogTitle>Order by {selectedUser?.name}</DialogTitle>
                <DialogContent>
                    <Typography color={'GrayText'}>Items taken</Typography>
                    <Box sx={{ display: 'flex', mb: 6 }}>
                        {/* @ts-ignore */}
                        {masterData[type].map((mfl) => mfl?.taken && <Box sx={{ fontSize: 24, p: 1, }}>{mfl.icon}</Box>)}
                    </Box>
                    <DialogContentText gutterBottom>
                        Please provide your feedback or detail if you have any
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comments/entries*"
                        name="comments/entries*"
                        label="Comments/Entries"
                        type="text"
                        fullWidth
                        multiline // Enables multiline textarea
                        rows={3} // Number of visible rows (adjust as needed)
                        variant="outlined"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isLoadingUpdateInventory}>Cancel</Button>
                    <Button type="submit" disabled={isLoadingUpdateInventory}>{isLoadingUpdateInventory ? <Typography>Placing order... <CircularProgress color="inherit" size={16} /></Typography> : 'Place order'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default observer(Save)