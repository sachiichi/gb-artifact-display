'use client'

import GBFArtifactApiResponse, { GBFArtifact } from "@/types/artifact";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, TextField, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Badge, Chip } from "@mui/material";
import { blue } from "@mui/material/colors";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useMemo } from "react";
import {
    MRT_Table, //import alternative sub-component if we do not want toolbars
    type MRT_ColumnDef,
    useMaterialReactTable,
    MaterialReactTable,
    createMRTColumnHelper,
} from 'material-react-table';




export interface ArtifactTableProps {
    artifactData: GBFArtifact[];
}

// 属性の値を文字列へ
function convertAttribute(apiVal: string): string {
    let attributeString;
    switch (apiVal) {
        case "1": attributeString = "火"; break;
        case "2": attributeString = "水"; break;
        case "3": attributeString = "土"; break;
        case "4": attributeString = "風"; break;
        case "5": attributeString = "光"; break;
        case "6": attributeString = "闇"; break;
        default: attributeString = "不明";
    }
    return attributeString
}

// 武器種の値を文字列へ
function convertKind(apiVal: string): string {
    let attributeString;
    switch (apiVal) {
        case "1": attributeString = "剣"; break;
        case "2": attributeString = "短剣"; break;
        case "3": attributeString = "槍"; break;
        case "4": attributeString = "斧"; break;
        case "5": attributeString = "杖"; break;
        case "6": attributeString = "銃"; break;
        case "7": attributeString = "格闘"; break;
        case "8": attributeString = "弓"; break;
        case "9": attributeString = "楽器"; break;
        case "10": attributeString = "刀"; break;
        default: attributeString = "不明";
    }
    return attributeString
}

const Skill1And2List: string[] = [
    '攻撃力',
    '防御',
    'HP',
    '奥義ダメージ',
    'アビリティダメージ',
    '回避率',
    '弱体成功率',
    '弱体耐性',
    '有利属性軽減',
    '自属性攻撃力',
    '回復性能',
    'クリティカル確率',
    'ダブルアタック確率',
    'トリプルアタック確率'

];

const SKILL_GROUP2: string[] = [
    '最大HP上昇/防御力-70%',
    'アビリティダメージ上限',
    'HPが50%以上の時、トリプルアタック確率UP',
    'HPが100%の時、与ダメージUP',
    'クリティカル発動時、ダメージ上限UP',
    '通常攻撃ダメージ上限',
    '通常攻撃の与ダメージ上昇',
    'チェイン与ダメージUP',
    '確率で攻撃開始時に自分の弱体効果を1つ回復',
    '確率で強化効果が無効化されない',
    '通常攻撃ダメージ上限UP/アビリティダメージ上限-80％/奥義ダメージ上限-60％',
    'アビリティ与ダメージ上昇',
    'ターンダメージを軽減',
    '奥義ダメージ特殊上限UP',
    'アビリティダメージ上限UP/通常攻撃ダメージ上限-20％/奥義ダメージ上限-60％',
    'HPが50%以下の時、被ダメージを軽減',
    '再生',
    '奥義ダメージ上限',
    '奥義ダメージ上限UP/通常攻撃ダメージ上限-20％/アビリティダメージ上限-80％',
    '奥義与ダメージ上昇',
];

