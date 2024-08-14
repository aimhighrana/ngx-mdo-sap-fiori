export interface Fields {
    fieldId: string;
    structureId: number;
    order: number;
    moduleId: string;
    fieldType: string;
    fieldCtrl: FieldCtrl;

}

export interface FieldCtrl {
    description: string;
    dataType: string;
    pickList: string;    
}