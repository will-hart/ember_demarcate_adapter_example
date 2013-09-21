App = Ember.Application.create();

App.DemarcateEditorComponent = Ember.DemarcateEditorComponent.extend();

App.ApplicationController = Ember.ObjectController.extend({
    editorHTML: "<h1>Instructions</h1>Edit <strong>your</strong> document here, and <i>see</i> the Markdown appear  next door &gt;&gt;",
    markdown: "# Instructions\n\nEdit your **document** here, and *see* the Markdown appear next door >>"
});


Ember.Handlebars.registerBoundHelper('breaklines', function(text) {
    text = Ember.Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Ember.Handlebars.SafeString(text);
});
