export class User {
    fname: string | undefined;
    lname: string | undefined;
    userId: string | undefined;
    pemail: string | undefined;
    status: string | undefined;
    profileKey: ProfileKey | undefined;

}

export interface ProfileKey {
    userName: string | undefined;
    tenantId: string | undefined;
}
