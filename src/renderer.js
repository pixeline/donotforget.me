let $ = require('jquery');
// require('tui-code-snippet/dist/tui-code-snippet.js');
// require('markdown-it/dist/markdown-it.js');
// require('toMark/dist/toMark.js');
// require('codemirror/lib/codemirror.js');
// require('highlightjs/highlight.pack.js');
// require('squire-rte/build/squire-raw.js');
// require('tui-editor/dist/tui-editor.min.js');
//let editormd = require('editor.md/editormd.js');

const remote = require('electron').remote;
let store = remote.getGlobal('store');
var editor;


$(function() {

  // Inject saved content on load.
  $('#content').html( store.get('content') );

  // Instantiate the md editor...

  editor = editormd("editormd", {
    path : "../node_modules/editor.md/lib/",
    saveHTMLToTextarea : true,
    autoHeight : true,
    emoji: true,
    taskList : true,
    htmlDecode : true,
     theme : "default",
    editorTheme : editormd.editorThemes['base16-light'],
    onchange : function() {
      store.set('content', this.getMarkdown());
      // ....
    }

  });
  // // STORE DATA IN FILE SYSTEM
  // editor.codemirror.on("change", function(){
  //   store.set('content', editor.getMarkdown());
  // });
});
//
// let simplemde = new SimpleMDE({
//   autofocus: true,
//   autosave: {
//     enabled: false,
//     uniqueId: "doNotForgetMe",
//     delay: 1000,
//   },
//   blockStyles: {
//     italic: "_"
//   },
//   placeholder: "Type here...",
//   //promptURLs: true,
//   renderingConfig: {
//     codeSyntaxHighlighting: true,
//     singleLineBreaks: true
//   },
//   toolbar : ["bold","italic","heading","|","link","image","code","unordered-list","ordered-list","quote","horizontal-rule","table","|","preview", "side-by-side", "guide"],
//   shortcuts: {
//     "drawTable": "Cmd-Alt-T" // bind Cmd-Alt-T to drawTable action, which doesn't come with a default shortcut
//   },
//   spellChecker: false
// });

// SHOW/HIDE BUTTON
// var toolbar = $('.editor-toolbar');
// var CodeMirror = $('.CodeMirror');
// toolbar.after('<span id="dragzone" title="Click to hide the toolbar"><i class="fa fa-angle-up"></i></span>');
// if(store.get('toolbarShow')== false){
//   toolbar.addClass('closed');
//   $('#dragzone .fa').addClass('rotated');
//   CodeMirror.toggleClass('closed');
// }
// $('#dragzone').on('click',function(){
//   toolbar.toggleClass('closed');
//
//   if(toolbar.hasClass('closed')){
//     $(this).find('.fa').addClass('rotated');
//     store.set('toolbarShow', false);
//   }else{
//     $(this).find('.fa').removeClass('rotated');
//     store.set('toolbarShow', true);
//   }
//   CodeMirror.toggleClass('closed');
// });
//
//
// // STORE DATA IN FILE SYSTEM
// simplemde.codemirror.on("change", function(){
//   store.set('content', simplemde.value());
// })
