let $ = require('jquery');
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

// SHOW/HIDE BUTTON
var toolbar = $('.editor-toolbar');
var CodeMirror = $('.CodeMirror');
toolbar.after('<span id="dragzone" title="Click to hide the toolbar"><i class="fa fa-angle-up"></i></span>');
$('#dragzone').on('click',function(){
  toolbar.toggleClass('closed');
  if(toolbar.hasClass('closed')){
    $(this).find('.fa').addClass('rotated');
  }else{
    $(this).find('.fa').removeClass('rotated');
  }
  CodeMirror.toggleClass('closed');
});
