import { getMissionSnapshot } from '../../../lib/workspaceSnapshot';

export async function GET() {
  try {
    const snapshot = getMissionSnapshot();
    return Response.json(snapshot, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to load mission snapshot',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
