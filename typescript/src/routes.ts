import { Request, Response } from 'express'
import CreateCourseService from './CreateCourseService'

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: 'Rian',
    duration: 1,
    educator: 'Roberson'
  })

  CreateCourseService.execute({
    name: 'Rian 2',
    educator: 'Professor'
  })

  return response.send()
}