'use client'

import GBFArtifactApiResponse, { GBFArtifact } from "@/types/artifact";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, TextField, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, DialogContent, Container, Box, } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import React, { ChangeEvent, useCallback, useMemo } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import { BorderAll } from "@mui/icons-material";





export interface ArtifactInputDialogProps {
    // open: boolean;
    // onClose: (value?: string) => void;
    // onChange: (value: string) => void;
    setArtifactJson: (json: GBFArtifact[]) => void;
}

function extractAndConvertGbArtifactResponse(harJson: Object): GBFArtifact[] | null {
    // if (!harJson.hasOwnProperty('log')) {
    //     throw new Error('read frror');
    // }
    // if (!harJson.log.hasOwnProperty('entries')) {
    //     throw new Error('read frror');
    // }
    let result: GBFArtifact[] | null = [];
    try {
        //@ts-ignore あとで型つける
        const entries = harJson.log.entries as Array<Object>;
        // @ts-ignore あとで型つける
        const responseTextList = entries.filter(e => {
            // @ts-ignore あとで型つける
            const url = e.request.url as string;
            return url.startsWith('https://game.granbluefantasy.jp/rest/artifact/list/');
            //@ts-ignore あとで型つける
        }).map(e => e.response.content.text);
        const responseBodyJsonList = responseTextList.map(e => JSON.parse(e)) as GBFArtifactApiResponse[];
        const artifactList: GBFArtifact[] = responseBodyJsonList.flatMap(e => e.list);
        result = artifactList;
    }
    catch (e) {
        console.error(e);
    }
    finally {
        return result;
    }
}


export default function ArtifactInputDialog(props: ArtifactInputDialogProps) {

    const [inputJson, setInputJson] = React.useState("");
    const { setArtifactJson } = props;

    const onDrop = useCallback((acceptedFiles: Blob[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result?.toString();
                if (!binaryStr) {
                    throw new Error('read frror');
                }
                const harJson = JSON.parse(binaryStr.toString()) as Object;
                const response = extractAndConvertGbArtifactResponse(harJson);
                if (response) {
                    setArtifactJson(response);
                }
            }
            reader.readAsText(file)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputJson(value);
    }

    // const handleOk = () => {
    //     onClose(inputJson);
    // }
    // const handleCancel = () => {
    //     onClose();
    // }

    return (
        <Box sx={{ bgcolor: '#cfe8fc', height: '50vh' }} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>ここにファイルをドロップ</p> :
                    // <p>ドラッグ&ドロップするか、クリックしてファイルを選択する</p>
                    <Box >
                        <ol>
                            <li>アーティファクトの2ページ目を開く</li>
                            <li>ChromeのDevToolを開き、ネットワークタブを開く</li>
                            <li>1ページから順にすべてクリック</li>
                            <li>HARファイルをダウンロード</li>
                            <li>ここにドロップ</li>
                        </ol>
                    </Box>
            }

        </Box>


    );
}
