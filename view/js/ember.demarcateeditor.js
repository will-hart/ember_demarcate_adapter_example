Ember.DemarcateEditor = Em.View.extend({
    tagName: 'div',
    attributeBindings: ['contenteditable'],

    // Variables:
    editable: false,
    isUserTyping: false,

    // Properties:
    contenteditable: (function() {
        var editable = this.get('editable');
        return editable ? 'true' : undefined;
    }).property('editable'),

    // Observers:
    valueObserver: (function() {
        if (!this.get('isUserTyping') && this.get('value')) {
            return this.setContent();
        }
    }).observes('value'),

    // Events:
    didInsertElement: function() {
        demarcate.enable(this.$().get(0));
        return this.setContent();
    },

    focusOut: function() {
        return this.set('isUserTyping', false);
    },

    keyDown: function(event) {
        if (!event.metaKey) {
            return this.set('isUserTyping', true);
        }
    },

    keyUp: function(event) {
        var val = this.set('value', this.$().html());

        // periodically update the markdown
        Ember.run.debounce({'component': this}, function () { 
            this.component.set('markdown', demarcate.parse());
        }, 500);

        return val;
    },

    setContent: function() {
        return this.$().html(this.get('value'));
    }
});
