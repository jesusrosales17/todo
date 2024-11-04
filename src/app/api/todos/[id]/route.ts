import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';


const getTodo = async (id: string):Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    })

    return todo;

};

export async function GET(request: Request, {params}: {params: Promise<{id: string}>}) {
    // optener los segmentos de la url
    
    const id = (await params).id;
    
    const todo = await getTodo(id);
    
    if(!todo) {
        return NextResponse.json({message: 'Todo not found'}, {status: 404})
      }


    return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional().default(false),
  description: yup.string().optional()
})
export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
    // optener los segmentos de la url
    const id = (await params).id;


    const todo = await getTodo(id);

    if(!todo) {
        return NextResponse.json({message: 'Todo not found'}, {status: 404})
      }

   try {
    const {complete, description} = await putSchema.validate(await request.json());
    console.log(complete)

    const updatedTodo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            complete,
            description
        }
    })


    return NextResponse.json(updatedTodo);
   } catch (error) {
    return NextResponse.json({message: error}, {status: 400})
   }
}


