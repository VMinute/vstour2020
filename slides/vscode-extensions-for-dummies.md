---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: false
title: "Visual Studio Code Extensions for Dummies"
---

<!-- .slide: data-background="TemplateVisualStudioTourLive2020.svg" data-background-size="1700px" -->

## Visual Studio Code Extensions for Dummies ##

---

### Valter Minute ###
#### @Vminute ####
#### https://www.linkedin.com/in/valter-minute-b401502/ ####

---

<!-- .slide: data-background="VisualStudioTourLive2020Sponsors.svg" data-background-size="1700px" -->

---

## How Can I Develop a VSCode Extension? ##

- Javascript
- Typescript
- Multi-platform by design
- VSCode !== Visual Studio

---

## What can a VSCode extension do? ##

- Add features to the editor
- Add new commands
- Support new languages
- Automate operations
- Integrate external tools
- Coffee

---

## Should I really write an extension? ##

- Tasks
- Configuration settings
- Themes

---

## Create an Extension ##

```bash
$ yo code

     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 
```

---

## VSCode API ##

- commands
- comments
- debug
- env
- extensions
- languages
- scm
- tasks
- window
- workspace

--

[API reference](https://code.visualstudio.com/api/references/vscode-api)

---

## Commands ##

- Accessible from the command bar or from Views
- Can be invoked by other extensions, from the UI or from tasks

---

## UI ##

- Input Box
- Quick picks
- Notifications
- Output channels

---

## Views ##

- Can be used in the Activity bar
- Can be linked to commands

---

## Terminal ##

- Can be used to run external console-based apps

---

## Languages ##

- Support a new language
- Grammar
- Syntax highlighting
- Intellisense
- Build
- Debugger

---

## Monicelli  ##

- Support a new language in VSCode
- [Monicelli 2.0 "Cofandina"](https://github.com/esseks/monicelli)

---

## Resources ##

[Slides and code](https://github.com/VMinute/vstour2020)  
[Official VSCode Extension Samples](https://github.com/Microsoft/vscode-extension-samples)
