angular.module('app_hospitais.shared', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state("shared", {
                url: "/shared",
                templateUrl: 'app/shared/main.html',
                controller: 'AppController'
            })  
            
    })

     .directive("compareTo", function ()  
     {  
       return {  
        require: "ngModel",  
        scope:  
        {  
            confirmPassword: "=compareTo"  
        },  

       link: function (scope, element, attributes, modelVal) 
     /*  {
         scope.$watch(attributes.compareTo, function (newValue) {
                  if (ctrl && ctrl.$modelValue) {
                      if (newValue === ctrl.$modelValue) {
                          ctrl.$setValidity('compareTo', true);
                          // return newValue;
                      } else {
                          ctrl.$setValidity('compareTo', false);
                         
                          // return undefined;
                      }
                  }
              }); 
       } */

        {  
            modelVal.$validators.compareTo = function (val)  
            {  
                //console.log(modelVal + ":" + scope.confirmPassword);
              //  console.log("Val" + ":" + val);
                return val == scope.confirmPassword;  
            };  
            scope.$watch("confirmPassword", function ()  
            { 
                
                modelVal.$validate();
                
            });  
        }  
    }
 })  

   .directive("validaCpf", function ()  
     {  

        return {  
        require: "ngModel",  
        scope:  
        {  
            validacao: "=validaCpf"  
        },  

      
        link: function (scope, element, attributes, modelVal)  
        {  
            modelVal.$validators.validaCpf = function (val) 
            { 

               var retornar = false
               
              if (!angular.isUndefined(val) || val){
                 if (val.indexOf("@") > -1) {                  
                     var pattern = '^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$'; 
                     var retorno =  val.match(pattern);
                     //console.log(retorno)
                     if (retorno != null) {
                        retornar = true;
                        return retornar;
                     }               
                  
                 } else 
                    {                          
                     var  validado = validarCPF(val);
                     if (validado)
                     {  
                                       
                       retornar = true;
                     }               
                }
                  return retornar;
             }
            },
             scope.$watch("validacao", function ()  
             {  
                    modelVal.$validate();  
             });             
        }  
    }
 });

 
         


    /*.config(['ChartJsProvider', (function(ChartJsProvider) { 
      ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    }));
    .config(function (ChartJsProvider) {
        ChartJsProvider.setOptions({
            colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
        });
    });*/
