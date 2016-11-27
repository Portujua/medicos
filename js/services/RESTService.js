(function(){
	angular.module("adminapp").factory('RESTService', function($http, $timeout){
		return {
			getMedicos: function(s){
				$http.get("api/medicos").then(function(obj){
					s.medicos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getTiposTelefonos: function(s){
				$http.get("api/telefonos/tipos").then(function(obj){
					s.tipos_telefonos = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

			getLugares: function(s){
				$http.get("api/lugares").then(function(obj){
					s.lugares = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
					s.autocomplete_lugares();
				});
			},

			getParroquias: function(s){
				$http.get("api/lugares/parroquias").then(function(obj){
					s.parroquias = obj.data;
					$timeout(function(){$('.selectpicker').selectpicker('refresh');}, 500);
				});
			},

		};
	})
}());