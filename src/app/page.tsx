'use client'

import ArtifactInputDialog from "@/components/ArtifactInputDialog";
import ArtifactTable from "@/components/ArtifactTable";
import { GBFArtifact } from "@/types/artifact";
import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";


export default function Home() {
  const [artifactJson, setArtifactJson] = React.useState<GBFArtifact[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = (value?: string) => {
    if (value) {
      const apiData = JSON.parse(value);
      const artifactList: GBFArtifact[] = apiData.flatMap(e => e.list);
      setArtifactJson(artifactList);
    }
    setOpen(false);

  };

  return (
    <Stack>
      <Button variant="outlined" onClick={handleClickOpen}>
        アーティファクトの入力画面を開く
      </Button>
      <ArtifactInputDialog
        open={open}
        onClose={handleClose}
      />
      {artifactJson.length>0 && <ArtifactTable artifactData={artifactJson}/>}
    </Stack>
  );
}