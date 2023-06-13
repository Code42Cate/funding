export const fetchTopic = async (identifier: string) => {
  const res = await fetch(
    `https://ec.europa.eu/info/funding-tenders/opportunities/data/topicDetails/${identifier}.json?lang=en`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) throw new Error('Invalid response');

  const { TopicDetails: topicDetails }: Root = await res.json();

  return topicDetails;
};

// The following types were auto-generated from the JSON response of the API
export type Root2 = {
  action: string;
  plannedOpeningDate: string;
  deadlineModel: string;
  deadlineDates: string[];
  budgetYearMap: unknown;
  expectedGrants: number;
  minContribution: number;
  maxContribution: number;
  budgetTopicActionMap: unknown;
};

export type Root = {
  TopicDetails: TopicDetails;
};

export type TopicDetails = {
  type: number;
  ccm2Id: number;
  cftId: number;
  identifier: string;
  title: string;
  publicationDateLong: number;
  callIdentifier: string;
  callTitle: string;
  callccm2Id: number;
  allowPartnerSearch: boolean;
  frameworkProgramme: FrameworkProgramme;
  programmeDivision: ProgrammeDivision[];
  destinationDetails: string;
  destinationDescription: string;
  topicMGAs: any[];
  tags: string[];
  keywords: string[];
  flags: string[];
  sme: boolean;
  actions: Action[];
  latestInfos: any[];
  budgetOverviewJSONItem: BudgetOverviewJsonitem;
  description: string;
  conditions: string;
  supportInfo: string;
  sepTemplate: string;
  links: any[];
  additionalDossiers: any[];
  infoPackDossiers: any[];
  callDetailsJSONItem: any[];
};

export type FrameworkProgramme = {
  id: number;
  abbreviation: string;
  description: string;
};

export type ProgrammeDivision = {
  id: number;
  abbreviation: string;
  description: string;
};

export type Action = {
  status: Status;
  types: Type[];
  plannedOpeningDate: string;
  submissionProcedure: SubmissionProcedure;
  deadlineDates: string[];
};

export type Status = {
  id: number;
  abbreviation: string;
  description: string;
};

export type Type = {
  typeOfAction: string;
  typeOfMGA: TypeOfMga[];
};

export type TypeOfMga = {
  id: number;
  abbreviation: string;
  description: string;
};

export interface SubmissionProcedure {
  id: number;
  abbreviation: string;
  description: string;
}

export type BudgetOverviewJsonitem = {
  budgetTopicActionMap: any;
  budgetYearsColumns: string[];
};
