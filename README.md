# Visual Studio Code Open Project 

This extension allows you to easily switch projects inside Visual Studio Code.

## Project Settings 
You can create a map (name -> folder) in the configuration:

```json
{
    "vscode-open-project.projects": {
        "justcode": "D:\\Work\\vscode-open-project",
        "omnisharp": "D:\\Work\\omnisharp",
        "vscode": "D:\\Work\\vsocde",
        "vscode-open-project": "D:\\Work\\vscode-open-project"
    }
}
```

or specify a config file in the configuration:
```json
{
    "vscode-open-project.projects": {
        "open-project": "D:\\Work\\vscode-open-project.json"
    }
}
```

In case you choose a config file, it should have a projects property:
```json
{
    "projects": {
        "open-project": "D:\\Work\\vscode-open-project"
    }
}
```

## Commands

### **Open Project Command**
![image](https://cloud.githubusercontent.com/assets/1393980/11690911/76f59626-9ea1-11e5-894c-83929f91ca74.png)

Then choose the project to open:

![image](https://cloud.githubusercontent.com/assets/1393980/11690954/9bba565e-9ea1-11e5-8d89-6e2a0227ac33.png)


This will launch a new Visual Studio Code instance with the selected project folder.

### **Change Project Command**
Change Project is the same as Open Project but it changes the current working folder instead of launching a new Visual Studio Code instance.

### **Change Current Folder Command**
Change Current Folder shows input where you should enter the folder path you want to change. The command replaces the current working folder.