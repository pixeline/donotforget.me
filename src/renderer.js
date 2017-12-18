let $ = require('jquery');
const remote = require('electron').remote;
let store = remote.getGlobal('store');

console.log(store.get('content'));
$('#content').html( store.get('content') );

let simplemde = new SimpleMDE({
  autofocus: true,
  autosave: {
    enabled: false,
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
if(store.get('toolbarShow')== false){
  toolbar.addClass('closed');
  $('#dragzone .fa').addClass('rotated');
  CodeMirror.toggleClass('closed');
}
$('#dragzone').on('click',function(){
  toolbar.toggleClass('closed');

  if(toolbar.hasClass('closed')){
    $(this).find('.fa').addClass('rotated');
    store.set('toolbarShow', false);
  }else{
    $(this).find('.fa').removeClass('rotated');
    store.set('toolbarShow', true);
  }
  CodeMirror.toggleClass('closed');
});


// STORE DATA IN FILE SYSTEM
simplemde.codemirror.on("change", function(){
  store.set('content', simplemde.value());
})
