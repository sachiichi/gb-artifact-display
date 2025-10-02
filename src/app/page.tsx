'use client'

import ArtifactInputDialog from "@/components/ArtifactInputDialog";
import ArtifactTable from "@/components/ArtifactTable";
import GBFArtifactApiResponse, { GBFArtifact } from "@/types/artifact";
import { AppBar, Box, Button, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export default function Home() {
  const [artifactJson, setArtifactJson] = React.useState<GBFArtifact[]>([]);
  const [open, setOpen] = React.useState(false);



  const handleClose = (value?: string) => {
    if (value) {
      const apiData = JSON.parse(value) as GBFArtifactApiResponse[];
      const artifactList: GBFArtifact[] = apiData.flatMap(e => e.list);
      setArtifactJson(artifactList);
    }
    setOpen(false);

  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            アーティファクト眺めるやつ
          </Typography>
          <Button color="inherit"></Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HelpOutlineIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack>
        {artifactJson.length === 0 && <ArtifactInputDialog setArtifactJson={setArtifactJson} />}
        {artifactJson.length > 0 && <ArtifactTable artifactData={artifactJson} />}
      </Stack>
    </Box>
  );
}