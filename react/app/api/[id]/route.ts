import { fDatabaseConfiguration } from "@/app/common/db";
import { getStore, removeTask, app } from "@common/types/fdb";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  // Connect to Firestore
  const store = getStore(app(fDatabaseConfiguration));
  // Remove a task
  try {
    await removeTask(store, id);
    return new Response(
      JSON.stringify({ message: 'Task removed successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error removing task', error }),
      { status: 500 }
    );
  }
}
