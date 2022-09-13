export interface Survey {
  toArray(): any;
  // isEdited: boolean;
  TEMPLATE_ID?: number;
  TemplateName?: string;
  TemplateNameAr?: string;
  TemplateNameEn?: string;
  SurveyName?: string;
  SurveyNameAr?: string;
  SurveyNameEn?: string;
  SRV_ID?: number;
  SystemType?: number;
  SURVEY_STATUS_AR?: string;
  SURVEY_STATUS_EN?: string;
  SurveyPeriods: string;
  START_DATE?: string;
  END_DATE?: string;
};
