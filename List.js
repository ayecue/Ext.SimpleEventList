Ext.define('Ext.SimpleEvent.List', {
    requires: [
        'Ext.Util',
        'Ext.SimpleEvent'
    ],
    /**
     *  EventList/constructor
     *
     *  Description:
     *      Constructor.
     */
	constructor : function(){
		var self = this;

        self.listener = {};

        self.register.apply(self,arguments);
	},
    /**
     *  EventList/register
     *
     *  Description:
     *      Add EventHolder to list.
     *
     *  Arguments:
     *      *String
     *
     *  Returns:
     *      EventList
     */
    register : function(){
        var self = this;

        Ext.Util.forEach(arguments,function(_,name){
            if (!self.get(name)) {
                self.listener[name] = new Ext.SimpleEvent();
            }
        });

        return self;
    },
    /**
     *  EventList/get
     *
     *  Description:
     *      Get event holder.
     *
     *  Arguments:
     *      String
     */
    get : function(name){
        var self = this;

        if (name in self.listener) {
            return self.listener[name];
        }
    },
    /**
     *  EventList/filter
     *
     *  Description:
     *      Get list of events.
     *
     *  Arguments:
     *      *String
     *
     *  Returns:
     *      EventList
     */
    filter : function(){
        var self = this;
        
        return Ext.Util.forEach(arguments,function(){
            var eventHolder = self.get(name);

            if (eventHolder) {
                this.result.listener[name] = eventHolder;
            }
        },new self._self());
    },
    /**
     *  EventList/remove
     *
     *  Description:
     *      Remove event holder.
     *
     *  Arguments:
     *      *String
     *
     *  Returns:
     *      EventList
     */
    remove : function(){
        var self = this;

        Ext.Util.forEach(arguments,function(_,name){
            var eventHolder = self.get(name);

            if (eventHolder) {
                eventHolder.destroy();

                self.listener[name] = null;
                delete self.listener[name];
            }
        });

        return self;
    },
    /**
     *  EventList/on
     *
     *  Description:
     *      Register event.
     *
     *  Arguments:
     *      string
     *      config
     *
     *  Arguments:
     *      EventList
     */
    on : function(name,obj){
        var self = this,
            eventHolder = self.get(name);

        if (eventHolder) {
            eventHolder.add(obj);
        }

        return self;
    },
    /**
     *  EventList/once
     *
     *  Description:
     *      Register event once.
     *
     *  Arguments:
     *      string
     *      function
     *
     *  Returns:
     *      EventList
     */
    once : function(name,fn){
        return this.on(name,{
            once : true,
            callback : fn
        });
    },
    /**
     *  EventList/fire
     *
     *  Description:
     *      Fire event.
     *
     *  Arguments:
     *      string
     *      object
     *      array
     *
     *  Returns:
     *      EventList
     */
    fire : function(name,ctx,args){
        var self = this,
            eventHolder = self.get(name);

        if (eventHolder) {
            eventHolder.fire(ctx,args);
        }

        return self;
    },
    /**
     *  EventList/isEmpty
     *
     *  Description:
     *      Check if event is empty.
     *
     *  Arguments:
     *      string
     *
     *  Returns:
     *      boolean
     */
    isEmpty : function(name){
        var self = this,
            eventHolder = self.get(name);

        if (eventHolder) {
            return eventHolder.isEmpty();
        }
    },
    /**
     *  EventList/off
     *
     *  Description:
     *      Remove event.
     *
     *  Arguments:
     *      string
     *      function
     *
     *  Returns:
     *      EventList
     */
    off : function(name,fn){
        var self = this,
            eventHolder = self.get(name);

        if (eventHolder) {
            eventHolder.remove(fn);
        }

        return self;
    },
    /**
     *  EventList/clear
     *
     *  Description:
     *      Clear certain EventHolder.
     *
     *  Arguments:
     *      *string
     *
     *  Returns:
     *      EventList
     */
    clear : function(){
        var self = this;

        Ext.Util.forEach(arguments,function(_,name){
            var eventHolder = self.get(name);

            if (eventHolder) {
                eventHolder.clear();
            }
        });

        return self;
    },
    /**
     *  EventList/clearAll
     *
     *  Description:
     *      Clear all EventHolder.
     *
     *  Arguments:
     *      string
     *
     *  Returns:
     *      EventList
     */
    clearAll : function(){
        var self = this;

        Ext.Util.forEach(self.listener,function(_,listener){
            listener.clear();
        });

        return self;
    },
    /**
     *  EventList/destroy
     *
     *  Description:
     *      Clear all variables of the EventList.
     */
    destroy : function(){
        var self = this;

        //clear vars
        Ext.Util.forEach(self.listener,function(_,listener){
            listener.destroy();
        });

        self.listener = null;
        delete self.listener;
    }
});