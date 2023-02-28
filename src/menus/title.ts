import { back, gotoWindow } from "../index"
import { button, clear, line } from "../display"
import { HomeMenu } from "./home";
import { CutsceneWindow } from "../cutscene";
import { loadSave, save } from "../user";
import { newSave } from "../save";
import { ChoiceMenu, universalBack } from "../windowtypes/choice";
import { TextInputMenu } from "../windowtypes/textinput";

// Main Menu. the landing page for the game
export class TitleScreen extends ChoiceMenu {
    constructor() {
        super([
            {input: ["1"], label: "New Game", effect: () => this.goto(new ChooseName())},
            {input: ["2"], label: "Load Game", effect: () => this.showToast("Loading not implemented")}
        ])
    }

    displayAboveToast(out: HTMLElement): void {
        line(`
______ ___________ _____ _      _____   _____ _____ _____ 
| ___ \\_   _| ___ \\  _  | |    |  ___| |_   _|_   _|_   _|
| |_/ / | | | |_/ / | | | |    | |__     | |   | |   | |  
| ___ \\ | | |  __/| | | | |    |  __|    | |   | |   | |  
| |_/ /_| |_| |   \\ \\_/ / |____| |___   _| |_ _| |_ _| |_ 
\\____/ \\___/\\_|    \\___/\\_____/\\____/   \\___/ \\___/ \\___/
        
        `, out)
    }
}

export class ChooseName extends TextInputMenu {
    constructor() {
        super("Choose a name...")
        this.direction = "top-bottom"
        this.addChoice(universalBack())
        this.maxlength = 24;
    }

    handleTextSubmit(text: string): void {
        if (text.length === 0) {
            text = "Lead"
        }

        if (text.length > this.maxlength) {
            this.showToast("Name is too long")
            return;
        }

        gotoWindow(new NameConfirm(text));
    }
}

export class NameConfirm extends ChoiceMenu {
    selectedName: string

    constructor(selectedName: string) {

        super([
            {input: ["Z", "KeyZ", "KeyY"], label: "Yes", effect: () => {
                loadSave( newSave(selectedName) )
                this.goto(new CutsceneWindow("test", new HomeMenu()))
            }},
            universalBack("No")
        ], `Are you sure you want to be named <span class="hljs-built_in">${selectedName}</span>?`)

        this.selectedName = selectedName;
    }
}