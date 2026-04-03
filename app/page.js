import MissionControlPage from '../components/MissionControlPage';
import { getMissionSnapshot } from '../lib/workspaceSnapshot';

export default function Page() {
  const missionSnapshot = getMissionSnapshot();

  return <MissionControlPage missionSnapshot={missionSnapshot} />;
}
