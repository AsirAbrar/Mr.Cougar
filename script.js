const terminalOutput = document.getElementById("output");
const texter = document.getElementById("texter");
const inputLine = document.getElementById("input-line");

let history = []; // Command history
let historyIndex = 0; // Current position in history

// Command dictionary
const commands = {
    help: `Available commands:
  whois          Who is Abrar?
  whoami         Who are you?
  social         Display social networks
  projects       View coding projects
  history        View command history
  help           You obviously already know what this does
  email          Freely message me
  clear          Clear terminal
  banner         Display the header`,
    whois: "Abrar is a cybersecurity specialist and tech enthusiast.",
    whoami: "You are a visitor exploring Abrar's portfolio terminal.",
    social: "LinkedIn: https://linkedin.com/in/abrar | GitHub: https://github.com/abrar",
    projects: "Projects include: Wazuh SIEM installation, Sophos endpoint deployment, and more.",
    history: "Previous commands: none yet.",
    email: "You can email Abrar at: your.email@example.com",
    clear: () => {
        terminalOutput.innerHTML = "";
    },
    banner: "*@=                                                       =@= .",        
        "@@@==%@@%                                 .          .    @@@%=*@%@   .",   
      "%@%:::::::=@@@.           :#@@@@@@@@@@@@@@*.             @@@*:::::::%@:",     
     "-@%=#%%@%+:::::@@%.   @@%@%#=-==========-==*%@@@@#     @@@:::::=#%@*#=@@",     
     "*@=##@@@@@@*-:::-=@@@@*+=======================+=@@@%@@+::::=#%@@@@%##*@",     
     "+@=##%@@@@@@@+=::===*@@@@@*:=-==============-:#@@@@@++=-::=*@@%@@@@%#%%@",     
      "@@##%@@@@@@@@@=:==-==@%:=====-==-=+===========::@@====--*@@%@%@@@@###@*",     
      "-@@#*@@@@@@@@@@*-=-%@:======-=====*===-=-=--====:-@%-==%@@@@@@@@@@**@@",     
       "@@@*@@@@@@@@@@#-*@%-=============**-=============:@*==@%%@@@@@@@##@@=",      
        "@@@*@@@@@@%@%=+@#==============+#%=========-====-=@*=%%%@@@@@@%@@@@",       
        "=@@#@@@@@@@%*+@%=#=============+%%===============%+@#+@@@@@@@@%#@@",        
         "-@@#@@%@@@**%@==========*=====*@#======+=======-=@=@**@@@@@@#@@@",         
           "@@**#%%*+@%@=====-=+@*=======@%======-@@-====-==*@@**#*#**@@%",          
            "@@**+*@@=========*@@=*-====*@#=-======@@==*=-==-==@%****@@.",           
           ".@%@#*%=-=========%@*=#====-+@*-==-==*=#@*=========-+%**@@%:",           
            "%@-**%===========@@*=*-====+@%-=-==*-=*%%==========-@**#@@.",           
           "-@=+**@@@@@@@@@**+%@%=======+*#======-*@@*=*%@@@@@@@@%**=#@.",           
          ".@******==*@@*+++@@@@@@*=====+**=====-*@@@@@@+++@@@+==****=@@",          
          "@@******= ==#@:=:#:=*@@@@************@@@@+=:==-=@==:.+*****+@*",          
          "@@******==: :+@@:::%@@@%****+===-=***+@@@@*::=@@-. -==******@@",          
         ".@@**@*@*+==-=-.:=****@@%**=-=======***%@%***+-.:=====**%%**%@@",          
          "@@#%%*%***====-====+*@@***==========**%@#*====-====***%**@%#@#",          
          "@@@@#=*@***+-=-===-=*%@**=========-==*%@%*========***#@**@%%@:",          
          "-@@@%=**@*****+=+==*%=@*=============+*@=*=====*=+***@*=+@@@@",           
           "@@@@*==*@%*******@==%*=-=============*@-=***+****+%@*=-*@@@=",           
           ".@@@@*+-+*@@+***@===@*===============+%-===%#***%@*++=*@@@%",            
            "-@@@%%*+**%@%@@===-%%===============+@ ====@#*@#****%*#@@.",            
       "..     @@##*****#@@=:=--:@@@@@*=--===@@@@@@.====#@@%*****%@@=      .",       
               "=@@@@%%**@%=..== +@@#*==%@@#=**@@@ -=- :-@**##%@@@%"                
         ":=:.   .@@##@@@@%@@.     @@@@@+**=@@@@:. ...*@@@@@@%*%@*    .-=",          
              ". =@+:   @@=-.:%@@.  .*@@***#@@.   *@@+ :=%@:  .=%%:",                
             "+@-   +@@%@@@%:  .  .    :@@@@ .  .   . .=@@@@%@@.  .=@=.:",           
         ".     :.%= ::  @%=:=*.. .    .-%*=    .  :*#===@%  -. #*       .",         
            ".:. .  @ %* *@@=*:   .   .==@%=: .    ..===@@ :%*:=     -",             
             ".  :-      *.%@*=..  :=-%@@@@@@==-.   -=@@*.+ ..  .* . .",             
             "...     -#   .:@@@@@@@@%%*%+*+#%@@@@@@@@@ .  .@.      =",              
                  ".:        :@*+**             =***%*         #   .",               
                 ".           =@#==             .:%@+            :",                 
                              ".@@%=          . :@@",                                
                                "-@@@==.     :=%@= .",                               
                                   "%@@@@@@@@@@",                                    
                                       
                     "Welcome to Abrar's Portfolio Terminal!",
};

function handleInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const input = texter.value.trim();
        texter.value = "";

        // Remove any previous output that had the command prompt
        terminalOutput.innerHTML += `<div><span class="prompt">security@Abrar:~$</span> ${input}</div>`;

        if (commands[input]) {
            const command = commands[input];
            if (typeof command === "function") {
                terminalOutput.innerHTML += `<div>${command()}</div>`;
            } else {
                terminalOutput.innerHTML += `<div>${command}</div>`;
            }
        } else if (input) {
            terminalOutput.innerHTML += `<div>Command not found: ${input}. Type 'help' for a list of available commands.</div>`;
        }

        // Change the current prompt to green after processing
        const activePrompt = document.querySelector(".prompt-active");
        if (activePrompt) activePrompt.classList.remove("prompt-active");

        // Auto-scroll to the bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        // Add the command to history
        history.push(input);
        historyIndex = history.length;
    }

    // Navigate command history
    if (event.key === "ArrowUp") {
        if (historyIndex > 0) historyIndex--;
        texter.value = history[historyIndex] || "";
    } else if (event.key === "ArrowDown") {
        if (historyIndex < history.length) historyIndex++;
        texter.value = history[historyIndex] || "";
    }
}