const SKILL_GROUP3: string[] = [
    '1回攻撃発動時、自分に一定個数ランダムな強化効果',
    '戦闘不能になった時、一度だけ味方全体に一定個数ランダムな強化効果',
    '弱体アビリティ使用時、敵に被ダメージUP(2回)',
    'リンクアビリティを一定回数使用時に自分のリンクアビリティの再使用間隔を1ターン短縮',
    '一定回数敵の攻撃行動のターゲットになった場合、一度だけ自分に自属性追撃(1回)効果',
    '確率でターンの進行時に経過ターンを5ターン進める(重複不可)',
    'キュアポーションまたはオールポーション使用時にフェイタルチェインゲージUP(重複不可)',
    '回復アビリティ使用時、自分の次に配置されたキャラに自属性追撃効果(1回)',
    'バトル終了時にランダムな耳飾りを入手することがある(レベルに応じて入手確率UP/重複不可)　◆サブメンバーにいる場合でも発動',
    '獲得経験値UP(重複不可)　◆サブメンバーにいる場合でも発動',
    'ターン終了時、確率で敵の強化効果を全て無効化(重複不可)',
    'ターン終了時にHPが50%以下の敵がいる時、一度だけ自分のHPを回復',
    'バトル登場時に一度だけ自分の与ダメージUP',
    'アビリティを一定回数使用する度に自分にダメージ上限UP(累積)',
    'バトル開始時と5ターン毎に自分にバリア効果',
    '攻撃開始時、確率で自分に乱撃(6ヒット)効果(1回)',
    'バトル開始時に最大HPの20%を消費するが3ターン後、自分にダメージ上限UP',
    'バトル開始時から1ターンの間被ダメージ減少',
    '敵に一定回数攻撃を与えた時、一度だけ自分に乱撃(3ヒット)効果(1回)',
    'バトル開始時に自分に一定個数ランダムな強化効果',
    '攻撃行動を行わなかった場合、ターン終了時に自分に一定個数ランダムな強化効果',
    '攻撃開始時に敵の弱体効果の数が3つ以下の時、自分にブロック効果',
    'ターン終了時、自分がそのターン中に消費したHPに応じて敵に無属性ダメージ',
    'ターン終了時、自分がそのターン中に消費した奥義ゲージ量に応じて自分に与ダメージ上昇',
    '1番目のアビリティ使用時にHPを一定割合消費するが、1番目のアビリティの使用間隔を1ターン短縮(レベルに応じて消費割合DOWN)',
    'サブメンバー時、一定ターン毎に敵全体にランダムな弱体効果を1つ付与(重複不可)',
    'アイテムドロップ率UP(重複不可)　◆サブメンバーにいる場合でも発動',
    '使用間隔が10ターン以上のアビリティ使用時、自分に与ダメージUP',
    'アビリティダメージを一定量与える毎に自分にアビリティ与ダメージ上昇(累積)',
    '自属性スキルエンハンス-50%/バトル開始時に味方全体の攻防DOWN/被ダメージ上昇(重複不可)　◆サブメンバーにいる場合でも発動',
    'アビリティ使用不可/奥義が発動可能な時、奥義を温存していても発動'
];

// const columns: GridColDef[] = [
//     { field: 'name', headerName: '名前', width: 70 },
//     { field: 'attribute', headerName: '属性', width: 130, valueGetter: (v, r) => (convertAttribute(v)) },
//     { field: 'kind', headerName: '武器の種類', width: 130, valueGetter: (v, r) => (convertKind(v)) },
//     { field: 'skill1_info', headerName: 'スキル1', width: 90, valueGetter: (v, r) => { return `${r.skill1_info.name}` } },
//     { field: 'skill2_info', headerName: 'スキル2', width: 90, valueGetter: (v, r) => { return `${r.skill2_info.name}` } },
//     { field: 'skill3_info', headerName: 'スキル3', width: 90, valueGetter: (v, r) => { return `${r.skill3_info.name}` } },
//     { field: 'skill4_info', headerName: 'スキル4', width: 90, valueGetter: (v, r) => { return `${r.skill4_info.name}` } },

//     //   {
//     //     field: 'fullName',
//     //     headerName: 'Full name',
//     //     description: 'This column has a value getter and is not sortable.',
//     //     sortable: false,
//     //     width: 160,
//     //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     //   },
// ];

// const paginationModel = { page: 0, pageSize: 5 };

// export default function ArtifactInputDialog(props: SimpleDialogProps) {

// const data: GBFArtifact[] = [

//     {
//         "artifact_id": 301080101,
//         "max_level": 5,
//         "name": "オミナス・フィアン",
//         "comment": "",
//         "rarity": "3",
//         "skill1_info": {
//             "skill_id": 10014,
//             "skill_quality": 4,
//             "level": 1,
//             "name": "攻撃力",
//             "is_max_quality": false,
//             "effect_value": "+1680",
//             "icon_image": "bonus_28"
//         },
//         "skill2_info": {
//             "skill_id": 30071,
//             "skill_quality": 1,
//             "level": 1,
//             "name": "防御",
//             "is_max_quality": false,
//             "effect_value": "+8.8%",
//             "icon_image": "bonus_28"
//         },
//         "skill3_info": {
//             "skill_id": 30273,
//             "skill_quality": 3,
//             "level": 1,
//             "name": "最大HP上昇/防御力-70%",
//             "is_max_quality": false,
//             "effect_value": "+10.4%",
//             "icon_image": "bonus_29"
//         },
//         "skill4_info": {
//             "skill_id": 50081,
//             "skill_quality": 1,
//             "level": 1,
//             "name": "1回攻撃発動時、自分に一定個数ランダムな強化効果",
//             "is_max_quality": true,
//             "effect_value": "1個",
//             "icon_image": "bonus_30"
//         },
//         "id": 11990,
//         "level": "1",
//         "kind": "8",
//         "attribute": "6",
//         "next_exp": 30000,
//         "remain_next_exp": 30000,
//         "exp_width": 0,
//         "is_locked": false,
//         "is_unnecessary": false,
//         "equip_npc_info": {image: 'aaa', name: 'bbb', user_npc_id: 11111}
//     },

