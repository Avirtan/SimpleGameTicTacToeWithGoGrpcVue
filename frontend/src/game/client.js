
import { GameClient } from "../proto/tictac_grpc_web_pb";

const client = new GameClient("https://192.168.1.185:443", null, null);
export default {client}