'use client'

import GBFArtifactApiResponse, { GBFArtifact } from "@/types/artifact";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, TextField, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, DialogContent,  } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, useMemo } from "react";
import CloseIcon from '@mui/icons-material/Close';





export interface ArtifactInputDialogProps {
    open: boolean;
    onClose: (value?: string) => void;
    // onChange: (value: string) => void;
}


export default function ArtifactInputDialog(props: ArtifactInputDialogProps) {

    const [inputJson, setInputJson] = React.useState("");
    const { onClose, open } = props;

    // const handleClose = () => {
    //     onClose('a');
    // };


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputJson(value);
    }

    const handleOk = () => {
        onClose(inputJson);
    }
    const handleCancel = () => {
        onClose();
    }

    return (
        <Dialog onClose={handleCancel} open={open} fullWidth={true}>
            <DialogTitle>アーティファクト入力</DialogTitle>
            
            <DialogContent >
                <TextField fullWidth
                    id="outlined-multiline-static"
                    label="Artifact JSON"
                    multiline
                    rows={8}
                    placeholder="アーティファクトのjsonを入力"
                    onChange={handleInputChange}
                />
            </DialogContent>
        <DialogActions >
                <Button variant="contained" onClick={handleOk}>OK</Button>
            </DialogActions>
        </Dialog>

    );
}

// function SimpleDialogDemo() {
//     const [open, setOpen] = React.useState(false);

//     const [artifactJson, setArtifactJson] = React.useState<GBFArtifact[]>([]);
//     const handleClickOpen = () => {
//         setOpen(true);
//     };


//     const handleClose = (value: string) => {
//         console.log('handleClose', value);

//         setOpen(false);

//     };
//     const handleValueChange = (value: string) => {
//         const apiData = JSON.parse(value);
//         const artifactList: GBFArtifact[] = apiData.flatMap(e => e.list);
//         setArtifactJson(artifactList);
//         const memoResult = useMemo(() => artifactJson, [])
//         console.log(artifactList);
//     }
    
//     return (
//         <div>

//             <br />
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Open simple dialog
//             </Button>
//             <ArtifactInputDialog
//                 open={open}
//                 onClose={handleClose}
//                 handleValueChange={handleValueChange}
//             />

//         </div>
//     );
// }