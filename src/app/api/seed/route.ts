import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  //purgar la bd
  await prisma.todo.deleteMany();
  // preparar la insersion
  await prisma.todo.createMany({
    data: [
      {
        description: "Piedra del alma",
        complete: true,
      },
      {
        description: "piedra del poder"
      }, 
      {
        description: "piedra del tiempo"
      },
      {
        description: "piedra del espacio"
      },
      {
        description: "piedra de la realidad"
      }
    ],
  });
  return NextResponse.json({ message: "Seed executed" });
}
