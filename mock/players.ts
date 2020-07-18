import {Response, Request} from 'express'
import {Hero, Player} from '../src/api/types'
import {heros} from './heros'
import faker from 'faker'

faker.locale = 'zh_CN'

// 模拟玩家数据
const playerCount = 100
const playerList: Player[] = []

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(), // 账号名
    nickname: faker.name.findName(), // 昵称
    avatar: faker.image.avatar(), // 用户头像
    level: faker.random.number(30), // 用户等级
    exp: faker.random.number(100000), // 经验值
    rank: faker.random.number(200), //段位
    bravepoints: faker.random.number(1000), // 勇者积分
    winningstreak: faker.random.number(10), // 连胜场次
    wanttoplay: genWanttoplay() // 想玩英雄
  })
}

function genWanttoplay(){
  let wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现
export const getPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页/过滤关键词等参数
  console.log('req', req)
  const { accountname, page = 1, limit = 10 } = req.query

  //过滤
  let mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(<string>accountname) < 0) {
      return false
    }
    return true
  })
  // 分页
  const pageList = mockList.filter((item, index) => {
    return index < <number>limit * <number>page && index >= <number>limit * (<number>page - 1)
  })
  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}

export const getPlayer = (req: Request, res: Response) => {
  const {id} = req.params
  for(const player of playerList) {
    if(player.id.toString() === id) {
      res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  // 没找大响应数据，报错
  res.json({
    code: 70001,
    message: '没有找到相应的玩家信息'
  })
}

// 创建玩家
export const createPlayer = (req: Request, res: Response) => {
  // 新增的英雄数据
  const { player } = req.body

  // 直接返回
  res.json({
    code: 20000,
    data: {
      player
    }
  })
}

// 更新玩家
export const updatePlayer = (req: Request, res: Response) => {
  // 新增的英雄数据
  const { id } = req.params
  const { player } = req.body

  for(const player of playerList) {
    if(player.id.toString() === id) {
      res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }

  // 直接返回
  res.json({
    code: 70001,
    message: '没有找到玩家信息'
  })
}


// 删除玩家
export const deletePlayer = (req: Request, res: Response) => {


  // 直接返回
  res.json({
    code: 20000
  })
}
