go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var FreeText = vumigo.states.FreeText;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:main');

        self.states.add('states:main', function(name) {
            return new ChoiceState(name, {
                question: 'Bibi Cash & Carry \n Choose a language:',

                choices: [
                    new Choice('states:main_english', 'English'),
                    new Choice('states:main_sesotho','Sesotho'),
                    new Choice('states:main_zulu','IsiZulu'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:main_english', function(name) {
            return new ChoiceState(name, {
                question: 'Bibi Cash & Carry',

                choices: [
                    new Choice('states:join_funeral_scheme', 'Join Funeral Scheme'),
                    new Choice('states:join_grocery_scheme','Join Grocery Scheme'),
                    new Choice('states:special_promotion', 'This month special'),
                    new Choice('states:competitions', 'Current Competitions'),
                    new Choice('states:contact','Our branches'),
                    new Choice('states:about', 'About Bibi'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:main_sesotho', function(name) {
            return new ChoiceState(name, {
                question: 'Bibi Cash & Carry\nSesotho menu is currently not available',

                choices: [
                    new Choice('states:main_english', 'English Version'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:main_zulu', function(name) {
            return new ChoiceState(name, {
                question: 'Bibi Cash & Carry\nIsiZulu menu is currently not available',

                choices: [
                    new Choice('states:main_english', 'English Version'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });     

        self.states.add('states:join_funeral_scheme', function(name){
            return new FreeText(name,{
                question: 'Enter your name, a representative will call you back shortly: ',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:join_grocery_scheme', function(name){
            return new FreeText(name,{
                question: 'Enter your name, a representative will call you back shortly: ',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:special_promotion', function(name) {
            return new EndState(name, {
                text: 'Ubuntu 12.5Kg: R59.99\nSunlight 2in1: R33.99\nSasko Cake Flour 12.5Kg: R72.99\nVisit the store for more..',
                next: 'states:exit'
            });
        });

        self.states.add('states:competitions', function(name){
            return new ChoiceState(name,{
                question: 'Current Competitions',

                choices: [
                    new Choice('states:competition_car', 'Festive Car Competition'),
                    new Choice('states:competition_monthly', 'Monthly Grocery Competition'),
                    new Choice('states:main_english', 'Back to Main menu'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:competition_car', function(name){
            return new ChoiceState(name,{
                question: '2015 Festive Car Competition\n\nPurchase Grocery worth R 400 or more\nand stand a chance to WIN a car\n',
 
                choices: [
                    new Choice('states:competition_monthly', 'Monthly Grocery Competition'),
                    new Choice('states:main_english', 'Back to Main menu'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:competition_monthly', function(name){
            return new EndState(name,{
                text: 'Win a Busket filled with Grocery every month by\nparticipating on our weekly surveys\nListen to Qwaqwa Radio for more details.',
                next: 'states:main'
            });
        });

        self.states.add('states:exit', function(name) {
            return new EndState(name, {
                text: 'Demo by Textily (Pty) Ltd\nTsotetsi Thapelo\n0835504933',
                next: 'states:main'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
