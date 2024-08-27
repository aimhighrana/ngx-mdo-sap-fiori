export class Dataset {
    moduleId?: string;
    dispCriteria?: string;
    moduleDescriptionRequestDTO?: DatasetDescription;
    type?: string;
}

export class DatasetDescription {
    description?: string;
    information?: string;
}


export interface Dropdown {
    code?: string;
    text?: string;
    textRef?: string;
}

export interface Flow {
    flowId?: string;
    flowDesc?: string;
    stepId?: string;
    parentMapping?:Map<string, FlowParentMapping>
}

export interface FlowParentMapping {
    datasetDesc?: string;
    formId?: string;
    formDesc?: string;
    refernceDataSet?: []
}


export interface FormDetails {
    tabid?: string;
    description?: string;
    tabOrder?: number;
    isTabReadOnly?: boolean;
    isTabHidden?: boolean;
}