export interface GBFArtifactSkillInfo {
    skill_id: number;
    skill_quality: number;
    level: number;
    name: string;
    is_max_quality: boolean;
    effect_value: string;
    icon_image: string;
}

export interface GBFArtifactEqiupInfo {
    user_npc_id: number;
    image: string;
    name: string;
}

export interface GBFArtifact {

    artifact_id: number;
    max_level: number;
    name: string;
    comment: string;
    rarity: string;
    skill1_info: GBFArtifactSkillInfo;
    skill2_info: GBFArtifactSkillInfo;
    skill3_info: GBFArtifactSkillInfo;
    skill4_info: GBFArtifactSkillInfo;
    id: number;
    level: string;
    kind: string;
    attribute: string;
    next_exp: number;
    remain_next_exp: number;
    exp_width: number;
    is_locked: boolean;
    is_unnecessary: boolean;
    equip_npc_info: GBFArtifactEqiupInfo;
}


export default interface GBFArtifactApiResponse {
    list: GBFArtifact[];
    first: number;
    last: number;
    prev: number;
    next: number;
    count: number;
    current: number;
    options: {
      max_number: number;
      number: number;
      sort: any;
      filter: any;
      tpl_type: string;
    },
    default_selector: any;
    has_default_selector: boolean
}
