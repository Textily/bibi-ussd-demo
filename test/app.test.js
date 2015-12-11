var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function(){
            it("should present the language menu", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:main',
                        reply: [
                            'Bibi Cash & Carry \n Choose a language:',
                            '1. English',
                            '2. Sesotho',
                            '3. IsiZulu',
                            '4. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user ask to see the english version", function(){
            it("should present the english menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('1')
                    .check.interaction({
                        state: 'states:main_english',
                        reply: [
                            'Bibi Cash & Carry',
                            '1. Join Funeral Scheme',
                            '2. Join Grocery Scheme',
                            '3. This month special',
                            '4. Current Competitions',
                            '5. Our branches',
                            '6. About Bibi',
                            '7. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user ask to see sesotho menu", function(){
            it("should present the sesotho main menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('2')
                    .check.interaction({
                        state: 'states:main_sesotho',
                        reply: [
                            'Bibi Cash & Carry\nSesotho menu is currently not available',
                            '1. English Version',
                            '2. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user ask to see isizulu menu", function(){
            it("should present the isizulu main menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('3')
                    .check.interaction({
                        state: 'states:main_zulu',
                        reply: [
                            'Bibi Cash & Carry\nIsiZulu menu is currently not available',
                            '1. English Version',
                            '2. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user ask to see the competition menu", function(){
            it("should present the competition menu", function() {
                return tester
                    .setup.user.state('states:main_english')
                    .input('4')
                    .check.interaction({
                        state: 'states:competitions',
                        reply: [
                            'Current Competitions',
                            '1. Festive Car Competition',
                            '2. Monthly Grocery Competition',
                            '3. Back to Main menu',
                            '4. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });


        describe("when the user asks to see the special menu", function() {
            it("should present the special and return to main menu", function() {
                return tester
                    .setup.user.state('states:main_english')
                    .input('3')
                    .check.interaction({
                        state: 'states:special_promotion',
                        reply: 'Ubuntu 12.5Kg: R59.99\nSunlight 2in1: R33.99\nSasko Cake Flour 12.5Kg: R72.99\nVisit the store for more..'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see the car competition menu", function() {
            it("should present car competitions menu", function() {
                return tester
                    .setup.user.state('states:competitions')
                    .input('1')
                    .check.interaction({
                        state: 'states:competition_car',
                        reply: [

                            '2015 Festive Car Competition\n\nPurchase Grocery worth R 400 or more\nand stand a chance to WIN a car\n',
                            '1. Monthly Grocery Competition',
                            '2. Back to Main menu',
                            '3. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the Monthly competition menu", function() {
            it("should present monthly competition menu", function() {
                return tester
                    .setup.user.state('states:competitions')
                    .input('2')
                    .check.interaction({
                        state: 'states:competition_monthly',
                        reply: 'Win a Busket filled with Grocery every month by\nparticipating on our weekly surveys\nListen to Qwaqwa Radio for more details.'
                    })
                    .run();
            });
        });

        describe("when the user asks to exit", function() {
            it("should say thank you and end the session", function() {
                return tester
                    .setup.user.state('states:main_english')
                    .input('7')
                    .check.interaction({
                        state: 'states:exit',
                        reply: 'Demo by Textily (Pty) Ltd\nTsotetsi Thapelo\n0835504933'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});