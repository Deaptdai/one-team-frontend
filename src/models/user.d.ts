/**
 * 用户类别
 */
export type UserType = {
    id: number,
    username: string,
    userAccount: string,
    avatarUrl?: string,
    userProfile?: string,
    gender: number,
    phone: string,
    email: string,
    userStatus: number,
    userRole: number,
    userCode: string,
    tags: string[],
    createTime: Date;
}