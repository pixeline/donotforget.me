
let simplemde = new SimpleMDE({
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: "doNotForgetMe",
    delay: 1000,
  },
  blockStyles: {
    italic: "_"
  },
  placeholder: "Type here...",
  //promptURLs: true,
  renderingConfig: {
    codeSyntaxHighlighting: true,
  },
  toolbar : ["bold","italic","heading","|","link","image","code","unordered-list","ordered-list","quote","horizontal-rule","table","|","preview", "side-by-side", "guide"],
  shortcuts: {
		"drawTable": "Cmd-Alt-T" // bind Cmd-Alt-T to drawTable action, which doesn't come with a default shortcut
	},
  spellChecker: false
});


