import {Response, Request} from 'express'

// 路由实现
export const getPlayers = (req: Request, res: Response) => {
    res.json([1,2,3])
}