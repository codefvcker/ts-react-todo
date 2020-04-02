import {createStore, createEvent} from 'effector'
import { TTodo } from '../../types'

type TEdit = {
    id: number,
    newTitle: string
}

export const addTodo = createEvent<TTodo>()
export const removeTodo = createEvent<number>()
export const toggleTodo = createEvent<number>()
export const isEditingTodo = createEvent<number>()
export const editTodo = createEvent<TEdit>()
export const getSavedTodo = createEvent<TTodo[]>()
export const $todos = createStore<TTodo[]>([] as TTodo[])

$todos.on(addTodo, (state, todo)=> [todo, ...state])
$todos.on(removeTodo, (state, id)=> state.filter(todo => todo.id !== id))
$todos.on(getSavedTodo, (_, todos)=> todos)
$todos.on(isEditingTodo, (state, id)=> state.map(todo => {
    if(todo.id === id) {
        todo.editing = true
    }
    return todo
}))
$todos.on(editTodo, (state, {id , newTitle})=> state.map(todo => {
    if(todo.id === id) {
        todo.title = newTitle
        todo.editing = false
    }
    return todo
}))
$todos.on(toggleTodo, (state, id)=> state.map(todo => {
    if(todo.id === id) {
        todo.completed = !todo.completed
    }
    return todo
}))

