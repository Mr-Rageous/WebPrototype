import { Part } from "./part.js";
import { PlayerData } from "./playerData.js";

export function mouseEvent_hoverPart(part: Part, playerData: PlayerData) {
    part.sockets.forEach(socket => {
        try {
            const genCardInfoText = document.getElementById('genCardInfoText' + part.sockets.indexOf(socket));
            const cardInfoText = document.getElementById(part.name);
            if (genCardInfoText) {
                // if part is in sockets of any other part
                playerData.inventory.parts.forEach(otherPart => {
                    // if part is not this part
                    if (otherPart === part) { return; }
                    // if we can get the socket that this part is in, in the otherPart
                    let getSocket = otherPart.getSocketWithPart(part);
                    if (getSocket) {
                        // put the otherPart in this part's socket
                        socket.part = otherPart;
                        // get the web element of the part's text
                        const otherCardInfoText = document.getElementById(otherPart.name); // make the name gen include '-text'
                        let parentOfcard = (cardInfoText.parentNode.parentNode as HTMLElement);
                        let parentOfOtherCard = (otherCardInfoText.parentNode.parentNode as HTMLElement);
                        parentOfcard.style.opacity = "1"; // hovering over, when it IS connected to this part
                        parentOfOtherCard.style.opacity = "1"; // hovering over, when its NOT connected to this part
                    }
                });
                genCardInfoText.textContent = (socket.rules.whitelist.types + ' | ' + socket.getPartName());
            } else {
                // Element not found
            }
        } catch (error) {
            // Handle the exception
        }
    });
}

export function mouseEvent_exitPart(part: Part, playerData: PlayerData) {
    part.sockets.forEach(socket => {
        try {
            const genCardInfoText = document.getElementById('genCardInfoText' + part.sockets.indexOf(socket));
            const cardInfoText = document.getElementById(part.name);
            if (genCardInfoText) {
                playerData.inventory.parts.forEach(otherPart => {
                    if (otherPart === part) { return; }
                    let getSocket = otherPart.getSocketWithPart(part);
                    if (getSocket) {
                        socket.part = otherPart;
                        const otherCardInfoText = document.getElementById(otherPart.name);
                        let parentOfcard = (cardInfoText.parentNode.parentNode as HTMLElement);
                        let parentOfOtherCard = (otherCardInfoText.parentNode.parentNode as HTMLElement);
                        parentOfcard.style.opacity = "1"; // when mouse LEAVES
                        parentOfOtherCard.style.opacity = "1"; // the connected parts
                    }
                });
                genCardInfoText.textContent = (socket.rules.whitelist.types + ' | ' + socket.getPartName());
            } else {
                // Element not found
            }
        } catch (error) {
            // Handle the exception
        }
    });
}