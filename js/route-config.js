(function(){
	angular.module("adminapp").config(function($routeProvider, $locationProvider){
		$routeProvider
			.when("/login", {
				templateUrl : "views/login.html"
			})
			.when("/inicio", {
				templateUrl : "views/inicio.html"
			})
			.when("/", {
				templateUrl : "views/inicio.html"
			})



			// Admin
			.when("/medicos", {
				templateUrl : "views/admin/medicos/medicos.html"
			})
			.when("/medicos/agregar", {
				templateUrl : "views/admin/medicos/agregar.html"
			})
			.when("/medicos/editar/:cedula", {
				templateUrl : "views/admin/medicos/agregar.html"
			})



			// Admin
			.when("/pacientes", {
				templateUrl : "views/admin/pacientes/pacientes.html"
			})
			.when("/pacientes/agregar", {
				templateUrl : "views/admin/pacientes/agregar.html"
			})
			.when("/pacientes/editar/:cedula", {
				templateUrl : "views/admin/pacientes/agregar.html"
			})




			.when("/recuperar/:usuario", {
				templateUrl : "views/admin/recuperar.html"
			})


			.otherwise({redirectTo : "/login"});
	});
}());