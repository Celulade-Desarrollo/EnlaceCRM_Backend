import { TwilioService } from "./twilioService.js";
import { TwilioAdapter } from "../../infrastructure/adapters/TwilioAdapter.js";

const twilioAdapter = new TwilioAdapter();
export const twilioService = new TwilioService(twilioAdapter);
