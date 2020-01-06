(function(global, $){
    
    // 'new; object retuned
    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language)
    }

    // is hidden within the scope of IIFE and not accesed directly
    var supportedLangs = ['en', 'es']

    //informal greeting
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    //formal greeting
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    //logger message
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio Sesion',
    }
    // adding methods to prototype to save memory space
    Greetr.prototype = {

        // 'this' refers to calling object at execution time
        fullName : function(){
            return this.firstName+' '+this.lastName;
        },
        //check if valid language is passed
        validate: function(){
            if(supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        },
        //retrieve messages from object by referring to properties using [] syntax
        greeting: function(){
            return greetings[this.language]+ ' '+this.firstName+' !'
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language]+', '+this.fullName()
        },
        //chainable methods return their own containing object
        greet: function(formal){
            var msg;
            //if undefined or null will coerce to 'false'
            if(formal){
                msg = this.formalGreeting()
            }
            else{
                msg = this.greeting()
            }

            if(console){
                console.log(msg);
            }
            //this refers to the calling object at execution time
            //makes the method chainable
            return this;
        },

        log: function(){
            if(console){
                console.log(logMessages[this.language]+': '+this.fullName());
            }
            // make chainable
            return this;
        },

        setLang: function(newLang){
            //set the language
            this.language = lang;
            //validate
            this.validate();
            //make chainable
            return this;
        },

        htmlGreeting: function(selector, formal) {
            if(!$){
                throw 'jquery not loaded'
            }
            if(!selector){
                throw 'missing jquery selector'
            }

            //determine the message
            var msg;
            if(formal){
                msg= this.formalGreeting()
            }
            else{
                msg = this.greeting();
            }
            //add the message to the DOM selector element
            $(selector).html(msg)
            //make chainable
            return this;
        }
    }
    // the actual object is created here, allowing us to 'new' an object wihout calling 'new' 
    Greetr.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        self.validate();
    };

    

    Greetr.init.prototype = Greetr.prototype;

    //attaching to global
    global.Greetr = global.G$ = Greetr;





}(window,jQuery));