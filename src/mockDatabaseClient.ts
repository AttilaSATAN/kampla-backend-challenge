// mockDatabase.ts

import { seededOrders, seededUsers } from './db'
import { Order, Product, User } from './types'

let database = {
    orders: seededOrders,
    users: seededUsers,
}

let currentId = 1
export const getOrders = (): Order[] => database.orders

export const getOrderById = (id: number): Order | undefined =>
    database.orders.find(order => order.id === id)

export const createOrder = (userId: string, products: Product[]): Order => {
    const newOrder: Order = {
        id: currentId++,
        products,
        userId,

        createdAt: new Date(),
    }
    database.orders.push(newOrder)
    return newOrder
}

export const updateOrder = (
    id: number,
    updatedOrder: Partial<Order>,
): Order | undefined => {
    const order = database.orders.find(order => order.id === id)
    if (order) {
        Object.assign(order, updatedOrder)
        return order
    }
    return undefined
}

export const deleteOrder = (id: number): boolean => {
    const orderIndex = database.orders.findIndex(order => order.id === id)
    if (orderIndex !== -1) {
        database.orders.splice(orderIndex, 1)
        return true
    }
    return false
}

export const getUsers = (): User[] => database.users

export const getUserById = (id: string): User | undefined =>
    database.users.find(user => user.id === id)

export const createUser = (name: string, balance: number = 0): User => {
    const newUser: User = {
        id: `user${currentId++}`,
        name,
        balance,
    }
    database.users.push(newUser)
    return newUser
}

export const updateUser = (
    id: string,
    updatedUser: Partial<User>,
): User | undefined => {
    const user = database.users.find(user => user.id === id)
    if (user) {
        Object.assign(user, updatedUser)
        return user
    }
    return undefined
}

export const deleteUser = (id: string): boolean => {
    const userIndex = database.users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
        database.users.splice(userIndex, 1)
        return true
    }
    return false
}

export const getOrdersByUserId = (userId: string): Order[] =>
    database.orders.filter(order => order.userId === userId)

export const getUserOrdersAfterDate = (userId: string, date: Date): Order[] =>
    database.orders.filter(
        order =>
            order.userId === userId &&
            order.createdAt.getTime() > date.getTime(),
    )
