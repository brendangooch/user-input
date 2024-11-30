/**
 * 
 */

import { listen, dispatchCustom } from "@brendangooch/utils";

export class InputHandler {

    public translate(userInputEvents: string[], gameEvent: string): InputHandler {
        userInputEvents.forEach(name => {
            listen(name, (e: CustomEvent) => {
                dispatchCustom(gameEvent, e.detail);
            });
        });
        return this;
    }

}