// ];


export default function AtrifactTable(props: ArtifactTableProps) {
    const data = props.artifactData;
    
    const columnHelper = createMRTColumnHelper<GBFArtifact>();
    const columns = useMemo<MRT_ColumnDef<GBFArtifact>[]>(
        () => [
            {
                accessorKey: 'name', //simple recommended way to define a column
                header: '名前',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${convertAttribute(r.attribute)}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'attribute',
                header: '属性',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${convertKind(r.kind)}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'kind',
                header: '武器種',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.level}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'level',
                header: 'アーティファクトレベル',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: true, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.skill1_info.name}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill1',
                header: 'スキル1',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                filterVariant: 'select',
                filterSelectOptions: Skill1And2List
            },
            {
                accessorFn: (r) => (`${r.skill1_info.level}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill1_level',
                header: 'スキル1_レベル',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.skill1_info.skill_quality}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill1_quality',
                header: 'スキル1_レア度',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span>{renderedCellValue}</span>
                        <Chip size="small" label={`${row.original.skill1_info.effect_value}`} variant="outlined" />
                        {row.original.skill1_info.is_max_quality && <Chip size="small" color="success" label="最大" />}
                    </Box>
                ),
            },
            {
                accessorFn: (r) => (`${r.skill2_info.name}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill2',
                header: 'スキル2',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                filterVariant: 'select',
                filterSelectOptions: Skill1And2List
            },
            {
                accessorFn: (r) => (`${r.skill2_info.level}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill2_level',
                header: 'スキル2_レベル',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.skill2_info.skill_quality}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill2_quality',
                header: 'スキル2_レア度',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span>{renderedCellValue}</span>
                        <Chip size="small" label={`${row.original.skill2_info.effect_value}`} variant="outlined" />
                        {row.original.skill2_info.is_max_quality && <Chip size="small" color="success" label="最大" />}
                    </Box>
                ),
            },
            {
                accessorFn: (r) => (`${r.skill3_info.name}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill3',
                header: 'スキル3',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                filterVariant: 'select',
                filterSelectOptions: SKILL_GROUP2
            },
            {
                accessorFn: (r) => (`${r.skill3_info.level}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill3_level',
                header: 'スキル3_レベル',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.skill3_info.skill_quality}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill3_quality',
                header: 'スキル3_レア度',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span>{renderedCellValue}</span>
                        <Chip size="small" label={`${row.original.skill3_info.effect_value}`} variant="outlined" />
                        {row.original.skill3_info.is_max_quality && <Chip size="small" color="success" label="最大" />}
                    </Box>
                ),
            },
            {
                accessorFn: (r) => (`${r.skill4_info.name}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill4',
                header: 'スキル4',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                filterVariant: 'select',
                filterSelectOptions: SKILL_GROUP3
            },
            {
                accessorFn: (r) => (`${r.skill4_info.level}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill4_level',
                header: 'スキル4_レベル',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
            },
            {
                accessorFn: (r) => (`${r.skill4_info.skill_quality}`),
                // accessorKey: 'attribute', //simple recommended way to define a column
                id: 'skill4_quality',
                header: 'スキル4_レア度',
                muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
                enableHiding: false, //disable a feature for this column
                Cell: ({ renderedCellValue, row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <span>{renderedCellValue}</span>
                        <Chip size="small" label={`${row.original.skill4_info.effect_value}`} variant="outlined" />
                        {row.original.skill4_info.is_max_quality && <Chip size="small" color="success" label="最大" />}
                    </Box>
                ),
            },
            // {
            //     accessorFn: (originalRow) => originalRow.artifact_id, //alternate way
            //     id: 'artifact_id', //id required if you use accessorFn instead of accessorKey
            //     header: 'Age',
            //     Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
            //     Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>, //optional custom cell render
            // },
        ],
        [],
    );

// .element-dark td {
//     background-color: rgba(156,113,217,.3137254902)
// }

// .element-earth td {
//     background-color: rgba(166,107,55,.3137254902)
// }

// .element-fire td {
//     background-color: rgba(255,67,67,.3137254902)
// }

// .element-light td {
//     background-color: rgba(255,255,71,.3137254902)
// }

// .element-water td {
//     background-color: rgba(46,130,255,.3137254902)
// }

// .element-wind td {
//     background-color: rgba(138,255,113,.3137254902)
// }
    const table = useMaterialReactTable<GBFArtifact>({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnOrdering: true, //enable a feature for all columns
        enableGlobalFilter: false, //turn off a feature
        muiTableBodyRowProps: ({row}) => ({sx: {backGroundColor: 'rgba(64,224,208,0.31)'}})
    })
    ;
    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}