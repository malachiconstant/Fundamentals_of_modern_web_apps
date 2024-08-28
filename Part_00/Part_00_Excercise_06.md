```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    deactivate server
    Note right of browser: sendToServer(note) executes the POST

    browser->>browser: redrawNotes()
    activate browser
    deactivate browser
    
    Note right of browser: event handler adds new note and rerenders the note list
```