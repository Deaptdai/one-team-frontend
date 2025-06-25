import { UserType } from './user.d';
/**
 * 队伍类别
 */
export type TeamType = {
    id: number,
    name: string,
    description: string,
    expireTime?: Date,
    maxNum: number,
    password?: string,
    status: number,
    createTime: Date,
    updateTime: Date,
    createUser?: UserType;
}